const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-2.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add ID to the label
html = html.replace(
    '<span class="font-label-md text-label-md text-primary/60 tracking-widest uppercase">SOLVE THE EQUATION</span>',
    '<span class="font-label-md text-label-md text-primary/60 tracking-widest uppercase" id="question-counter">SOAL 1 DARI 10</span>'
);

// 2. Add dynamic update in loadQuestion
const loadQuestionTarget = `            document.getElementById('question-text').textContent = questions[index].question;`;
const loadQuestionReplacement = `            document.getElementById('question-text').textContent = questions[index].question;
            const counterEl = document.getElementById('question-counter');
            if (counterEl) {
                counterEl.textContent = \`SOAL \${index + 1} DARI 10\`;
            }`;

html = html.replace(loadQuestionTarget, loadQuestionReplacement);

fs.writeFileSync(filePath, html);
console.log("Question counter added!");
