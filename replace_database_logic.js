const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'database-soal.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// Replace everything from `let currentLevel = 1;` down to `function renderQuestions() {`
const replaceRegex = /let currentLevel = 1;[\s\S]*?function renderQuestions\(\) \{/;

const newLogic = `let currentLevel = 1;
        let currentGame = 'twk';
        let questions = [];

        function setGame(game) {
            currentGame = game;
            currentLevel = 1;
            renderGameTabs();
            renderTabs();
            loadDB();
        }

        function renderGameTabs() {
            const container = document.getElementById('game-tabs');
            
            let twkClass = currentGame === 'twk' ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,149,0,0.3)]' : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10';
            let tiuClass = currentGame === 'tiu' ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,149,0,0.3)]' : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10';
            let tkpClass = currentGame === 'tkp' ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,149,0,0.3)]' : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10';
            
            container.innerHTML = \`
                <button onclick="setGame('twk')" class="flex-none px-4 py-1.5 rounded-full text-xs transition-all \${twkClass}">TWK</button>
                <button onclick="setGame('tiu')" class="flex-none px-4 py-1.5 rounded-full text-xs transition-all \${tiuClass}">TIU</button>
                <button onclick="setGame('tkp')" class="flex-none px-4 py-1.5 rounded-full text-xs transition-all \${tkpClass}">TKP</button>
            \`;
        }

        function renderTabs() {
            const tabsContainer = document.getElementById('level-tabs');
            let html = '';
            let maxLevels = 5; // Always 5 levels
            for(let i = 1; i <= maxLevels; i++) {
                if (i === currentLevel) {
                    html += \`<button class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-tighter transition-all bg-primary text-black shadow-[0_0_8px_rgba(255,149,0,0.2)]">Lvl \${i}</button>\`;
                } else {
                    html += \`<button onclick="setLevel(\${i})" class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl \${i}</button>\`;
                }
            }
            tabsContainer.innerHTML = html;
        }

        function setLevel(lvl) {
            currentLevel = lvl;
            renderTabs();
            loadDB();
        }

        function loadDB() {
            let key = currentGame + 'DB_level' + currentLevel;
            let saved = localStorage.getItem(key);
            
            if (saved && saved !== '[]') {
                questions = JSON.parse(saved);
            } else {
                questions = [];
            }
            
            document.getElementById('total-questions-count').innerText = "Total: " + questions.length;
            renderQuestions();
        }

        function saveDB() {
            let key = currentGame + 'DB_level' + currentLevel;
            localStorage.setItem(key, JSON.stringify(questions));
            loadDB();
        }

        function renderQuestions() {`;

if (replaceRegex.test(content)) {
    content = content.replace(replaceRegex, newLogic);
    // Also inject calling setGame('twk') initially on load if it's not called anywhere.
    // Wait, let's just make sure we call setGame('twk') in DOMContentLoaded if it's not there.
    if (!content.includes("setGame('twk');") && !content.includes('setGame(currentGame);')) {
        content = content.replace(/<\/script>/, "\n    document.addEventListener('DOMContentLoaded', () => setGame('twk'));\n</script>");
    }
    fs.writeFileSync(targetHtml, content, 'utf8');
    console.log("Replaced JS logic to use TWK, TIU, TKP in database-soal.html");
} else {
    console.log("Could not match the JS logic block in database-soal.html");
}
