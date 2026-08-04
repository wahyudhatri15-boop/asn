const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace py-2 md:py-2 with py-1 md:py-1 on nav and header
    content = content.replace(/(<nav[^>]*?class="[^"]*?) py-2 md:py-2([^"]*?")/g, '$1 py-1 md:py-1$2');
    content = content.replace(/(<header[^>]*?class="[^"]*?) py-2 md:py-2([^"]*?")/g, '$1 py-1 md:py-1$2');
    
    // Replace just py-2 if any remains
    content = content.replace(/(<nav[^>]*?class="[^"]*?) py-2([^"]*?")/g, '$1 py-1 md:py-1$2');
    content = content.replace(/(<header[^>]*?class="[^"]*?) py-2([^"]*?")/g, '$1 py-1 md:py-1$2');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});
