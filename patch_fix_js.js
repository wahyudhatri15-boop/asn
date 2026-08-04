const fs = require('fs');
let content = fs.readFileSync('database-soal.html', 'utf8');

// The broken code starts at the first occurrence of:
// `let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');`
// followed by `if (showOptions) {` (from the bad replacement)
// We need to replace it with the correct rendering loop ending AND the correct openAddModal function

const fixCode = `let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
                if (showOptions && item.options) {
                    html += \\\`<div class="mt-4 flex flex-wrap gap-2">\\\`;
                    item.options.forEach(opt => {
                        let isCorrect = opt === aText;
                        let bg = isCorrect ? 'bg-primary/20 text-primary border-primary/30' : 'bg-white/5 text-on-surface-variant border-white/10';
                        html += \\\`<span class="px-3 py-1 rounded-full text-xs font-medium border \\\${bg} math-display">\\\${opt}</span>\\\`;
                    });
                    html += \\\`</div>\\\`;
                }
                
                html += \\\`</div>\\\`;
            });
            list.innerHTML = html;
            if (currentGame === 'math_blitz') {
                setTimeout(() => {
                    document.querySelectorAll('.math-display').forEach(el => {
                        let text = el.innerText;
                        if (text.startsWith('Jawaban: ')) {
                            let mathPart = text.replace('Jawaban: ', '');
                            el.innerHTML = 'Jawaban: <span class="math-content">$$' + mathPart + '$$</span>';
                        } else {
                            el.innerHTML = '$$' + text + '$$';
                        }
                    });
                    if (window.MathLive) {
                        window.MathLive.renderMathInDocument();
                    }
                }, 50);
            }
        }

        function openAddModal() {
            document.getElementById('modal-title').innerText = "Tambah Soal";
            document.getElementById('q-index').value = -1;
            
            let isMath = currentGame === 'math_blitz';
            
            if (isMath) {
                document.getElementById('q-text').classList.remove('hidden');
                document.getElementById('q-answer').classList.remove('hidden');
                document.getElementById('q-text-plain').classList.add('hidden');
                document.getElementById('q-answer-plain').classList.add('hidden');
                
                if (document.getElementById('q-text').setValue) {
                    document.getElementById('q-text').setValue('');
                    document.getElementById('q-answer').setValue('');
                } else {
                    document.getElementById('q-text').value = '';
                    document.getElementById('q-answer').value = '';
                }
                document.getElementById('q-text-plain').required = false;
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('q-text').classList.add('hidden');
                document.getElementById('q-answer').classList.add('hidden');
                document.getElementById('q-text-plain').classList.remove('hidden');
                document.getElementById('q-answer-plain').classList.remove('hidden');
                
                document.getElementById('q-text-plain').value = '';
                document.getElementById('q-answer-plain').value = '';
                document.getElementById('q-text-plain').required = true;
                document.getElementById('q-answer-plain').required = true;
            }
            
            let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-answer-container').classList.add('hidden');
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = true;
                document.getElementById('q-radio-1').checked = true;
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).value = '';
                
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-answer-container').classList.remove('hidden');
                for(let i=1; i<=4; i++) document.getElementById('q-opt-'+i).required = false;
                
                if (!isMath) document.getElementById('q-answer-plain').required = true;
            }
            
            document.getElementById('question-modal').classList.remove('hidden');
        }`;

// Using regex to replace the broken block
// The broken block starts with `let showOptions = ` inside renderQuestions and ends at `document.getElementById('question-modal').classList.remove('hidden');\n        }`
const brokenRegex = /let showOptions = \(currentGame === 'math_blitz' && currentLevel === 1\) \|\| \(currentGame === 'word_equation'\);\s*if \(showOptions\) \{\s*document\.getElementById\('options-container'\)\.classList\.remove\('hidden'\);[\s\S]*?document\.getElementById\('question-modal'\)\.classList\.remove\('hidden'\);\s*\}/;

if (brokenRegex.test(content)) {
    content = content.replace(brokenRegex, fixCode);
    fs.writeFileSync('database-soal.html', content, 'utf8');
    console.log("Successfully fixed javascript.");
} else {
    console.log("Regex not found. Writing temp file to debug.");
    fs.writeFileSync('temp_debug.html', content, 'utf8');
}
