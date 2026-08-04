const fs = require('fs');

let html = fs.readFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/arena-battle.html', 'utf-8');

// 1. Expand max-width
html = html.replace(
    /<main class="max-w-\[1200px\] mx-auto/g,
    '<main class="w-full max-w-[1536px] mx-auto'
);

// 2. Adjust Grid Col Spans
html = html.replace(
    /lg:col-span-10/g,
    'lg:col-span-9 md:col-span-8'
);
html = html.replace(
    /lg:col-span-2/g,
    'lg:col-span-3 md:col-span-4'
);

// 3. Make grid list buttons larger
// Replace w-6 h-6 text-[10px] with w-9 h-9 md:w-10 md:h-10 text-xs
html = html.replace(
    /w-6 h-6 text-\[10px\]/g,
    'w-9 h-9 md:w-11 md:h-11 text-xs'
);

// 4. Also update the style attribute of the grid itself to allow auto-fill or just give more gap
html = html.replace(
    /style="grid-template-columns: repeat\(5, minmax\(0px, 1fr\)\);"/g,
    'style="grid-template-columns: repeat(5, minmax(0px, 1fr)); gap: 10px;"'
);

// 5. Ensure grid cols on tablet is active
html = html.replace(
    /grid-cols-1 lg:grid-cols-12/g,
    'grid-cols-1 md:grid-cols-12'
);


fs.writeFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/arena-battle.html', html, 'utf-8');
console.log('Layout updated successfully');
