const fs = require('fs');
let content = fs.readFileSync('database-soal.html', 'utf8');

content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$\{/g, '${');

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully removed escaping backslashes.");
