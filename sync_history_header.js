const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtmlPath = path.join(dir, 'index.html');
const historyHtmlPath = path.join(dir, 'history.html');

let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
let historyContent = fs.readFileSync(historyHtmlPath, 'utf8');

// Extract TopNavBar and Mobile Header from index.html
const indexHeaderRegex = /(<!-- TopNavBar -->\s*<nav[^>]*>[\s\S]*?<\/nav>\s*<!-- Mobile Header -->\s*<header[^>]*>[\s\S]*?<\/header>)/;
const indexHeaderMatch = indexContent.match(indexHeaderRegex);

if (!indexHeaderMatch) {
    console.error("Header not found in index.html");
    process.exit(1);
}

let newHeader = indexHeaderMatch[1];

// Update active states for history.html
// 1. Make Belajar inactive
newHeader = newHeader.replace(
    /<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Belajar<\/a>/,
    '<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="index.html">Belajar</a>'
);

// 2. Make History active
newHeader = newHeader.replace(
    /<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="history\.html">History<\/a>/,
    '<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">History</a>'
);

// Find and replace the TopNavBar in history.html
const historyHeaderRegex = /(<!-- TopNavBar -->\s*<nav[^>]*>[\s\S]*?<\/nav>)/;
if (historyContent.match(historyHeaderRegex)) {
    historyContent = historyContent.replace(historyHeaderRegex, newHeader);
} else {
    // If not found, insert after <main ...>
    historyContent = historyContent.replace(/(<main[^>]*>)/, '$1\n' + newHeader);
}

fs.writeFileSync(historyHtmlPath, historyContent, 'utf8');
console.log("Synced header layout from index.html to history.html");
