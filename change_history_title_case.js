const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'history.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// The h2 currently looks like this:
// <h2 class="font-display text-display text-primary text-glow mb-2 tracking-tighter uppercase font-black">History Belajar</h2>

// Replace 'uppercase ' with '' in that specific h2
content = content.replace(
    /class="([^"]*)uppercase([^"]*)">History Belajar<\/h2>/,
    'class="$1$2">History Belajar</h2>'
);

// Clean up double spaces if any
content = content.replace(/class="(.*?)  (.*?)"/g, 'class="$1 $2"');

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Removed uppercase class from History Belajar title in history.html");
