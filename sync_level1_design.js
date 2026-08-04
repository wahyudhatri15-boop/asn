const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let level1Html = fs.readFileSync('math-blitz-level-1.html', 'utf8');

// 1. Replace tailwind config
const tailwindConfigMatch = indexHtml.match(/<script id="tailwind-config">[\s\S]*?<\/script>/);
if (tailwindConfigMatch) {
    level1Html = level1Html.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, tailwindConfigMatch[0]);
}

// 2. Update body tag
// Current: <body class="min-h-screen flex flex-col font-body-md overflow-hidden dark">
level1Html = level1Html.replace(/<body.*?>/, '<body class="min-h-screen flex flex-col font-body-md overflow-hidden bg-background text-on-surface">');

// 3. Update header styling
// Current: <header class="fixed top-0 w-full z-[200] flex justify-between items-center px-container-padding-desktop py-4 bg-surface/70 backdrop-blur-xl dark:bg-surface-container-lowest/70 border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
level1Html = level1Html.replace(/bg-surface\/70 backdrop-blur-xl dark:bg-surface-container-lowest\/70/, 'bg-background/80 backdrop-blur-xl shadow-2xl');

// Note: text-primary-container might not map correctly since the index.html tailwind config has primary as #FF9500. 
// Let's replace text-primary-container with text-primary (orange) and text-on-surface where appropriate to match the main page.
level1Html = level1Html.replace(/text-primary-container/g, 'text-primary');

// Re-write file
fs.writeFileSync('math-blitz-level-1.html', level1Html);
console.log("Successfully aligned math-blitz-level-1.html design language with index.html.");
