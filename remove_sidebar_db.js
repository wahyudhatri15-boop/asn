const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'database-soal.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// Remove sidebar styles
content = content.replace(/<style id="sidebar-styles">[\s\S]*?<\/style>\s*/, '');

// Remove sidebar aside
content = content.replace(/<aside id="sidebar"[\s\S]*?<\/aside>\s*/, '');

// Remove classes from main
content = content.replace(
    /<main id="main-content" class="([^"]*)md:ml-14 sidebar-collapsed-main([^"]*)">/,
    '<main id="main-content" class="$1$2">'
);
// Clean up double spaces if any in the class list
content = content.replace(/class="(.*?)  (.*?)"/g, 'class="$1 $2"');

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Removed sidebar from database-soal.html");
