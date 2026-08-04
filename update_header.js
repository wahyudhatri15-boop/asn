const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html';
let html = fs.readFileSync(filePath, 'utf8');

const oldHeader = 
`<div class="flex items-center gap-4">
<a href="math-blitz.html" class="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity">Clash Of Civil Servants</a>
<div class="h-6 w-px bg-white/20 mx-2"></div>
<h1 class="font-headline-lg text-lg font-semibold text-primary">Math Blitz | Level 1: Flashcard Conversion</h1>
</div>`;

const newHeader = 
`<div class="flex items-center gap-4">
<a href="math-blitz.html" class="font-display text-primary tracking-tighter hover:opacity-80 transition-opacity" style="font-size: 24px; font-weight: 700;">Clash Of Civil Servants</a>
<div class="h-6 w-[1px] bg-outline-variant mx-2"></div>
<span class="font-display text-on-surface font-medium tracking-tight" style="font-size: 20px;">Math Blitz | Level 1: Flashcard Conversion</span>
</div>`;

html = html.replace(oldHeader, newHeader);

fs.writeFileSync(filePath, html);
console.log("Header updated!");
