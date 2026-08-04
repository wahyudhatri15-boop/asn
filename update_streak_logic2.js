const fs = require('fs');

const files = [
    'math-blitz-level-1.html',
    'math-blitz-level-2.html',
    'math-blitz-level-3.html',
    'math-blitz-level-4.html',
    'math-blitz-level-5.html'
];

files.forEach((file, index) => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let level = index + 1;

        // 1. Update the Streak logic inside endGame()
        // We will replace the whole STREAK POINTS CALCULATION block.
        // It starts with "// --- STREAK POINTS CALCULATION ---" and ends with "// ---------------------------------"
        
        let multiplierStr = `1.0 + (${level} - 1) * 0.5`;
        
        const newStreakLogic = 
`        // --- STREAK POINTS CALCULATION ---
        let addedPoints = 0;
        let streakUIDisplay = "-";
        
        if (score >= 70) {
            let multiplier = ${multiplierStr};
            if (score > 80) {
                addedPoints = Math.round(score * multiplier);
            } else {
                addedPoints = score;
            }
            let currentPts = parseInt(localStorage.getItem('mathBlitzStreakPoints')) || 0;
            localStorage.setItem('mathBlitzStreakPoints', currentPts + addedPoints);
            streakUIDisplay = "+" + addedPoints;
        }
        if (typeof updateHeaderStreakPoints === 'function') updateHeaderStreakPoints();
        // ---------------------------------`;

        content = content.replace(/\/\/ --- STREAK POINTS CALCULATION ---[\s\S]*?\/\/ ---------------------------------/g, newStreakLogic);

        // 2. Fix the UI display to show streakUIDisplay instead of the wrong global key.
        // We look for '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Nilai Streak</span>'
        // And replace the value inside the bold span.
        
        // Wait, in my previous script I used:
        // '<span class="font-display text-4xl font-bold text-on-surface">' + (parseInt(localStorage.getItem('streakScore')) || 0) + '</span>' +
        // I need to replace it with:
        // '<span class="font-display text-4xl font-bold text-on-surface">' + streakUIDisplay + '</span>' +
        
        const uiRegex = /'<span class="font-display text-4xl font-bold text-on-surface">' \+ \(parseInt\(localStorage\.getItem\('streakScore'\)\) \|\| 0\) \+ '<\/span>' \+/g;
        content = content.replace(uiRegex, `'<span class="font-display text-4xl font-bold text-on-surface">' + streakUIDisplay + '</span>' +`);

        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated", file);
    }
});
