const fs = require('fs');

const files = [
    'index.html',
    'math-blitz.html',
    'word-equation.html',
    'number-chain.html',
    'database-soal.html'
];

const targetSpan = '<span class="font-display text-display text-primary tracking-tighter" style="font-size: 24px;">Clash Of Civil Servants</span>';
const replacementSpan = '<a href="index.html" class="font-display text-display text-primary tracking-tighter hover:opacity-80 transition-opacity" style="font-size: 24px;">Clash Of Civil Servants</a>';

const targetH1 = '<h1 class="font-display text-primary tracking-tighter text-xl font-bold">Clash Of Civil Servants</h1>';
const replacementH1 = '<a href="index.html" class="font-display text-primary tracking-tighter text-xl font-bold hover:opacity-80 transition-opacity">Clash Of Civil Servants</a>';

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        let changed = false;
        if (content.includes(targetSpan)) {
            content = content.replace(new RegExp(targetSpan, 'g'), replacementSpan);
            changed = true;
        }
        
        if (content.includes(targetH1)) {
            content = content.replace(new RegExp(targetH1, 'g'), replacementH1);
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            console.log("Updated title link in", file);
        } else {
            console.log("No match found in", file);
        }
    }
});
