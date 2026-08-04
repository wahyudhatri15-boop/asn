const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f.includes('level'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    let match = file.match(/level-(\d+)/);
    if (!match) continue;
    let currentLevel = parseInt(match[1]);
    
    let prefix = file.split('-level-')[0];
    let nextFile = `${prefix}-level-${currentLevel + 1}.html`;
    
    // Pattern to catch onclick="window.location.href=\'some-file.html\'"
    // Note: JS escapes the backslash when reading file, so it looks like: onclick="window.location.href=\'math-blitz-level-3.html\'"
    // Let's just replace the filename part.
    let oldContent = content;
    
    // We are looking for something like: onclick="window.location.href=\'math-blitz-level-3.html\'"
    // Or anything similar.
    content = content.replace(/onclick="window\.location\.href=\\'[^']+-level-\d+\.html\\'"/g, `onclick="window.location.href=\\'${nextFile}\\'"`);
    
    if (content !== oldContent) {
        fs.writeFileSync(file, content);
        console.log(`Fixed next button target in ${file} to ${nextFile}`);
    } else {
        console.log(`No change in ${file}`);
    }
}
