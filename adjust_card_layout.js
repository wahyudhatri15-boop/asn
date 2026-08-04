const fs = require('fs');
const path = require('path');

const dir = __dirname;
const targetHtml = path.join(dir, 'belajar.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// The replacement logic:
// 1. In the glass card, remove justify-between
content = content.replace(/class="glass-card rounded-xl p-10 min-h-\[400px\] flex flex-col justify-between/g, 'class="glass-card rounded-xl p-10 min-h-[400px] flex flex-col');

// 2. We need to find the content block for each card.
// Currently it's:
// <div>
//     <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-6 ...">
//         ... icon ...
//     </div>
//     <h2 ...>...</h2>
//     <p ... mb-6 ...>...</p>
//     <div class="flex flex-wrap gap-2 mb-8">
//         ...
//     </div>
// </div>
// <button ...>Mainkan Arena</button>

// Let's replace the grouping
content = content.replace(/<div>\s*(<div class="w-12 h-12 rounded-lg flex items-center justify-center) mb-6 (border border-primary\/30 bg-primary\/30">\s*<span[^>]*>[^<]*<\/span>\s*<\/div>)\s*(<h2[^>]*>.*?<\/h2>)\s*(<p[^>]*mb-)6([^>]*>[\s\S]*?<\/p>)\s*<div class="flex flex-wrap gap-2 mb-8">[\s\S]*?<\/div>\s*<\/div>\s*(<button)/g, 
`$1 mb-auto $2
<div>
    $3
    $44$5
</div>
$6`);

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Updated layout in belajar.html");
