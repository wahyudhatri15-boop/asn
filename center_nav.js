const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check if it has the middle container
    const searchStr = '<div class="hidden md:flex items-center gap-8">';
    if (content.includes(searchStr)) {
        content = content.replace(searchStr, '<div class="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">');
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Centered nav in ${file}`);
    } else {
        // Just in case it was already replaced or has slightly different spaces
        const regex = /<div class="hidden md:flex items-center gap-8(?: absolute left-1\/2 -translate-x-1\/2)?">/;
        if (regex.test(content) && !content.includes('absolute left-1/2')) {
             content = content.replace(regex, '<div class="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">');
             fs.writeFileSync(path.join(dir, file), content, 'utf8');
             console.log(`Centered nav in ${file} (regex)`);
        }
    }
});
