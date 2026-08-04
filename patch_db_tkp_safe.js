const fs = require('fs');
let html = fs.readFileSync('database-soal.html', 'utf8');

// Safely replace function
function safeReplace(regex, replaceFn, name) {
    if (!html.match(regex)) {
        console.error(`Regex failed to match: ${name}`);
        return;
    }
    html = html.replace(regex, replaceFn);
    console.log(`Success: ${name}`);
}

// 1. Inject TKP Score inputs into UI
safeReplace(
    /<img id="q-opt-([1-5])-image-preview" src="" class="hidden max-h-24 rounded-lg border border-white\/10 object-contain w-fit">/g,
    (match, i) => {
        return match + `\n<div id="tkp-score-container-${i}" class="hidden flex items-center gap-2 mt-2 w-full"><label class="text-xs text-on-surface-variant font-bold uppercase tracking-widest shrink-0">Skor TKP:</label><input type="number" id="q-tkp-score-${i}" min="1" max="5" class="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-primary focus:outline-none" placeholder="1-5"></div>`;
    },
    'UI Inject'
);

// 2. Inject JS logic into openAddModal
safeReplace(
    /function openAddModal\(\) \{[\s\S]*?document\.getElementById\('q-index'\)\.value = -1;/,
    (match) => {
        return match + `\n            let isTKP = (currentGame === 'TKP');\n            for(let i=1; i<=5; i++) {\n                let ts = document.getElementById('q-tkp-score-'+i);\n                if(ts) ts.value = '';\n                let tc = document.getElementById('tkp-score-container-'+i);\n                if(tc) { if(isTKP) tc.classList.remove('hidden'); else tc.classList.add('hidden'); }\n            }`;
    },
    'openAddModal'
);

// 3. Inject JS logic into editQuestion
safeReplace(
    /let opts = item\.options \|\| \[\];\s*let optImages = item\.optImages \|\| \[\];/,
    (match) => {
        return match + `\n                let isTKP = (currentGame === 'TKP');\n                let tkpScores = item.tkpScores || [];`;
    },
    'editQuestion start'
);

safeReplace(
    /if \(opts\[i-1\] === aText && aText !== ''\) \{\s*document\.getElementById\('q-radio-'\+i\)\.checked = true;\s*\}/g,
    (match) => {
        return match + `\n                    let ts = document.getElementById('q-tkp-score-'+i);\n                    if(ts) ts.value = tkpScores[i-1] || '';\n                    let tc = document.getElementById('tkp-score-container-'+i);\n                    if(tc) { if(isTKP) tc.classList.remove('hidden'); else tc.classList.add('hidden'); }`;
    },
    'editQuestion loop'
);

// 4. Inject JS logic into saveModal (save function loop)
safeReplace(
    /for\(let i=1; i<=5; i\+\+\) \{\s*let optVal = document\.getElementById\('q-opt-'\+i\)\.value\.trim\(\);\s*let optImg = window\['currentOpt' \+ i \+ 'Image'\];/g,
    (match) => {
        return `let isTKP = (currentGame === 'TKP');\n                let tkpScores = [];\n                ` + match;
    },
    'save loop start'
);

safeReplace(
    /opts\.push\(optVal\);\s*optImages\.push\(optImg \|\| null\);\s*if \(optImg\) hasOptImages = true;/g,
    (match) => {
        return match + `\n                        if (isTKP) {\n                            let sc = parseInt(document.getElementById('q-tkp-score-'+i).value) || 0;\n                            tkpScores.push(sc);\n                        }`;
    },
    'save loop body'
);

safeReplace(
    /newItem\.options = opts;\s*if \(hasOptImages\) newItem\.optImages = optImages;/g,
    (match) => {
        return match + `\n                if (isTKP) newItem.tkpScores = tkpScores;`;
    },
    'save end'
);

fs.writeFileSync('database-soal.html', html);
console.log('Done replacing');
