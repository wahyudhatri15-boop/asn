const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// 1. Add toolbar UI inside the form before the inputs
const toolbarHtml = `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-on-surface-variant mb-2">Simbol Matematika (Seperti MS Word)</label>
                    <div class="flex flex-wrap gap-2 p-2 bg-black/50 border border-white/10 rounded-lg">
                        <button type="button" onclick="insertMath(' / ', 1)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Pecahan (Fraction)">
                            <span>□/□</span>
                        </button>
                        <button type="button" onclick="insertMath('×', 0)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Kali (Multiply)">
                            <span>×</span>
                        </button>
                        <button type="button" onclick="insertMath('÷', 0)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Bagi (Divide)">
                            <span>÷</span>
                        </button>
                        <button type="button" onclick="insertMath('²', 0)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Pangkat 2 (Squared)">
                            <span>x²</span>
                        </button>
                        <button type="button" onclick="insertMath('³', 0)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Pangkat 3 (Cubed)">
                            <span>x³</span>
                        </button>
                        <button type="button" onclick="insertMath('√', 0)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Akar (Square Root)">
                            <span>√</span>
                        </button>
                        <button type="button" onclick="insertMath('°', 0)" class="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded text-sm font-medium transition-colors" title="Derajat (Degree)">
                            <span>°</span>
                        </button>
                    </div>
                    <p class="text-[10px] text-on-surface-variant mt-1">Tips: Untuk pecahan, ketik angka pertama lalu klik tombol □/□, lalu ketik angka kedua. Sistem akan otomatis membuatnya bersusun saat dimainkan.</p>
                </div>
`;

// Inject into form right after `<input type="hidden" id="q-index" value="-1">`
if (content.includes('<input type="hidden" id="q-index" value="-1">')) {
    content = content.replace('<input type="hidden" id="q-index" value="-1">', '<input type="hidden" id="q-index" value="-1">\n' + toolbarHtml);
}

// 2. Add lastFocused tracking to inputs
content = content.replace('id="q-text" required', 'id="q-text" required onfocus="lastFocusedInput = this"');
content = content.replace('id="q-answer" required', 'id="q-answer" required onfocus="lastFocusedInput = this"');
content = content.replace('id="q-options" class=', 'id="q-options" onfocus="lastFocusedInput = this" class=');

// 3. Add script logic for insertion
const scriptToAdd = `
        let lastFocusedInput = null;
        function insertMath(symbol, backOffset) {
            let input = lastFocusedInput || document.getElementById('q-text');
            if (!input) return;
            
            let start = input.selectionStart;
            let end = input.selectionEnd;
            let text = input.value;
            
            input.value = text.substring(0, start) + symbol + text.substring(end);
            
            // Move cursor
            let newPos = start + symbol.length - backOffset;
            input.setSelectionRange(newPos, newPos);
            input.focus();
        }
`;

if (content.includes('let currentLevel = 1;')) {
    content = content.replace('let currentLevel = 1;', scriptToAdd + '\n        let currentLevel = 1;');
}

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully added math toolbar.");
