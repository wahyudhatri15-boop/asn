const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// 1. HTML Update: Add radio buttons to the 4 inputs
const oldOptionsHtml = `<div class="grid grid-cols-2 gap-3">
                        <input type="text" id="q-opt-1" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi A">
                        <input type="text" id="q-opt-2" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi B">
                        <input type="text" id="q-opt-3" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi C">
                        <input type="text" id="q-opt-4" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi D">
                    </div>
                    <p class="text-xs text-on-surface-variant mt-2">Pastikan Jawaban Benar ada di salah satu kotak ini.</p>`;

const newOptionsHtml = `<div class="grid grid-cols-2 gap-3">
                        <div class="relative flex items-center">
                            <input type="radio" name="correct-option" value="1" id="q-radio-1" class="absolute left-3 w-4 h-4 text-primary focus:ring-primary border-white/20 bg-black/50 cursor-pointer" checked>
                            <input type="text" id="q-opt-1" class="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi A">
                        </div>
                        <div class="relative flex items-center">
                            <input type="radio" name="correct-option" value="2" id="q-radio-2" class="absolute left-3 w-4 h-4 text-primary focus:ring-primary border-white/20 bg-black/50 cursor-pointer">
                            <input type="text" id="q-opt-2" class="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi B">
                        </div>
                        <div class="relative flex items-center">
                            <input type="radio" name="correct-option" value="3" id="q-radio-3" class="absolute left-3 w-4 h-4 text-primary focus:ring-primary border-white/20 bg-black/50 cursor-pointer">
                            <input type="text" id="q-opt-3" class="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi C">
                        </div>
                        <div class="relative flex items-center">
                            <input type="radio" name="correct-option" value="4" id="q-radio-4" class="absolute left-3 w-4 h-4 text-primary focus:ring-primary border-white/20 bg-black/50 cursor-pointer">
                            <input type="text" id="q-opt-4" class="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi D">
                        </div>
                    </div>
                    <p class="text-xs text-on-surface-variant mt-2">Pilih salah satu lingkaran di atas untuk menentukan Jawaban Benar.</p>`;

content = content.replace(oldOptionsHtml, newOptionsHtml);


// 2. Patch openAddModal logic to hide q-answer-container when showOptions is true
const openAddRegex = /let showOptions = \(currentGame === 'math_blitz' && currentLevel === 1\) \|\| \(currentGame === 'word_equation'\);[\s\S]*?document\.getElementById\('question-modal'\)\.classList\.remove\('hidden'\);/;

const newOpenAddLogic = `let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-answer-container').classList.add('hidden');
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = true;
                document.getElementById('q-radio-1').checked = true;
                
                // Also remove required from q-answer plain just in case
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-answer-container').classList.remove('hidden');
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = false;
                
                if (!isMath) document.getElementById('q-answer-plain').required = true;
            }
            
            document.getElementById('question-modal').classList.remove('hidden');`;

content = content.replace(openAddRegex, newOpenAddLogic);


// 3. Patch editQuestion logic to set radio button and hide q-answer-container
const editRegex = /let showOptions = \(currentGame === 'math_blitz' && currentLevel === 1\) \|\| \(currentGame === 'word_equation'\);[\s\S]*?document\.getElementById\('question-modal'\)\.classList\.remove\('hidden'\);/;

const newEditLogic = `let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-answer-container').classList.add('hidden');
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = true;
                document.getElementById('q-answer-plain').required = false;
                
                let opts = item.options || [];
                for(let i=1; i<=4; i++) {
                    document.getElementById('q-opt-'+i).value = opts[i-1] || '';
                    if (opts[i-1] === aText) {
                        document.getElementById('q-radio-'+i).checked = true;
                    }
                }
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-answer-container').classList.remove('hidden');
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = false;
                
                if (!isMath) document.getElementById('q-answer-plain').required = true;
            }
            
            document.getElementById('question-modal').classList.remove('hidden');`;

content = content.replace(editRegex, newEditLogic);


// 4. Patch saveQuestion logic
// Replace how answer and options are gathered
const saveRegex = /let text = isMath \? document\.getElementById\('q-text'\)\.value : document\.getElementById\('q-text-plain'\)\.value;[\s\S]*?if\(!text \|\| \!answer\) return alert\('Pertanyaan dan Jawaban harus diisi!'\);/;

const newSaveLogic = `let text = isMath ? document.getElementById('q-text').value : document.getElementById('q-text-plain').value;
            let answer = '';
            let options = [];
            
            let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            
            if (showOptions) {
                for(let i=1; i<=4; i++) {
                    let val = document.getElementById('q-opt-'+i).value.trim();
                    if(val) options.push(val);
                    if(document.getElementById('q-radio-'+i).checked) {
                        answer = val;
                    }
                }
            } else {
                answer = isMath ? document.getElementById('q-answer').value : document.getElementById('q-answer-plain').value;
            }
            
            if(!text || !answer) return alert('Pertanyaan dan Jawaban harus diisi!');`;

content = content.replace(saveRegex, newSaveLogic);

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully patched radio options.");
