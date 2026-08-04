const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// Disable virtual keyboard
content = content.replace('<math-field id="q-text" class=', '<math-field id="q-text" math-virtual-keyboard-policy="manual" class=');
content = content.replace('<math-field id="q-answer" class=', '<math-field id="q-answer" math-virtual-keyboard-policy="manual" class=');

// Add the single fraction button above the form, or inside the form above q-text-container
const formStartRegex = /<form id="question-form" class="space-y-4" onsubmit="saveQuestion\(event\)">\s*<input type="hidden" id="q-index" value="-1">/;
const fractionBtnHtml = `<div id="custom-math-toolbar" class="mb-4">
                    <button type="button" onclick="insertFraction()" class="px-4 py-2 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span class="text-lg">□/□</span> Pecahan
                    </button>
                    <p class="text-[10px] text-on-surface-variant mt-2">Klik tombol di atas untuk menyisipkan rumus pecahan ke dalam kolom yang aktif.</p>
                </div>`;

if (formStartRegex.test(content) && !content.includes('custom-math-toolbar')) {
    content = content.replace(formStartRegex, `<form id="question-form" class="space-y-4" onsubmit="saveQuestion(event)">\n                <input type="hidden" id="q-index" value="-1">\n                ${fractionBtnHtml}`);
}

// Update JS for insertFraction
// Since there's already an `insertMath` function, we can replace it.
const insertMathRegex = /let lastFocusedInput = null;[\s\S]*?input\.focus\(\);\s*\}/;
const newInsertMath = `
        let lastFocusedMathField = null;
        
        // Track focus on math fields
        document.addEventListener('focusin', (e) => {
            if (e.target.tagName.toLowerCase() === 'math-field') {
                lastFocusedMathField = e.target;
            }
        });

        function insertFraction() {
            let field = lastFocusedMathField || document.getElementById('q-text');
            if (field && field.insert) {
                field.insert('\\\\frac{#0}{#?}');
                field.focus();
            }
        }
`;

if (insertMathRegex.test(content)) {
    content = content.replace(insertMathRegex, newInsertMath);
} else {
    // Inject if not found
    content = content.replace("let currentLevel = 1;", newInsertMath + "\n        let currentLevel = 1;");
}

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully patched fraction button.");
