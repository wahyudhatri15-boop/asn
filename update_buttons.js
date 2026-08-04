const fs = require('fs');

let html = fs.readFileSync('math-blitz.html', 'utf8');

// Replace standard solid buttons with minimalist ghost buttons
const standardBtnRegex = /<button class="w-full py-4 bg-primary text-on-primary rounded-lg font-bold active:scale-95 transition-all duration-300 hover:shadow-lg hover:shadow-primary\/20">\s*(.*?)\s*<\/button>/g;
const newStandardBtn = `<button class="w-full py-3 border border-white/10 hover:border-primary/30 bg-transparent hover:bg-primary/10 text-on-surface hover:text-primary rounded-lg font-semibold active:scale-95 transition-all duration-300 flex items-center justify-between px-6 group">
    <span>$1</span>
    <span class="material-symbols-outlined text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
</button>`;
html = html.replace(standardBtnRegex, newStandardBtn);

// Replace the Elite (Level 4) button with a minimalist outlined version that still stands out
const eliteBtnRegex = /<button class="w-full md:w-max px-12 py-4 bg-primary text-on-primary rounded-lg font-bold active:scale-95 transition-all duration-300 hover:shadow-xl hover:shadow-primary\/30 relative z-10">\s*(.*?)\s*<\/button>/g;
const newEliteBtn = `<button class="w-full md:w-max px-8 py-3 border border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/15 text-primary rounded-lg font-bold active:scale-95 transition-all duration-300 flex items-center justify-between gap-4 group relative z-10 shadow-[0_0_15px_rgba(255,149,0,0.05)] hover:shadow-[0_0_25px_rgba(255,149,0,0.1)]">
    <span>$1</span>
    <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
</button>`;
html = html.replace(eliteBtnRegex, newEliteBtn);

fs.writeFileSync('math-blitz.html', html);
console.log("Successfully updated buttons to minimalist design.");
