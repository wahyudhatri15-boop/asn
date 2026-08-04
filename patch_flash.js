const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = ['word-equation-level-1.html', 'word-equation-level-2.html', 'word-equation-level-3.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    const oldCss = `.screen-flash-red {
            animation: flashRed 0.3s ease-out forwards;
        }
        @keyframes flashRed {
            0% { background-color: rgba(239, 68, 68, 0); }
            50% { background-color: rgba(239, 68, 68, 0.2); }
            100% { background-color: rgba(239, 68, 68, 0); }
        }
        .screen-flash-green {
            animation: flashGreen 0.2s ease-out forwards;
        }
        @keyframes flashGreen {
            0% { background-color: rgba(16, 185, 129, 0); }
            50% { background-color: rgba(16, 185, 129, 0.2); }
            100% { background-color: rgba(16, 185, 129, 0); }
        }`;

    const newCss = `body::after {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
            background-color: transparent;
        }
        .screen-flash-red::after {
            animation: flashRed 0.3s ease-out forwards;
        }
        @keyframes flashRed {
            0% { background-color: rgba(239, 68, 68, 0); }
            50% { background-color: rgba(239, 68, 68, 0.2); }
            100% { background-color: rgba(239, 68, 68, 0); }
        }
        .screen-flash-green::after {
            animation: flashGreen 0.2s ease-out forwards;
        }
        @keyframes flashGreen {
            0% { background-color: rgba(16, 185, 129, 0); }
            50% { background-color: rgba(16, 185, 129, 0.2); }
            100% { background-color: rgba(16, 185, 129, 0); }
        }`;

    if (content.includes('.screen-flash-red {')) {
        content = content.replace(oldCss, newCss);
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log("Patched CSS in", file);
    } else {
        console.log("Could not find CSS block in", file);
    }
});
