const fs = require('fs');

const styleBlock = `
<style id="page-transition">
  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>
</head>`;

const files = ['index.html', 'math-blitz.html', 'math-blitz-level-1.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add Style Block if not present
    if (!content.includes('id="page-transition"')) {
        content = content.replace('</head>', styleBlock);
    }

    // 2. Add animation class to <main> tag
    if (content.includes('<main class="')) {
        // Find main tag and check if it already has the animation class
        const mainRegex = /<main class="([^"]*)"/g;
        content = content.replace(mainRegex, (match, classes) => {
            if (!classes.includes('animate-fade-in-up')) {
                return `<main class="animate-fade-in-up ${classes}"`;
            }
            return match;
        });
    }

    fs.writeFileSync(file, content);
    console.log(`Updated animations in ${file}`);
});
