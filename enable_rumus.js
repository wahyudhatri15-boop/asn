const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'database-soal.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// Replace isMath condition to always be true
content = content.replace(/let isMath = currentGame === 'math_blitz';/g, 'let isMath = true;');

// Replace renderQuestions condition to always be true
content = content.replace(/if \(currentGame === 'math_blitz'\) \{/g, 'if (true) {');

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Enabled Math editor (rumus) for all database soal categories");
