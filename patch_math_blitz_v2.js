const fs = require('fs');

const levels = [
    { file: 'math-blitz-level-1.html', key: 'mathBlitzDB_level1', dbKey: 'level1' },
    { file: 'math-blitz-level-2.html', key: 'mathBlitzDB_level2', dbKey: 'level2' },
    { file: 'math-blitz-level-3.html', key: 'mathBlitzDB_level3', dbKey: 'level3' },
    { file: 'math-blitz-level-4.html', key: 'mathBlitzDB_level4', dbKey: 'level4' },
    { file: 'math-blitz-level-5.html', key: 'mathBlitzDB_level5', dbKey: 'level5' }
];

levels.forEach(l => {
    if (fs.existsSync(l.file)) {
        let content = fs.readFileSync(l.file, 'utf8');
        
        // 1. Inject default_math_db.js if not present
        if (!content.includes('default_math_db.js')) {
            content = content.replace('</head>', '<script src="default_math_db.js"></script>\n</head>');
        }
        
        // 2. Replace initGame
        // We find the entire initGame function block. 
        // We will just do a string replacement for the first occurrence of `function initGame() {` up to `loadQuestion(0);`
        const initGameStart = 'function initGame() {';
        const initGameRegex = new RegExp('function initGame\\(\\) \\{[\\s\\S]*?loadQuestion\\(0\\);\\s*\\}', 'm');
        
        const newInitGame = `function initGame() {
        let saved = localStorage.getItem('${l.key}');
        let pool = [];
        if (saved && saved !== '[]') {
            pool = JSON.parse(saved);
        } else {
            pool = defaultMathBlitzDB.${l.dbKey};
        }
        // Shuffle and pick 10
        questions = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
        
        currentQuestionIndex = 0;
        score = 0;
        currentStreak = 0;
        maxStreak = 0;
        correctAnswersCount = 0;
        if (typeof correctAnswers !== 'undefined') correctAnswers = 0;
        if (typeof streak !== 'undefined') streak = 0;
        if (typeof totalTimeSpent !== 'undefined') totalTimeSpent = 0;
        
        const currentScoreEl = document.getElementById("current-score");
        if(currentScoreEl) currentScoreEl.innerText = "0";
        
        loadQuestion(0);
    }`;

        if (initGameRegex.test(content)) {
            content = content.replace(initGameRegex, newInitGame);
        } else {
            console.log("Could not find initGame in", l.file);
        }
        
        fs.writeFileSync(l.file, content, 'utf8');
        console.log("Patched", l.file);
    }
});

// Also inject into database-soal.html
if (fs.existsSync('database-soal.html')) {
    let dbContent = fs.readFileSync('database-soal.html', 'utf8');
    if (!dbContent.includes('default_math_db.js')) {
        dbContent = dbContent.replace('</head>', '<script src="default_math_db.js"></script>\n</head>');
        fs.writeFileSync('database-soal.html', dbContent, 'utf8');
        console.log("Injected script into database-soal.html");
    }
}
