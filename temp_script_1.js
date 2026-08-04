
        // let currentGame = 'math_blitz';
        
        
        let lastFocusedMathField = null;
        
        // Track focus on math fields
        document.addEventListener('focusin', (e) => {
            if (e.target.tagName.toLowerCase() === 'math-field') {
                lastFocusedMathField = e.target;
            }
        });

        function insertFraction() {
            let field = lastFocusedMathField || document.getElementById('q-text');
            if (field && field.insert) {
                field.insert('\\frac{#0}{#?}');
                field.focus();
            }
        }


        let currentLevel = 1;
        let currentGame = 'twk';
        let questions = [];

        function setGame(game) {
            currentGame = game;
            currentLevel = 1;
            renderGameTabs();
            renderTabs();
            loadDB();
        }

        function renderGameTabs() {
            const container = document.getElementById('game-tabs');
            
            let twkClass = currentGame === 'twk' ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,149,0,0.3)]' : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10';
            let tiuClass = currentGame === 'tiu' ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,149,0,0.3)]' : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10';
            let tkpClass = currentGame === 'tkp' ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,149,0,0.3)]' : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10';
            
            container.innerHTML = `
                <button onclick="setGame('twk')" class="flex-none px-4 py-1.5 rounded-full text-xs transition-all ${twkClass}">TWK</button>
                <button onclick="setGame('tiu')" class="flex-none px-4 py-1.5 rounded-full text-xs transition-all ${tiuClass}">TIU</button>
                <button onclick="setGame('tkp')" class="flex-none px-4 py-1.5 rounded-full text-xs transition-all ${tkpClass}">TKP</button>
            `;
        }

        function renderTabs() {
            const tabsContainer = document.getElementById('level-tabs');
            let html = '';
            let maxLevels = 5; // Always 5 levels
            for(let i = 1; i <= maxLevels; i++) {
                if (i === currentLevel) {
                    html += `<button class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-tighter transition-all bg-primary text-black shadow-[0_0_8px_rgba(255,149,0,0.2)]">Lvl ${i}</button>`;
                } else {
                    html += `<button onclick="setLevel(${i})" class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl ${i}</button>`;
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
            let key = currentGame + 'DB_level' + currentLevel;
            let saved = localStorage.getItem(key);
            
            if (saved && saved !== '[]') {
                questions = JSON.parse(saved);
            } else {
                questions = [];
            }
            
            document.getElementById('total-questions-count').innerText = "Total: " + questions.length;
            renderQuestions();
        }

        function saveDB() {
            let key = currentGame + 'DB_level' + currentLevel;
            localStorage.setItem(key, JSON.stringify(questions));
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
                
                html += `
                <div class="bg-surface-container border border-white/5 rounded-2xl shadow-xl overflow-hidden group hover:border-primary/20 transition-all p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-bold text-on-surface leading-tight math-display">${qText}</h2>
                        <div class="flex gap-2">
                            <button onclick="editQuestion(${index})" class="p-2 rounded-lg bg-white/5 text-primary hover:bg-primary/20 transition-all" title="Edit">
                                <span class="material-symbols-outlined" style="font-size:18px;">edit</span>
                            </button>
                            <button onclick="deleteQuestion(${index})" class="p-2 rounded-lg bg-white/5 text-error hover:bg-error/20 transition-all" title="Hapus">
                                <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                            </button>
                        </div>
                    </div>
                `;
                
                let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
                if (!showOptions) {
                    html += `
                    <div class="bg-success/10 border border-success/30 rounded-lg p-3 inline-block">
                        <span class="text-sm font-bold text-success math-display">Jawaban: ${aText}</span>
                    </div>
                    `;
                }
                if (showOptions && item.options) {
                    html += `<div class="mt-4 flex flex-wrap gap-2">`;
                    item.options.forEach(opt => {
                        let isCorrect = opt === aText;
                        let bg = isCorrect ? 'bg-primary/20 text-primary border-primary/30' : 'bg-white/5 text-on-surface-variant border-white/10';
                        html += `<span class="px-3 py-1 rounded-full text-xs font-medium border ${bg} math-display">${opt}</span>`;
                    });
                    html += `</div>`;
                }
                
                html += `</div>`;
            });
            list.innerHTML = html;
            if (true) {
                setTimeout(() => {
                    document.querySelectorAll('.math-display').forEach(el => {
                        let text = el.innerText;
                        let innerHtml = '';
                        if (text.startsWith('Jawaban: ')) {
                            let mathPart = text.replace('Jawaban: ', '');
                            innerHtml = 'Jawaban: <math-field readonly style="display:inline-block; pointer-events:none; background:transparent; border:none; padding:0; margin:0;" class="text-success">' + mathPart + '</math-field>';
                        } else {
                            innerHtml = '<math-field readonly style="display:inline-block; pointer-events:none; background:transparent; border:none; padding:0; margin:0;" class="text-white">' + text + '</math-field>';
                        }
                        el.innerHTML = innerHtml;
                    });
                }, 50);
            }
        }

        function openAddModal() {
            document.getElementById('modal-title').innerText = "Tambah Soal";
            document.getElementById('q-index').value = -1;
            
            let isMath = true;
            
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
        }

        function editQuestion(index) {
            let item = questions[index];
            document.getElementById('modal-title').innerText = "Edit Soal";
            document.getElementById('q-index').value = index;
            
            let qText = item.q || item.question || '';
            let aText = item.a || item.answer || '';
            
            let isMath = true;
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
            let isMath = true;
            let text = isMath ? document.getElementById('q-text').value : document.getElementById('q-text-plain').value;
            let answer = isMath ? document.getElementById('q-answer').value : document.getElementById('q-answer-plain').value;
            
            let newItem = {};
            let isOptionsBased = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
            
            if (isOptionsBased) {
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
            renderGameTabs();
            renderTabs();
            setTimeout(loadDB, 50);
        });
    