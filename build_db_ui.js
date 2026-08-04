const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// We replace the inside of <main id="main-content" ...> 
// Let's find <main ...> and replace up to </main>
const mainRegex = /(<main id="main-content"[\s\S]*?>)([\s\S]*?)(<\/main>)/;

const newMainContent = `
    <section class="max-w-4xl mx-auto space-y-8">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2">
                <button class="flex-none px-4 py-1.5 rounded-full bg-primary text-black font-bold text-xs shadow-[0_0_10px_rgba(255,149,0,0.3)] transition-all">Math Blitz</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant text-xs font-medium cursor-not-allowed opacity-50" title="Coming Soon">Number Chain</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant text-xs font-medium cursor-not-allowed opacity-50" title="Coming Soon">Syllogism Scan</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant text-xs font-medium cursor-not-allowed opacity-50" title="Coming Soon">Logic Matrix</button>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest" id="total-questions-count">Total: 0</span>
                <button onclick="openAddModal()" class="px-4 py-2 bg-primary text-black rounded-lg font-bold text-xs hover:scale-105 transition-transform flex items-center gap-2">
                    <span class="material-symbols-outlined" style="font-size: 16px;">add</span> Tambah Soal
                </button>
            </div>
        </div>

        <div class="flex items-center gap-2 mb-6" id="level-tabs">
            <!-- Rendered via JS -->
        </div>

        <div id="questions-list" class="space-y-6">
            <!-- Questions rendered here -->
        </div>
    </section>

    <!-- Modal Form -->
    <div id="question-modal" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-surface-container border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button onclick="closeModal()" class="absolute top-4 right-4 text-on-surface-variant hover:text-white">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="text-xl font-bold text-primary mb-6" id="modal-title">Tambah Soal</h3>
            
            <form id="question-form" class="space-y-4" onsubmit="saveQuestion(event)">
                <input type="hidden" id="q-index" value="-1">
                
                <div>
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Pertanyaan</label>
                    <input type="text" id="q-text" required class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Jawaban Benar</label>
                    <input type="text" id="q-answer" required class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
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
        </div>
    </div>
    
    <script>
        let currentLevel = 1;
        let questions = [];

        function renderTabs() {
            const tabsContainer = document.getElementById('level-tabs');
            let html = '';
            for(let i = 1; i <= 5; i++) {
                if (i === currentLevel) {
                    html += \`<button class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-tighter transition-all bg-primary text-black shadow-[0_0_8px_rgba(255,149,0,0.2)]">Lvl \${i}</button>\`;
                } else {
                    html += \`<button onclick="setLevel(\${i})" class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl \${i}</button>\`;
                }
            }
            tabsContainer.innerHTML = html;
        }

        function setLevel(lvl) {
            currentLevel = lvl;
            renderTabs();
            loadDB();
        }

        function loadDB() {
            let saved = localStorage.getItem('mathBlitzDB_level' + currentLevel);
            if (saved && saved !== '[]') {
                questions = JSON.parse(saved);
            } else {
                questions = defaultMathBlitzDB['level' + currentLevel] ? JSON.parse(JSON.stringify(defaultMathBlitzDB['level' + currentLevel])) : [];
            }
            
            // Validate data format
            // If they are level 2-5, they use {question, answer}. If level 1, {q, a, options}.
            
            document.getElementById('total-questions-count').innerText = "Total: " + questions.length;
            renderQuestions();
        }

        function saveDB() {
            localStorage.setItem('mathBlitzDB_level' + currentLevel, JSON.stringify(questions));
            loadDB();
        }

        function renderQuestions() {
            const list = document.getElementById('questions-list');
            if (questions.length === 0) {
                list.innerHTML = '<div class="text-center py-12 text-on-surface-variant">Belum ada soal di level ini.</div>';
                return;
            }
            
            let html = '';
            questions.forEach((item, index) => {
                let qText = item.q || item.question || '';
                let aText = item.a || item.answer || '';
                
                html += \`
                <div class="bg-surface-container border border-white/5 rounded-2xl shadow-xl overflow-hidden group hover:border-primary/20 transition-all p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-bold text-on-surface leading-tight">\${qText}</h2>
                        <div class="flex gap-2">
                            <button onclick="editQuestion(\${index})" class="p-2 rounded-lg bg-white/5 text-primary hover:bg-primary/20 transition-all" title="Edit">
                                <span class="material-symbols-outlined" style="font-size:18px;">edit</span>
                            </button>
                            <button onclick="deleteQuestion(\${index})" class="p-2 rounded-lg bg-white/5 text-error hover:bg-error/20 transition-all" title="Hapus">
                                <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="bg-success/10 border border-success/30 rounded-lg p-3 inline-block">
                        <span class="text-sm font-bold text-success">Jawaban: \${aText}</span>
                    </div>
                \`
                
                if (currentLevel === 1 && item.options) {
                    html += \`<div class="mt-4 flex flex-wrap gap-2">\`;
                    item.options.forEach(opt => {
                        let isCorrect = opt === aText;
                        let bg = isCorrect ? 'bg-primary/20 text-primary border-primary/30' : 'bg-white/5 text-on-surface-variant border-white/10';
                        html += \`<span class="px-3 py-1 rounded-full text-xs font-medium border \${bg}">\${opt}</span>\`;
                    });
                    html += \`</div>\`;
                }
                
                html += \`</div>\`;
            });
            list.innerHTML = html;
        }

        function openAddModal() {
            document.getElementById('modal-title').innerText = "Tambah Soal";
            document.getElementById('q-index').value = -1;
            document.getElementById('q-text').value = '';
            document.getElementById('q-answer').value = '';
            document.getElementById('q-options').value = '';
            
            if (currentLevel === 1) {
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
            document.getElementById('q-text').value = item.q || item.question || '';
            document.getElementById('q-answer').value = item.a || item.answer || '';
            
            if (currentLevel === 1) {
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

        function closeModal() {
            document.getElementById('question-modal').classList.add('hidden');
        }

        function saveQuestion(e) {
            e.preventDefault();
            let index = parseInt(document.getElementById('q-index').value);
            let text = document.getElementById('q-text').value;
            let answer = document.getElementById('q-answer').value;
            
            let newItem = {};
            if (currentLevel === 1) {
                newItem.q = text;
                newItem.a = answer;
                let opts = document.getElementById('q-options').value.split(',').map(s => s.trim()).filter(s => s);
                if (!opts.includes(answer)) {
                    opts.push(answer);
                }
                newItem.options = opts;
            } else {
                newItem.question = text;
                newItem.answer = answer;
            }
            
            if (index >= 0) {
                questions[index] = newItem;
            } else {
                questions.push(newItem);
            }
            
            saveDB();
            closeModal();
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderTabs();
            // Wait slightly for defaultMathBlitzDB to load if necessary
            setTimeout(loadDB, 50);
        });
    </script>
`;

if (mainRegex.test(content)) {
    content = content.replace(mainRegex, "$1\n" + newMainContent + "\n$3");
    fs.writeFileSync('database-soal.html', content, 'utf8');
    console.log("Successfully built DB UI.");
} else {
    console.log("Failed to find main-content");
}
