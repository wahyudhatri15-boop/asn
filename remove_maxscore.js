const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

const targetToReplace = '<span class="text-body-sm text-white/70 ml-1 font-bold">/ ${item.maxScore}</span>';
html = html.replace(targetToReplace, '');

fs.writeFileSync('history.html', html);
console.log('Removed maxScore from history.html');
