const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'belajar.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// The p tag looks like this:
// <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 font-body-md">
// Let's replace it to use text-[12px]
content = content.replace(/<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 font-body-md">/g, '<p class="text-[12px] md:text-[13px] text-on-surface-variant/80 mb-4 leading-relaxed">');

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Updated description text size in belajar.html");
