const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html';
let html = fs.readFileSync(filePath, 'utf8');

// Update header link
html = html.replace(
    '<a href="index.html" class="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity">Clash Of Civil Servants</a>',
    '<a href="math-blitz.html" class="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity">Clash Of Civil Servants</a>'
);

// Update reload fallback logic
html = html.replace(
    'window.location.replace("index.html");',
    'window.location.replace("math-blitz.html");'
);
html = html.replace(
    'window.location.replace("index.html");',
    'window.location.replace("math-blitz.html");'
);

fs.writeFileSync(filePath, html);
console.log("Links updated!");
