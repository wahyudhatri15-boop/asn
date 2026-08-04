const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Add overflow-y-scroll to body if not already present
    // <body class="text-on-background font-body-lg min-h-screen relative bg-background">
    // or <body class="dark min-h-screen bg-background text-on-surface">
    if (content.includes('<body class="') && !content.includes('overflow-y-scroll')) {
        content = content.replace(/<body class="([^"]+)"/, '<body class="$1 overflow-y-scroll"');
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Added overflow-y-scroll to ${file}`);
    }
});
