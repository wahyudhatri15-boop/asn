const fs = require('fs');
let html = fs.readFileSync('database-soal.html', 'utf8');

html = html.replace(/let isTKP =/g, 'var isTKP =');
html = html.replace(/let tkpScores =/g, 'var tkpScores =');

fs.writeFileSync('database-soal.html', html);
console.log('Fixed let -> var to solve redeclaration syntax error.');
