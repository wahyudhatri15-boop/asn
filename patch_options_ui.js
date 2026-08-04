const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// 1. Replace HTML
const oldHtml = `<div id="options-container" class="hidden">
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Pilihan Jawaban (Level 1 Khusus - Pisahkan dengan koma)</label>
                    <input type="text" id="q-options" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi A, Opsi B, Opsi C, Opsi D">
                    <p class="text-xs text-on-surface-variant mt-1">Pastikan Jawaban Benar ada di dalam daftar pilihan ini.</p>
                </div>`;
const newHtml = `<div id="options-container" class="hidden">
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Pilihan Jawaban (Khusus Soal Pilihan Ganda)</label>
                    <div class="grid grid-cols-2 gap-3">
                        <input type="text" id="q-opt-1" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi A">
                        <input type="text" id="q-opt-2" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi B">
                        <input type="text" id="q-opt-3" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi C">
                        <input type="text" id="q-opt-4" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi D">
                    </div>
                    <p class="text-xs text-on-surface-variant mt-2">Pastikan Jawaban Benar ada di salah satu kotak ini.</p>
                </div>`;
content = content.replace(oldHtml, newHtml);

// 2. Patch openAddModal
const openAddRegex = /document\.getElementById\('q-options'\)\.value = '';/;
const newOpenAdd = `for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).value = '';`;
content = content.replace(openAddRegex, newOpenAdd);

const reqAddRegex = /document\.getElementById\('q-options'\)\.required = true;/g;
const newReqAdd = `for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = true;`;
content = content.replace(reqAddRegex, newReqAdd);

const unreqAddRegex = /document\.getElementById\('q-options'\)\.required = false;/g;
const newUnreqAdd = `for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = false;`;
content = content.replace(unreqAddRegex, newUnreqAdd);

// 3. Patch editQuestion
const editRegex = /document\.getElementById\('q-options'\)\.value = \(item\.options \|\| \[\]\)\.join\(\', '\);/;
const newEdit = `let opts = item.options || [];
                for(let i=1; i<=4; i++) {
                    document.getElementById('q-opt-'+i).value = opts[i-1] || '';
                }`;
content = content.replace(editRegex, newEdit);

// 4. Patch saveQuestion
// Search for: let optionsStr = document.getElementById('q-options').value;
const saveRegexOld = /let optionsStr = document\.getElementById\('q-options'\)\.value;\s*let options = optionsStr\.split\(\',\ '\)\.map\(s => s\.trim\(\)\)\.filter\(s => s\);/;
const saveRegexNew = `let options = [];
            for(let i=1; i<=4; i++) {
                let val = document.getElementById('q-opt-'+i).value.trim();
                if(val) options.push(val);
            }`;
if (saveRegexOld.test(content)) {
    content = content.replace(saveRegexOld, saveRegexNew);
} else {
    // maybe it's `.split(',')`
    const altRegex = /let optionsStr = document\.getElementById\('q-options'\)\.value;\s*let options = optionsStr\.split\(\',\ '\)\.map\(s => s\.trim\(\)\)\.filter\(s => s\);/i;
    // let's just do a generic replace
    const rawRegex = /let optionsStr = document\.getElementById\('q-options'\)\.value;[\s\S]*?filter\(s => s\);/;
    content = content.replace(rawRegex, saveRegexNew);
}

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully patched options UI.");
