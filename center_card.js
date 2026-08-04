const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Remove mt-8
html = html.replace(
    '<div class="w-full max-w-2xl animate-fade-in-up mt-8" style="transform: translateY(0); opacity: 1;">',
    '<div class="w-full max-w-2xl animate-fade-in-up -mt-12" style="transform: translateY(0); opacity: 1;">'
);

// 2. Remove pt-24 dynamically to center the container within the screen
html = html.replace(
    'mainCanvas.innerHTML = summaryHtml;',
    'mainCanvas.classList.remove("pt-24");\n                mainCanvas.innerHTML = summaryHtml;'
);

fs.writeFileSync(filePath, html);
console.log("Card centered!");
