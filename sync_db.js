const fs = require('fs');
const path = require('path');

const sampleQuestionsStr = `[
    {
        "q": "Dalam rangka menghormati umat beragama lain saat merayakan hari rayanya, sikap yang paling sesuai dengan pengamalan sila pertama Pancasila adalah...",
        "options": [
            "Mengucapkan selamat dan ikut bergembira dalam suasana hari raya bersama pemeluk agama lain",
            "Membantu menjaga ketertiban lingkungan agar perayaan berjalan aman dan lancar",
            "Memberi kesempatan umat agama lain beribadah dengan tenang tanpa mencampuri ritualnya",
            "Menghargai perayaan dengan tidak menampilkan identitas agama sendiri demi menghindari perbedaan",
            "Menyambut perayaan dengan ikut serta dalam ritual doa agama lain sebagai wujud kebersamaan"
        ],
        "a": "Memberi kesempatan umat agama lain beribadah dengan tenang tanpa mencampuri ritualnya",
        "key": "C",
        "pembahasan": "Sila pertama, 'Ketuhanan Yang Maha Esa,' menekankan pada kebebasan beragama dan toleransi antar umat beragama tanpa mencampuri ritual keagamaan masing-masing."
    },
    {
        "q": "Integritas nasional merupakan pondasi penting dalam menjaga keutuhan NKRI. Salah satu wujud nyata dari sikap integritas sebagai seorang ASN adalah...",
        "options": [
            "Menolak segala bentuk gratifikasi dan melaporkannya sesuai prosedur hukum yang berlaku",
            "Mengutamakan kepentingan kelompok tertentu yang memberikan dukungan politik",
            "Memanfaatkan fasilitas kantor untuk kepentingan pribadi dalam batas wajar",
            "Menerima imbalan tambahan atas pelayanan publik yang cepat dan memuaskan",
            "Menyimpan informasi publik yang wajib dibuka demi pertimbangan subjektif"
        ],
        "a": "Menolak segala bentuk gratifikasi dan melaporkannya sesuai prosedur hukum yang berlaku",
        "key": "A",
        "pembahasan": "Menolak segala bentuk gratifikasi dan berani melaporkannya adalah nilai utama dari integritas seorang Aparatur Sipil Negara."
    },
    {
        "q": "Semua mahasiswa psikologi memelajari perilaku manusia. Sebagian orang yang memelajari perilaku manusia menjadi konselor yang sukses. Kesimpulan yang benar adalah...",
        "options": [
            "Semua mahasiswa psikologi pasti menjadi konselor yang sukses",
            "Sebagian mahasiswa psikologi mungkin menjadi konselor yang sukses",
            "Tidak ada mahasiswa psikologi yang menjadi konselor sukses",
            "Semua konselor yang sukses adalah mahasiswa psikologi",
            "Orang yang bukan mahasiswa psikologi tidak bisa menjadi konselor"
        ],
        "a": "Sebagian mahasiswa psikologi mungkin menjadi konselor yang sukses",
        "key": "B",
        "pembahasan": "Karena sebagian pemelajar perilaku manusia menjadi konselor sukses, maka sebagian mahasiswa psikologi (yang juga memelajari perilaku manusia) mungkin menjadi konselor yang sukses."
    }
]`;

function updateDatabaseSoal() {
    const file = path.join(__dirname, 'database-soal.html');
    let content = fs.readFileSync(file, 'utf8');

    const loadDbPattern = /function loadDB\(\) \{[\s\S]*?if \(saved && saved !== '\[\]'\) \{[\s\S]*?questions = JSON\.parse\(saved\);[\s\S]*?\} else \{[\s\S]*?questions = \[\];[\s\S]*?\}/;
    
    const replacement = `function loadDB() {
            let key = currentGame + 'DB_level' + currentLevel;
            let saved = localStorage.getItem(key);
            
            if (saved && saved !== '[]') {
                questions = JSON.parse(saved);
            } else if (currentGame === 'twk' && currentLevel === 1) {
                questions = ${sampleQuestionsStr};
                // save default to localstorage
                localStorage.setItem(key, JSON.stringify(questions));
            } else {
                questions = [];
            }`;

    if (content.match(loadDbPattern)) {
        content = content.replace(loadDbPattern, replacement);
        fs.writeFileSync(file, content);
        console.log('Updated database-soal.html');
    } else {
        console.log('Could not find loadDB function in database-soal.html');
    }
}

function updatePembahasan() {
    const file = path.join(__dirname, 'pembahasan.html');
    let content = fs.readFileSync(file, 'utf8');

    // Replace sampleQuestions assignment
    const samplePattern = /const sampleQuestions = \[[\s\S]*?\];/;
    const loadFromStorage = `
    let defaultQuestions = ${sampleQuestionsStr};
    let activeQuizCategory = localStorage.getItem('selectedCategory') || 'TWK';
    let dbKey = activeQuizCategory.toLowerCase() + 'DB_level1';
    let saved = localStorage.getItem(dbKey);
    let sampleQuestions = defaultQuestions;
    if (saved && saved !== '[]') {
        let parsed = JSON.parse(saved);
        // map db format to pembahasan format
        sampleQuestions = parsed.map(p => ({
            q: p.q || p.question,
            options: p.options || [],
            key: p.key || (p.a === p.options?.[0] ? 'A' : p.a === p.options?.[1] ? 'B' : p.a === p.options?.[2] ? 'C' : p.a === p.options?.[3] ? 'D' : 'E'),
            explanation: p.pembahasan || ''
        }));
    }
    const totalQ = sampleQuestions.length || 50;`;

    if (content.match(samplePattern)) {
        content = content.replace(samplePattern, loadFromStorage);
        // also replace totalQ const if it exists
        content = content.replace(/const totalQ = 50;/, '');
        fs.writeFileSync(file, content);
        console.log('Updated pembahasan.html');
    }
}

function updateArenaBattle() {
    const file = path.join(__dirname, 'arena-battle.html');
    let content = fs.readFileSync(file, 'utf8');

    // Add id to question text
    content = content.replace(/<p class="text-on-surface-variant leading-relaxed text-base md:text-lg">Dalam rangka/, '<p id="question-text-content" class="text-on-surface-variant leading-relaxed text-base md:text-lg">Dalam rangka');
    
    // Add id to options container
    content = content.replace(/<div class="flex flex-col gap-4">/, '<div class="flex flex-col gap-4" id="options-container">');

    // Add JS to load questions from DB
    const jsInsertPos = content.indexOf('const categoryQuestionCounts = {');
    if (jsInsertPos > -1) {
        const jsInsert = `
    let defaultQuestions = ${sampleQuestionsStr};
    let dbKey = activeQuizCategory.toLowerCase() + 'DB_level1';
    let saved = localStorage.getItem(dbKey);
    let dbQuestions = defaultQuestions;
    if (saved && saved !== '[]') {
        dbQuestions = JSON.parse(saved);
    }
    const totalQuestions = dbQuestions.length;
    `;
        // replace the old activeQuizCategory and totalQuestions
        content = content.replace(/let activeQuizCategory = localStorage\.getItem\('selectedCategory'\) \|\| 'TWK';\s*const totalQuestions = categoryQuestionCounts\[activeQuizCategory\] \|\| 30;/, 
            `let activeQuizCategory = localStorage.getItem('selectedCategory') || 'TWK';\n${jsInsert}`);
    }
    
    // Update updateQuestionDisplay function
    const updateFnPattern = /function updateQuestionDisplay\(\) \{[\s\S]*?\}\n\n    \/\/ Handle Option Click/;
    
    const newUpdateFn = `function updateQuestionDisplay() {
        const title = document.getElementById('question-title');
        if (title) title.textContent = \`Soal Nomor \${currentQuestion}\`;
        
        const qText = document.getElementById('question-text-content');
        const qData = dbQuestions[currentQuestion - 1];
        if (qText && qData) {
            qText.innerHTML = qData.q || qData.question || '';
        }
        
        const optContainer = document.getElementById('options-container');
        if (optContainer && qData && qData.options) {
            optContainer.innerHTML = '';
            const labels = ['A', 'B', 'C', 'D', 'E'];
            const selectedOpt = userAnswers[currentQuestion];
            qData.options.forEach((optText, idx) => {
                const isSelected = selectedOpt === labels[idx];
                const btn = document.createElement('button');
                btn.className = isSelected 
                    ? 'option-card flex items-center gap-5 p-5 md:p-6 rounded-xl bg-primary/20 border border-primary transition-all text-left group'
                    : 'option-card flex items-center gap-5 p-5 md:p-6 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all text-left border border-white/5 group';
                btn.innerHTML = \`<span class="font-bold text-base md:text-lg w-8 text-primary">\${labels[idx]}</span>
                                 <span class="text-base md:text-lg text-on-surface-variant group-hover:text-on-surface leading-relaxed">\${optText}</span>\`;
                btn.onclick = function() {
                    userAnswers[currentQuestion] = labels[idx];
                    updateQuestionDisplay();
                    renderQuestionGrid();
                };
                optContainer.appendChild(btn);
            });
        }
        
        // Update button states
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        if (btnPrev) btnPrev.disabled = currentQuestion === 1;
        if (btnNext) {
            if (currentQuestion === totalQuestions) {
                const firstUnanswered = Array.from({length: totalQuestions}, (_, i) => i + 1).find(q => !userAnswers[q]);
                btnNext.disabled = !firstUnanswered;
            } else {
                btnNext.disabled = false;
            }
        }
    }
    
    // Handle Option Click`;

    if (content.match(updateFnPattern)) {
        content = content.replace(updateFnPattern, newUpdateFn);
    }
    
    // Remove the old hardcoded options click listener
    content = content.replace(/\/\/ Handle Option Click[\s\S]*?\}\);\n    \}\);/, '');

    fs.writeFileSync(file, content);
    console.log('Updated arena-battle.html');
}

updateDatabaseSoal();
updatePembahasan();
updateArenaBattle();
