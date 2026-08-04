const fs = require('fs');
let html = fs.readFileSync('database-soal.html', 'utf8');

html = html.replace(/let ts =/g, 'var ts =');
html = html.replace(/let tc =/g, 'var tc =');
html = html.replace(/let sc =/g, 'var sc =');

fs.writeFileSync('database-soal.html', html);
console.log('Fixed let -> var to solve redeclaration syntax error for ts, tc, sc.');
