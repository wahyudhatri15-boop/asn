const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-2.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Modify generateNumber to accept forcedType
const oldGenerateNumberStart = `        function generateNumber() {
            const type = numTypes[Math.floor(Math.random() * numTypes.length)];`;
const newGenerateNumberStart = `        function generateNumber(forcedType) {
            const type = forcedType || numTypes[Math.floor(Math.random() * numTypes.length)];`;
html = html.replace(oldGenerateNumberStart, newGenerateNumberStart);

// 2. Modify generateQuestion to use two different types
const oldGenerateQuestionVars = `                op = operations[Math.floor(Math.random() * operations.length)];
                let num1 = generateNumber();
                let num2 = generateNumber();`;
const newGenerateQuestionVars = `                op = operations[Math.floor(Math.random() * operations.length)];
                let type1 = numTypes[Math.floor(Math.random() * numTypes.length)];
                let availableTypes = numTypes.filter(t => t !== type1);
                let type2 = availableTypes[Math.floor(Math.random() * availableTypes.length)];
                let num1 = generateNumber(type1);
                let num2 = generateNumber(type2);`;
html = html.replace(oldGenerateQuestionVars, newGenerateQuestionVars);

fs.writeFileSync(filePath, html);
console.log("Combination logic updated!");
