const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'database-soal.html');
let content = fs.readFileSync(targetHtml, 'utf8');

const oldTabsRegex = /<div class="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2" id="game-tabs">[\s\S]*?<\/div>/;
const newTabs = `<div class="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2" id="game-tabs">
                <button class="flex-none px-4 py-1.5 rounded-full bg-primary text-black font-bold text-xs shadow-[0_0_10px_rgba(255,149,0,0.3)] transition-all">TWK</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant text-xs font-medium hover:bg-white/10 hover:text-white transition-all">TIU</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant text-xs font-medium hover:bg-white/10 hover:text-white transition-all">TKP</button>
            </div>`;

content = content.replace(oldTabsRegex, newTabs);

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Updated game tabs in database-soal.html to TWK, TIU, TKP");
