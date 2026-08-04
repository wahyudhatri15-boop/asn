const fs = require('fs');
const html = fs.readFileSync('database-soal.html', 'utf8');

const regex = /<script>([\s\S]*?)<\/script>/g;
let match;
let count = 1;
while ((match = regex.exec(html)) !== null) {
    fs.writeFileSync(`temp_script_${count}.js`, match[1]);
    count++;
}
