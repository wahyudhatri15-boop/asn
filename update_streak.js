const fs = require('fs');
const path = require('path');

const dir = __dirname;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let arenaType = 0;
    let level = 0;
    let storageKey = '';

    if (file.startsWith('math-blitz-level-')) {
        arenaType = 5;
        level = parseInt(file.match(/level-(\d+)/)[1]);
        storageKey = 'mathBlitzStreakPoints';
    } else if (file.startsWith('the-alchemist-level-')) {
        arenaType = 5;
        level = parseInt(file.match(/level-(\d+)/)[1]);
        storageKey = 'theAlchemistStreakPoints';
    } else if (file.startsWith('word-equation-level-')) {
        arenaType = 3;
        level = parseInt(file.match(/level-(\d+)/)[1]);
        storageKey = 'wordEquationStreakPoints'; 
    }

    if (arenaType > 0) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        let multiplierExpr = "";
        if (arenaType === 5) {
            if (level === 1) multiplierExpr = "1";
            else if (level === 2) multiplierExpr = "1.5";
            else if (level === 3) multiplierExpr = "2";
            else if (level === 4) multiplierExpr = "2.5";
            else if (level === 5) multiplierExpr = "3";
        } else if (arenaType === 3) {
            multiplierExpr = `${level}`;
        }

        const regex = /\/\/\s*---\s*STREAK POINTS CALCULATION\s*---[\s\S]*?\/\/\s*---------------------------------/;
        
        const newBlock = `// --- STREAK POINTS CALCULATION ---
        let addedPoints = 0;
        let streakUIDisplay = "-";
        
        let scoreVal = 0;
        if (typeof score !== 'undefined' && score > 0) {
            scoreVal = score;
        } else if (typeof correctAnswersCount !== 'undefined' && correctAnswersCount > 0) {
            scoreVal = correctAnswersCount * 10;
        } else if (typeof correctAnswers !== 'undefined' && correctAnswers > 0) {
            scoreVal = correctAnswers * 10;
        }

        if (scoreVal > 0) {
            let multiplier = ${multiplierExpr};
            addedPoints = Math.round(scoreVal * multiplier);
            
            let currentPts = parseInt(localStorage.getItem('${storageKey}')) || 0;
            localStorage.setItem('${storageKey}', currentPts + addedPoints);
            streakUIDisplay = "+" + addedPoints + " Pts";
        }
        
        if (typeof updateHeaderStreakPoints === 'function') updateHeaderStreakPoints();
        // ---------------------------------`;

        if (regex.test(content)) {
            content = content.replace(regex, newBlock);
            fs.writeFileSync(path.join(dir, file), content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`Could not find streak block in ${file}`);
        }
    }
});
