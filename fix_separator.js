const fs = require('fs');

const files = ['index.html', 'math-blitz.html', 'math-blitz-level-1.html', 'math-blitz-level-2.html', 'math-blitz-level-3.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // 1. Remove any stray separator lines at the end of the profile picture in desktop nav
    // Matches: </div> \n <div class="h-6 w-[1px] bg-outline-variant mx-2"></div> \n </div>
    content = content.replace(/(<div class="w-10 h-10 rounded-full[\s\S]*?<\/div>)\s*<div class="h-6 w-\[1px\] bg-outline-variant mx-2"><\/div>/g, '$1');

    // 2. Insert separator between streak and profile in Desktop Nav (gap-4 or gap-6)
    // Matches streak div closing </div> followed by profile div opening <div class="w-10
    content = content.replace(/(<div class="flex items-center gap-2 text-primary" title="Total Streak Points">[\s\S]*?<\/div>)\s*(<div class="w-10 h-10 rounded-full)/g, 
    '$1\n<div class="h-6 w-[1px] bg-outline-variant"></div>\n$2');
    
    // 3. For Mobile nav (if it exists)
    content = content.replace(/(<div class="flex items-center gap-2 text-primary(?: mr-3)?" title="Total Streak Points">[\s\S]*?<\/div>)\s*(<div class="h-8 w-8 rounded-full)/g, 
    '<div class="flex items-center gap-2 text-primary" title="Total Streak Points">\n<span id="mobile-header-streak-points" class="font-display font-bold text-lg">0</span>\n<span class="material-symbols-outlined text-xl" style="font-variation-settings: \'FILL\' 1;">local_fire_department</span>\n</div>\n<div class="h-5 w-[1px] bg-outline-variant mx-3"></div>\n$2');

    fs.writeFileSync(f, content);
});

console.log('Separators updated in all files.');
