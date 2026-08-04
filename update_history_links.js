const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'history.html');

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace <a ... href="#">History</a> with href="history.html"
    // Also, some might have href="#" for Belajar (e.g. index.html). We only want to replace the one for History.
    content = content.replace(/(<a[^>]*href=")([^"]*)("[^>]*>History<\/a>)/g, (match, p1, p2, p3) => {
        return p1 + 'history.html' + p3;
    });
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated History links in ${file}`);
});
