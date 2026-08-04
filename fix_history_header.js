const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// Remove the line containing "Jawaban Benar</th>"
let lines = html.split('\n');
lines = lines.filter(line => !line.includes('>Jawaban Benar</th>'));

fs.writeFileSync('history.html', lines.join('\n'));
console.log('Removed Jawaban Benar column header correctly.');
