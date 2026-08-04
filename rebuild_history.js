const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtmlPath = path.join(dir, 'index.html');
const historyHtmlPath = path.join(dir, 'history.html');

let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
let historyContent = fs.readFileSync(historyHtmlPath, 'utf8');

// 1. Extract History specific content from history.html
// Everything between <div class="max-w-[1200px] mx-auto px-8 py-10 relative z-10"> and </main> (excluding the navs if possible, or just exact string)
const historyMainRegex = /(<div class="max-w-\[1200px\] mx-auto px-8 py-10 relative z-10">[\s\S]*?)<\/main>/;
const match = historyContent.match(historyMainRegex);
if (!match) {
    console.error("Could not extract history main content");
    process.exit(1);
}
let historyCoreContent = match[1];

// Also, extract the filter script we added earlier
const filterScriptRegex = /(<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>)/;
const filterMatch = historyContent.match(filterScriptRegex);
const filterScript = filterMatch ? filterMatch[1] : '';

// 2. Clone index.html
let newHistoryContent = indexContent;

// 3. Replace the inner content of <main> in newHistoryContent
// index.html has:
// <main class="flex-grow pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-[1200px] mx-auto w-full">
//    <!-- Hero Section --> ...
//    <!-- Arena Bento Grid --> ...
//    <!-- Tips Pro Section --> ...
// </main>
// We replace everything inside <main ...> ... </main> with historyCoreContent
newHistoryContent = newHistoryContent.replace(
    /(<main[^>]*>)[\s\S]*?(<\/main>)/,
    `$1\n${historyCoreContent}\n$2`
);

// 4. Update the Active navigation classes in the TopNavBar and Mobile Header of newHistoryContent
// Belajar becomes inactive
newHistoryContent = newHistoryContent.replace(
    /<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Belajar<\/a>/g,
    '<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="index.html">Belajar</a>'
);
// History becomes active
newHistoryContent = newHistoryContent.replace(
    /<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="history\.html">History<\/a>/g,
    '<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">History</a>'
);

// Mobile Nav - Belajar becomes inactive
newHistoryContent = newHistoryContent.replace(
    /<a class="flex flex-col items-center justify-center w-16 text-primary" href="#">\s*<span[^>]*>book<\/span>\s*<span[^>]*>Belajar<\/span>\s*<\/a>/,
    '<a class="flex flex-col items-center justify-center w-16 text-on-surface-variant hover:text-white" href="index.html">\n<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1;">book</span>\n<span class="text-[10px] font-bold mt-1 uppercase tracking-tighter">Belajar</span>\n</a>'
);
// Mobile Nav - History becomes active (index.html currently doesn't have history in mobile nav visibly active, let's inject it or leave it. Actually, index.html has a broken mobile bottom nav. Let's just fix the bottom nav for history if present. Wait, the BottomNavBar Mobile in index.html is just Belajar and an empty <a>. Let's ignore it or replace it with the one from history.html).

// We'll append the filter script before </body>
newHistoryContent = newHistoryContent.replace('</body>', filterScript + '\n</body>');

fs.writeFileSync(historyHtmlPath, newHistoryContent, 'utf8');
console.log("Successfully rebuilt history.html from index.html skeleton");
