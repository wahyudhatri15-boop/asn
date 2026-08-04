const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f.includes('level-'));

files.forEach(file => {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');

    let arenaType = 0;
    let level = 0;
    let storageKey = 'globalStreakPoints';

    if (file.startsWith('math-blitz')) {
        arenaType = 5;
        storageKey = 'mathBlitzStreakPoints';
    } else if (file.startsWith('the-alchemist')) {
        arenaType = 5;
        storageKey = 'theAlchemistStreakPoints';
    } else if (file.startsWith('word-equation')) {
        arenaType = 3;
        storageKey = 'wordEquationStreakPoints';
    }

    const match = file.match(/level-(\d+)/);
    if (match) {
        level = parseInt(match[1]);
    }

    if (arenaType === 0) return;

    let mult = "";
    if (arenaType === 5) {
        if (level === 1) mult = "1";
        else if (level === 2) mult = "1.5";
        else if (level === 3) mult = "2";
        else if (level === 4) mult = "2.5";
        else if (level === 5) mult = "3";
    } else {
        mult = level.toString();
    }

    const streakLogic = `// --- STREAK POINTS CALCULATION ---
        let addedPoints = 0;
        let cAnswers = 0;
        if (typeof correctAnswersCount !== 'undefined') cAnswers = correctAnswersCount;
        else if (typeof correctAnswers !== 'undefined') cAnswers = correctAnswers;
        
        if (cAnswers > 0) {
            let baseScore = cAnswers * 10;
            let multiplier = ${mult};
            addedPoints = Math.round(baseScore * multiplier);
            
            let currentPts = parseInt(localStorage.getItem('${storageKey}')) || 0;
            localStorage.setItem('${storageKey}', currentPts + addedPoints);
        }
        
        let totalPtsObj = document.getElementById('header-streak-points');
        if (totalPtsObj) {
             let totalPts = (parseInt(localStorage.getItem('mathBlitzStreakPoints')) || 0) + 
                            (parseInt(localStorage.getItem('theAlchemistStreakPoints')) || 0) + 
                            (parseInt(localStorage.getItem('wordEquationStreakPoints')) || 0);
             totalPtsObj.innerText = totalPts;
        }
        if (typeof updateHeaderStreakPoints === 'function') updateHeaderStreakPoints();
        // ---------------------------------`;

    // Remove old logic blocks to avoid duplication
    content = content.replace(/\/\/\s*---\s*STREAK POINTS CALCULATION[\s\S]*?\/\/\s*---------------------------------/g, '');

    // Insert new logic right before accuracy is calculated or right after endGame
    if (content.includes('const accuracy = Math.round')) {
        content = content.replace('const accuracy = Math.round', streakLogic + '\n            const accuracy = Math.round');
    } else if (content.includes('function endGame() {')) {
        content = content.replace('function endGame() {', 'function endGame() {\n' + streakLogic);
    }

    // Now replace the Grid block
    // the old Grid might be grid-cols-1 md:grid-cols-3 or grid-cols-2 md:grid-cols-4 etc.
    // We'll replace the block that starts with '<div class="grid grid-cols...' up to '<div class="flex flex-col gap-4">'
    const gridPattern1 = /'<div class="grid grid-cols.*?mb-10">'\s*\+[\s\S]*?'<\/div>'\s*\+\s*'<div class="flex flex-col gap-4">'\s*\+/;
    const gridPattern2 = /'<div class="grid grid-cols.*?mb-10">'\s*\+[\s\S]*?'<\/div>'\s*\+\s*'<div class="flex flex-col gap-4 mt-6">'\s*\+/;

    const newGrid = `'<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">workspace_premium</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Skor Akhir</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">' + score + '</span>' +
                                '<span class="text-sm font-medium text-primary">XP</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">local_fire_department</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Nilai Streak</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">+' + addedPoints + '</span>' +
                                '<span class="text-sm font-medium text-primary">Pts</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">timer</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Akurasi Waktu</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">' + (typeof timeAccuracy !== 'undefined' ? timeAccuracy : accuracy) + '</span>' +
                                '<span class="text-sm font-medium text-primary">%</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="flex flex-col gap-4">' +`;

    if (gridPattern1.test(content)) {
        content = content.replace(gridPattern1, newGrid);
    } else if (gridPattern2.test(content)) {
        content = content.replace(gridPattern2, newGrid.replace('<div class="flex flex-col gap-4">', '<div class="flex flex-col gap-4 mt-6">'));
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Patched", file);
});
