const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Remove the streak points and its separator
    const streakPattern = /<div class="flex items-center gap-2 text-primary"[^>]*title="Total Streak Points">[\s\S]*?<\/div>\s*<div class="[^"]*w-\[1px\][^"]*"><\/div>/g;
    content = content.replace(streakPattern, '');

    // For belajar.html only (or across all just in case), increase box size in Bento Grid
    if (file === 'belajar.html') {
        // Find the glass-cards and increase padding and min-height
        content = content.replace(/class="glass-card rounded-xl p-8 flex flex-col/g, 'class="glass-card rounded-xl p-10 min-h-[400px] flex flex-col');
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});
