const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Change -mt-12 to mt-0
html = html.replace(
    '<div class="w-full max-w-2xl animate-fade-in-up -mt-12" style="transform: translateY(0); opacity: 1;">',
    '<div class="w-full max-w-2xl animate-fade-in-up mt-0" style="transform: translateY(0); opacity: 1;">'
);

// 2. Remove the line that removes pt-24
html = html.replace(
    'mainCanvas.classList.remove("pt-24");',
    '// pt-24 kept for header spacing'
);

fs.writeFileSync(filePath, html);
console.log("Card layout fixed!");
