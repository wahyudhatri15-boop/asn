const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f.includes('level'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let isMathBlitz = file.startsWith('math-blitz');
    let isAlchemist = file.startsWith('the-alchemist');
    let isWordEq = file.startsWith('word-equation');
    
    let maxLevel = (isMathBlitz || isAlchemist) ? 5 : 3;
    let match = file.match(/level-(\d+)/);
    if (!match) continue;
    let currentLevel = parseInt(match[1]);
    
    // 1. Fix "Level X Selesai" text
    content = content.replace(/Level \d+ Selesai/g, `Level ${currentLevel} Selesai`);
    
    // 2. Fix Next Button logic
    // We will look for the button code
    // In Word Equation it uses variable `nextLevel` and `nextBtnClass` and `nextBtnContent`.
    // In others it might be hardcoded in the string:
    // '<button ' + (accuracy >= 70 ? 'onclick="window.location.href=\'math-blitz-level-X.html\'"' : 'disabled') ...
    
    if (currentLevel === maxLevel) {
        // Remove the next button completely
        // It looks like:
        // '<button ' + (accuracy >= 70 ... + ' class="h-[50px] w-full rounded-xl font-label-md font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all ' + nextBtnClass + '">' +
        //      nextBtnContent +
        // '</button>' +
        
        let btnPattern = /'<button ' \+ \(accuracy >= 70.*?nextBtnContent \+\s*'<\/button>' \+/s;
        if (btnPattern.test(content)) {
            content = content.replace(btnPattern, '');
        } else {
            // another pattern?
            let altPattern = /<button[^>]*Lanjut ke Level Berikutnya[^>]*>.*?<\/button>/s;
            if (altPattern.test(content)) {
                content = content.replace(altPattern, '');
            }
        }
        
    } else {
        // Make sure it points to next level
        let prefix = file.split('-level-')[0];
        let nextFile = `${prefix}-level-${currentLevel + 1}.html`;
        
        // Let's replace the hardcoded href in Math Blitz / Alchemist if it exists
        // E.g., 'onclick="window.location.href=\'math-blitz-level-3.html\'"'
        // but maybe we can just let it be if it's correct?
        // Let's find any window.location.href='...' for the next level button
        content = content.replace(/onclick="window\.location\.href='[^']+-level-\d+\.html'"/g, `onclick="window.location.href='${nextFile}'"`);
    }

    fs.writeFileSync(file, content);
    console.log(`Updated next button logic for ${file}`);
}
