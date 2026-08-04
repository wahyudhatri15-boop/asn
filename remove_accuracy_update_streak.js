const fs = require('fs');

const files = [
    'math-blitz-level-1.html',
    'math-blitz-level-2.html',
    'math-blitz-level-3.html',
    'math-blitz-level-4.html',
    'math-blitz-level-5.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // 1. Remove Akurasi block
        // We match exactly the block that contains "my_location" and "Akurasi"
        const akurasiRegex = /<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white\/5 rounded-2xl border border-transparent hover:border-white\/5">\s*'\s*\+\s*'<div class="w-12 h-12 rounded-full bg-primary\/10 border border-primary\/20 flex items-center justify-center mb-4">\s*'\s*\+\s*'<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">my_location<\/span>\s*'\s*\+\s*'<\/div>\s*'\s*\+\s*'<span class="text-on-surface-variant text-\[10px\] font-semibold uppercase tracking-\[0\.2em\] mb-2">Akurasi<\/span>\s*'\s*\+\s*'<div class="flex items-baseline gap-1">\s*'\s*\+\s*'<span class="font-display text-4xl font-bold text-on-surface">' \+ [a-zA-Z0-9_]+ \+ '<\/span>\s*'\s*\+\s*'<span class="text-sm font-medium text-primary">%<\/span>\s*'\s*\+\s*'<\/div>\s*'\s*\+\s*'<\/div>\s*'\s*\+\s*'/g;

        // Try replacing with a literal approach since regex can be finicky with single quotes and pluses.
        // Let's just find the index of "Akurasi" and cut out the parent div.
        
        let newContent = content;
        
        // Simpler regex for the Akurasi div block within the concatenated string
        const regexStr = "'<div class=\"p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5\">' \\+\n\\s*'<div class=\"w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4\">' \\+\n\\s*'<span class=\"material-symbols-outlined text-primary\" style=\"font-variation-settings: \\\\'FILL\\\\' 1;\">my_location</span>' \\+\n\\s*'</div>' \\+\n\\s*'<span class=\"text-on-surface-variant text-\\[10px\\] font-semibold uppercase tracking-\\[0.2em\\] mb-2\">Akurasi</span>' \\+\n\\s*'<div class=\"flex items-baseline gap-1\">' \\+\n\\s*'<span class=\"font-display text-4xl font-bold text-on-surface\">' \\+ accuracy \\+ '</span>' \\+\n\\s*'<span class=\"text-sm font-medium text-primary\">%</span>' \\+\n\\s*'</div>' \\+\n\\s*'</div>' \\+\n\\s*";
        
        newContent = newContent.replace(new RegExp(regexStr, 'g'), '');
        
        // 2. Rename Streak Maks to Nilai Streak and update logic
        newContent = newContent.replace(
            /'<span class="text-on-surface-variant text-\[10px\] font-semibold uppercase tracking-\[0\.2em\] mb-2">Streak Maks<\/span>' \+/g,
            `'<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Nilai Streak</span>' +`
        );
        newContent = newContent.replace(
            /'<span class="font-display text-4xl font-bold text-on-surface">' \+ maxStreak \+ '<\/span>' \+\n(\s*)'<span class="text-sm font-medium text-primary">x<\/span>'/g,
            `'<span class="font-display text-4xl font-bold text-on-surface">' + (parseInt(localStorage.getItem('streakScore')) || 0) + '</span>' +\n$1'<span class="text-sm font-medium text-primary">Pts</span>'`
        );

        // 3. Update Grid Columns
        newContent = newContent.replace(
            /'<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">' \+/g,
            `'<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">' +`
        );

        if(content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log("Updated", file);
        } else {
            console.log("No changes made to", file);
        }
    }
});
