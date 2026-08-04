const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'history.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// The line is: <h2 class="font-display text-display text-on-surface mb-2 tracking-tighter uppercase font-black">History Belajar</h2>
// Replace text-on-surface with text-primary text-glow
content = content.replace(
    /class="(.*?)text-on-surface(.*?)">History Belajar<\/h2>/,
    'class="$1text-primary text-glow$2">History Belajar</h2>'
);

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Changed 'History Belajar' title to orange in history.html");
