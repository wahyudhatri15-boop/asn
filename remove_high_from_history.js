const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'history.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// Replace "TIU High", "TWK High", "TKP High" inside the span tags
content = content.replace(/>TIU High<\/span>/, '>TIU</span>');
content = content.replace(/>TWK High<\/span>/, '>TWK</span>');
content = content.replace(/>TKP High<\/span>/, '>TKP</span>');

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Removed 'High' from TIU, TWK, and TKP titles in history.html");
