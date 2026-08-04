const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // index.html and database-soal.html use py-4
    content = content.replace(/(<nav[^>]*?class="[^"]*?) py-4([^"]*?")/g, '$1 py-2 md:py-2$2');
    content = content.replace(/(<header[^>]*?class="[^"]*?) py-4([^"]*?")/g, '$1 py-2 md:py-2$2');
    
    // inner pages use py-3 md:py-4
    content = content.replace(/(<nav[^>]*?class="[^"]*?) py-3 md:py-4([^"]*?")/g, '$1 py-2 md:py-2$2');
    content = content.replace(/(<header[^>]*?class="[^"]*?) py-3 md:py-4([^"]*?")/g, '$1 py-2 md:py-2$2');
    
    // just in case any standalone py-4 in header/nav that missed the previous ones
    content = content.replace(/(<nav[^>]*?class="[^"]*?)py-4([^"]*?")/g, '$1py-2$2');
    content = content.replace(/(<header[^>]*?class="[^"]*?)py-4([^"]*?")/g, '$1py-2$2');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});
