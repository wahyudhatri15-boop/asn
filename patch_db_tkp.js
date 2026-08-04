const fs = require('fs');

let html = fs.readFileSync('database-soal.html', 'utf8');

// 1. Inject TKP Score inputs into UI
for (let i = 1; i <= 5; i++) {
    const searchString = `<img id="q-opt-${i}-image-preview" src="" class="hidden max-h-24 rounded-lg border border-white/10 object-contain w-fit">`;
    const replaceString = searchString + `\n<div id="tkp-score-container-${i}" class="hidden flex items-center gap-2 mt-2 w-full"><label class="text-xs text-on-surface-variant font-bold uppercase tracking-widest shrink-0">Skor TKP:</label><input type="number" id="q-tkp-score-${i}" min="1" max="5" class="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-primary focus:outline-none" placeholder="1-5"></div>`;
    html = html.replace(searchString, replaceString);
}

// 2. Inject JS logic into openAddModal
const openAddModalRegex = /function openAddModal\(\) \{[\s\S]*?document\.getElementById\('q-index'\)\.value = -1;/;
html = html.replace(openAddModalRegex, (match) => {
    return match + `\n            let isTKP = (currentGame === 'TKP');\n            for(let i=1; i<=5; i++) {\n                let ts = document.getElementById('q-tkp-score-'+i);\n                if(ts) ts.value = '';\n                let tc = document.getElementById('tkp-score-container-'+i);\n                if(tc) { if(isTKP) tc.classList.remove('hidden'); else tc.classList.add('hidden'); }\n            }`;
});

// 3. Inject JS logic into editQuestion
const editQuestionRegex = /let opts = item\.options \|\| \[\];\s*let optImages = item\.optImages \|\| \[\];/;
html = html.replace(editQuestionRegex, (match) => {
    return match + `\n                let isTKP = (currentGame === 'TKP');\n                let tkpScores = item.tkpScores || [];`;
});

const editQuestionLoopRegex = /if \(opts\[i-1\] === aText && aText !== ''\) \{\s*document\.getElementById\('q-radio-'\+i\)\.checked = true;\s*\}/;
html = html.replace(editQuestionLoopRegex, (match) => {
    return match + `\n                    let ts = document.getElementById('q-tkp-score-'+i);\n                    if(ts) ts.value = tkpScores[i-1] || '';\n                    let tc = document.getElementById('tkp-score-container-'+i);\n                    if(tc) { if(isTKP) tc.classList.remove('hidden'); else tc.classList.add('hidden'); }`;
});

// 4. Inject JS logic into saveModal (saveDB logic inside closeModal? No, function is usually saveModal or saveQuestion?)
// Let's check what the save function is named. Earlier it was just in `saveDB` or `addQuestion`/`saveQuestion`.
// I will just use a generic regex to find the loop that reads options.
const saveOptionsRegex = /for\(let i=1; i<=5; i\+\+\) \{\s*let optVal = document\.getElementById\('q-opt-'\+i\)\.value\.trim\(\);\s*let optImg = window\['currentOpt' \+ i \+ 'Image'\];/;
html = html.replace(saveOptionsRegex, (match) => {
    return `let isTKP = (currentGame === 'TKP');\n                let tkpScores = [];\n                ` + match;
});

const pushOptionsRegex = /opts\.push\(optVal\);\s*optImages\.push\(optImg \|\| null\);\s*if \(optImg\) hasOptImages = true;/;
html = html.replace(pushOptionsRegex, (match) => {
    return match + `\n                        if (isTKP) {\n                            let sc = parseInt(document.getElementById('q-tkp-score-'+i).value) || 0;\n                            tkpScores.push(sc);\n                        }`;
});

const newItemOptionsRegex = /newItem\.options = opts;\s*if \(hasOptImages\) newItem\.optImages = optImages;/;
html = html.replace(newItemOptionsRegex, (match) => {
    return match + `\n                if (isTKP) newItem.tkpScores = tkpScores;`;
});


// 5. Update renderQuestions so TKP options show their scores if TKP
const renderOptionsRegex = /<div class="flex items-start gap-2">[\s\S]*?<span class="text-sm font-bold shrink-0">\\\$\{String\.fromCharCode\(65 \+ i\)\}\.<\/span>/;
html = html.replace(renderOptionsRegex, (match) => {
    return match + `\n                                        \${(item.tkpScores && item.tkpScores[i]) ? \`<span class="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-1">\${item.tkpScores[i]} pts</span>\` : ''}`;
});
// Wait, is it `item.tkpScores[i]`? Yes, because i is the index in the loop.

fs.writeFileSync('database-soal.html', html);
console.log('database-soal.html updated for TKP scoring.');
