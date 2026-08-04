const fs = require('fs');
const files = fs.readdirSync('.');
files.filter(f => f.endsWith('.html')).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<div class="flex items-center gap-4">\\n/g, '<div class="flex items-center gap-4">\n');
    content = content.replace(/\\n<\/div>\n<\/nav>/g, '\n</div>\n</nav>');
    content = content.replace(/\\n<\/div>\n<\/header>/g, '\n</div>\n</header>');
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed literal \\n characters');
