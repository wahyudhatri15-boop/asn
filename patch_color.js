const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = ['word-equation-level-1.html', 'word-equation-level-2.html', 'word-equation-level-3.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Update Tailwind theme colors
    content = content.replace(/"primary": "#10b981"/g, '"primary": "#FF9500"');
    content = content.replace(/"surface-tint": "#10b981"/g, '"surface-tint": "#FF9500"');
    content = content.replace(/"primary-container": "#10b981"/g, '"primary-container": "#FF9500"');
    content = content.replace(/"primary-fixed-dim": "#34d399"/g, '"primary-fixed-dim": "#ffb340"');

    // Also change the button class if it has bg-neon-green
    content = content.replace(/"bg-neon-green text-black/g, '"bg-[#39FF14] text-black');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log("Updated colors in", file);
});
