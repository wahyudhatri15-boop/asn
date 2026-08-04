const fs = require('fs');

const levels = [
    { file: 'math-blitz-level-1.html', key: 'mathBlitzDB_level1', gen: 'generateFractionQuestions()' },
    { file: 'math-blitz-level-2.html', key: 'mathBlitzDB_level2', gen: 'generateQuestionAddSub()' },
    { file: 'math-blitz-level-3.html', key: 'mathBlitzDB_level3', gen: 'generateQuestionMulDiv()' },
    { file: 'math-blitz-level-4.html', key: 'mathBlitzDB_level4', gen: 'generateQuestionLevel4()' },
    { file: 'math-blitz-level-5.html', key: 'mathBlitzDB_level5', gen: 'generateQuestionLevel5()' },
];

levels.forEach(l => {
    if (fs.existsSync(l.file)) {
        let content = fs.readFileSync(l.file, 'utf8');
        
        // Find initGame
        const initGameRegex = /function initGame\(\)\s*\{[\s\S]*?questions\s*=\s*(.*?);/;
        const match = content.match(initGameRegex);
        
        if (match) {
            const replacement = `function initGame() {
        let saved = localStorage.getItem('${l.key}');
        if (saved) {
            let parsed = JSON.parse(saved);
            if(parsed.length > 0) {
                // Pick up to 10 random questions from DB
                questions = parsed.sort(() => Math.random() - 0.5).slice(0, 10);
            } else {
                questions = ${l.gen}; // Fallback if empty array
            }
        } else {
            // Not customized, use default generator
            // To allow generating exactly 10, some generators return an array, some just generate 1.
            // Wait, levels 2-5's generate methods return a SINGLE question or an array?
            // Let's look at how they did it. 
            // In level 1, generateFractionQuestions() returns an array.
            // In level 2-5, wait, let's check.
        }`;
            // We need a safer regex replace. We'll just replace the questions = ... line
            let modifiedContent = content.replace(match[0], `function initGame() {
        let saved = localStorage.getItem('${l.key}');
        if (saved && JSON.parse(saved).length > 0) {
            questions = JSON.parse(saved).sort(() => Math.random() - 0.5).slice(0, 10);
        } else {
            questions = ${match[1]};
        }`);
            fs.writeFileSync(l.file, modifiedContent, 'utf8');
            console.log("Patched", l.file);
        } else {
            console.log("Could not patch", l.file);
        }
    }
});
