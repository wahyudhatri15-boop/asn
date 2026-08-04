const fs = require('fs');
let html = fs.readFileSync('database-soal.html', 'utf8');

html = html.replace(/currentGame === 'TKP'/g, "currentGame.toUpperCase() === 'TKP'");

fs.writeFileSync('database-soal.html', html);
console.log('Fixed TKP case sensitivity check.');
