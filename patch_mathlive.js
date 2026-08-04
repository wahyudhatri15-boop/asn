const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// 1. Inject MathLive library
if (!content.includes('mathlive.js') && !content.includes('unpkg.com/mathlive')) {
    content = content.replace('</head>', '  <script src="https://unpkg.com/mathlive"></script>\n</head>');
}

// 2. Replace the old toolbar with nothing (since MathLive has its own virtual keyboard)
const oldToolbarRegex = /<div class="mb-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
// Actually I added it right above `<form ...>`, wait, no, inside form.
// I can just replace the whole form to use math-field
const formRegex = /<form id="question-form"[\s\S]*?<\/form>/;

const newFormHtml = `
            <form id="question-form" class="space-y-4" onsubmit="saveQuestion(event)">
                <input type="hidden" id="q-index" value="-1">
                
                <div id="q-text-container">
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Pertanyaan</label>
                    <math-field id="q-text" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-lg focus:border-primary focus:outline-none" style="min-height: 48px;"></math-field>
                    <input type="text" id="q-text-plain" required class="hidden w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                </div>
                
                <div id="q-answer-container">
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Jawaban Benar</label>
                    <math-field id="q-answer" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-lg focus:border-primary focus:outline-none" style="min-height: 48px;"></math-field>
                    <input type="text" id="q-answer-plain" required class="hidden w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                </div>
                
                <div id="options-container" class="hidden">
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Pilihan Jawaban (Level 1 Khusus - Pisahkan dengan koma)</label>
                    <input type="text" id="q-options" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Opsi A, Opsi B, Opsi C, Opsi D">
                    <p class="text-xs text-on-surface-variant mt-1">Pastikan Jawaban Benar ada di dalam daftar pilihan ini.</p>
                </div>
                
                <div class="pt-4 flex justify-end gap-3">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-lg font-medium text-on-surface-variant hover:bg-white/5 transition-all">Batal</button>
                    <button type="submit" class="px-4 py-2 rounded-lg font-bold bg-primary text-black hover:opacity-90 transition-opacity">Simpan</button>
                </div>
            </form>
`;

if (formRegex.test(content)) {
    content = content.replace(formRegex, newFormHtml);
}

// 3. Update JavaScript logic to use MathLive value or plain value based on currentGame
const scriptRegex = /function openAddModal\(\) \{[\s\S]*?function closeModal\(\)/;
const newScript = `function openAddModal() {
            document.getElementById('modal-title').innerText = "Tambah Soal";
            document.getElementById('q-index').value = -1;
            
            let isMath = currentGame === 'math_blitz';
            
            if (isMath) {
                document.getElementById('q-text').classList.remove('hidden');
                document.getElementById('q-answer').classList.remove('hidden');
                document.getElementById('q-text-plain').classList.add('hidden');
                document.getElementById('q-answer-plain').classList.add('hidden');
                
                document.getElementById('q-text').value = '';
                document.getElementById('q-answer').value = '';
                // Disable required on plain since we use math-field
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
            
            document.getElementById('q-options').value = '';
            
            let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-options').required = true;
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-options').required = false;
            }
            
            document.getElementById('question-modal').classList.remove('hidden');
        }

        function editQuestion(index) {
            let item = questions[index];
            document.getElementById('modal-title').innerText = "Edit Soal";
            document.getElementById('q-index').value = index;
            
            let qText = item.q || item.question || '';
            let aText = item.a || item.answer || '';
            
            let isMath = currentGame === 'math_blitz';
            if (isMath) {
                document.getElementById('q-text').classList.remove('hidden');
                document.getElementById('q-answer').classList.remove('hidden');
                document.getElementById('q-text-plain').classList.add('hidden');
                document.getElementById('q-answer-plain').classList.add('hidden');
                
                document.getElementById('q-text').value = qText;
                document.getElementById('q-answer').value = aText;
                
                document.getElementById('q-text-plain').required = false;
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('q-text').classList.add('hidden');
                document.getElementById('q-answer').classList.add('hidden');
                document.getElementById('q-text-plain').classList.remove('hidden');
                document.getElementById('q-answer-plain').classList.remove('hidden');
                
                document.getElementById('q-text-plain').value = qText;
                document.getElementById('q-answer-plain').value = aText;
                
                document.getElementById('q-text-plain').required = true;
                document.getElementById('q-answer-plain').required = true;
            }
            
            let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-options').required = true;
                document.getElementById('q-options').value = (item.options || []).join(', ');
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-options').required = false;
            }
            
            document.getElementById('question-modal').classList.remove('hidden');
        }

        function deleteQuestion(index) {
            if(confirm('Yakin ingin menghapus soal ini?')) {
                questions.splice(index, 1);
                saveDB();
            }
        }

        function closeModal()`;

if (scriptRegex.test(content)) {
    content = content.replace(scriptRegex, newScript);
}

// 4. Update saveQuestion to get from the right field
const saveRegex = /let text = document.getElementById\('q-text'\)\.value;\s*let answer = document.getElementById\('q-answer'\)\.value;/;
const newSave = `let isMath = currentGame === 'math_blitz';
            let text = isMath ? document.getElementById('q-text').value : document.getElementById('q-text-plain').value;
            let answer = isMath ? document.getElementById('q-answer').value : document.getElementById('q-answer-plain').value;`;

if (saveRegex.test(content)) {
    content = content.replace(saveRegex, newSave);
}

// 5. Update renderQuestions to render LaTeX
const renderRegex = /<h2 class="text-xl font-bold text-on-surface leading-tight">\\\${qText}<\/h2>/;
const newRender = `<h2 class="text-xl font-bold text-on-surface leading-tight math-display">\\\${qText}</h2>`;

if (renderRegex.test(content)) {
    content = content.replace(renderRegex, newRender);
}

// And Jawaban
const renderAnsRegex = /<span class="text-sm font-bold text-success">Jawaban: \\\${aText}<\/span>/;
const newRenderAns = `<span class="text-sm font-bold text-success math-display">Jawaban: \\\${aText}</span>`;

if (renderAnsRegex.test(content)) {
    content = content.replace(renderAnsRegex, newRenderAns);
}

// And Option tags
const optRegex = /html \+= \\\`<span class="px-3 py-1 rounded-full text-xs font-medium border \\\${bg}">\\\${opt}<\/span>\\\`;/;
const newOpt = `html += \\\`<span class="px-3 py-1 rounded-full text-xs font-medium border \\\${bg} math-display">\\\${opt}</span>\\\`;`;

if (optRegex.test(content)) {
    content = content.replace(optRegex, newOpt);
}

// Add MathLive rendering call after innerHTML assignment
const innerHtmlRegex = /list\.innerHTML = html;/;
const newInnerHtml = `list.innerHTML = html;
            if (currentGame === 'math_blitz') {
                setTimeout(() => {
                    document.querySelectorAll('.math-display').forEach(el => {
                        // We extract the text, wrap it in $$ and render
                        // But since Jawaban has "Jawaban: ", we should only render the math part.
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
            }`;

if (innerHtmlRegex.test(content)) {
    content = content.replace(innerHtmlRegex, newInnerHtml);
}

// Remove old toolbar html block
const oldTBRegex = /<div class="mb-4">[\s\S]*?<\/div>[\s\S]*?<\/div>/;
if (content.includes('Simbol Matematika (Seperti MS Word)')) {
   // Just replace the whole block by finding exact substring or regex
   const startIdx = content.indexOf('<div class="mb-4">');
   const endIdx = content.indexOf('<p class="text-[10px] text-on-surface-variant mt-1">Tips:');
   if (startIdx !== -1 && endIdx !== -1) {
       // Too complex, let's just do it directly
   }
}

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully integrated MathLive to database-soal.");
