const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// 1. Remove Win Rate Card
const winRateRegex = /<!-- Win Rate Card -->\s*<div class="glass-card rounded-xl border-primary\/40 bg-surface-container-low\/80 flex flex-col items-center justify-center text-center p-3"><span class="text-\[10px\] text-primary uppercase tracking-\[0\.2em\] mb-1 font-black">Win Rate<\/span>[\s\S]*?<\/div><\/div>/;
html = html.replace(winRateRegex, '');

// 2. Change grid-cols-4 to grid-cols-3
html = html.replace('grid-cols-1 md:grid-cols-4', 'grid-cols-1 md:grid-cols-3');

fs.writeFileSync('history.html', html);
console.log('Removed Win Rate and updated grid to 3 columns.');
