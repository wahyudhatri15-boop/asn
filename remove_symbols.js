const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'belajar.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// 1. Remove category icons
// <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-auto border border-primary/30 bg-primary/30">
//     <span class="material-symbols-outlined text-primary text-3xl" data-icon="account_balance">account_balance</span>
// </div>
content = content.replace(/<div class="w-12 h-12 rounded-lg flex items-center justify-center mb-auto[^>]*>\s*<span class="material-symbols-outlined[^>]*>.*?<\/span>\s*<\/div>/g, '');

// 2. Add mt-auto to the div wrapping h2 to keep it pushed down
// Previously: <div>\n    <h2 class="font-headline-lg...
content = content.replace(/<div>\s*<h2 class="font-headline-lg/g, '<div class="mt-auto">\n    <h2 class="font-headline-lg');

// 3. Make time indicator smaller and remove schedule icon
// <div class="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
//     <span class="material-symbols-outlined text-white text-[18px]" style="font-variation-settings: 'FILL' 1;">schedule</span>
//     <span class="font-label-caps text-label-tiny text-white font-bold">30 MENIT</span>
// </div>
content = content.replace(/<div class="absolute top-4 right-4 flex items-center gap-2 px-3 py-1\.5 rounded-full bg-black\/40 backdrop-blur-md border border-white\/10">\s*<span class="material-symbols-outlined[^>]*>schedule<\/span>\s*<span class="font-label-caps text-label-tiny text-white font-bold">(.*?)<\/span>\s*<\/div>/g, 
`<div class="absolute top-4 right-4 flex items-center px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
    <span class="text-[9px] text-white font-bold tracking-wider">$1</span>
</div>`);

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Updated time indicators and removed category symbols in belajar.html");
