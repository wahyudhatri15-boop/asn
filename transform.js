const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the opening <div class="glass-card..."> with <a href="#" class="glass-card... bg-surface-container border border-white/10 hover:border-primary/50 hover:bg-surface-container-high hover:-translate-y-1 transition-all duration-300 cursor-pointer block outline-none focus:ring-2 focus:ring-primary/50">
html = html.replace(/<div class="glass-card (.*?)">/g, '<a href="#" class="glass-card $1 bg-surface-container border border-white/10 hover:border-primary/50 hover:bg-surface-container-high hover:-translate-y-1 transition-all duration-300 cursor-pointer block outline-none focus:ring-2 focus:ring-primary/50">');

// 2. Replace the inner button and the closing two divs with a span and </div></a>
const endRegex = /<button class="text-sm font-semibold text-primary hover:text-primary-fixed-dim transition-colors">Mainkan<\/button>\s*<\/div>\s*<\/div>/g;
const replaceStr = '<span class="text-sm font-semibold text-primary group-hover:text-primary-fixed-dim transition-colors">Mainkan</span>\n</div>\n</a>';
html = html.replace(endRegex, replaceStr);

fs.writeFileSync('index.html', html);
console.log("Successfully updated index.html");
