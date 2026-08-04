const fs = require('fs');
let c = fs.readFileSync('database-soal.html', 'utf8');

// The block we want to disable is: if (true) { setTimeout(() => { document.querySelectorAll('.math-display').forEach(el => { ...
// We can just replace "if (true) {" with "if (false) {" specifically before "setTimeout" inside renderQuestions
c = c.replace(/if \(true\) \{\s*setTimeout\(\(\) => \{\s*document\.querySelectorAll\('\.math-display'\)/, 
"if (false) {\n                setTimeout(() => {\n                    document.querySelectorAll('.math-display')");

fs.writeFileSync('database-soal.html', c);
console.log('Disabled math-display conversion');
