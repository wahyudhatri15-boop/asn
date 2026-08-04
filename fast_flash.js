const fs = require('fs');

const files = [
    'word-equation-level-1.html',
    'word-equation-level-2.html',
    'word-equation-level-3.html',
    'update_word_equations.js'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Update CSS flash duration (if present)
    content = content.replace(/animation: flashGreen 0\.5s/g, 'animation: flashGreen 0.2s');
    content = content.replace(/animation: flashRed 0\.5s/g, 'animation: flashRed 0.3s'); // Also make red flash a bit faster

    // 2. Update JS timeouts in the generated script
    content = content.replace(/setTimeout\(\(\) => document\.body\.classList\.remove\('screen-flash-green'\), 500\);/g, "setTimeout(() => document.body.classList.remove('screen-flash-green'), 200);");
    
    // Replace the outer timeout for swipe transition (was 600)
    content = content.replace(/setTimeout\(\(\) => \{\n\s*canvas\.classList\.add\('swipe-transition'\);\n\s*setTimeout\(\(\) => \{\n\s*canvas\.classList\.remove\('swipe-transition'\);\n\s*currentQuestionIndex\+\+;\n\s*loadQuestion\(currentQuestionIndex\);\n\s*\}, 500\);\n\s*\}, 600\);/g, 
        `setTimeout(() => {
                canvas.classList.add('swipe-transition');
                setTimeout(() => {
                    canvas.classList.remove('swipe-transition');
                    currentQuestionIndex++;
                    loadQuestion(currentQuestionIndex);
                }, 400);
            }, 250);`);

    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated", file);
});
