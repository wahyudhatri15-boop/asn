const fs = require('fs');

// Patch Math Blitz
for (let level = 1; level <= 5; level++) {
    let file = `math-blitz-level-${level}.html`;
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // 1. Inject MathLive
        if (!content.includes('unpkg.com/mathlive')) {
            content = content.replace('</head>', '  <script src="https://unpkg.com/mathlive"></script>\n</head>');
        }
        
        // 2. Remove old custom regex replacements for fractions
        // e.g. document.getElementById('question-text').innerHTML = questions[index].question.replace(/(\d+)\/(\d+)/g, ...);
        // In level 1: questionText.innerHTML = q.q.replace(/(\d+)\/(\d+)/g, ...);
        const regex1 = /questionText\.innerHTML\s*=\s*q\.q\.replace\([\s\S]*?\);/;
        if (regex1.test(content)) {
            content = content.replace(regex1, "questionText.innerHTML = '$$' + q.q + '$$';");
        }
        
        const regex2 = /document\.getElementById\('question-text'\)\.innerHTML\s*=\s*questions\[index\]\.question\.replace\([\s\S]*?\);/;
        if (regex2.test(content)) {
            content = content.replace(regex2, "document.getElementById('question-text').innerHTML = '$$' + questions[index].question + '$$';");
        }
        
        // 3. Render MathLive after setting innerHTML
        const loadQuestionEnd = /updateTimerDisplay\(\);/; // This is usually around the end of loadQuestion logic in level 2-5
        // Wait, the safest way is to add the render call right after we set the innerHTML.
        // I already replaced the innerHTML line above, so I can just append the render call to it!
        content = content.replace("questionText.innerHTML = '$$' + q.q + '$$';", 
            "questionText.innerHTML = '$$' + q.q + '$$';\n        if(window.MathLive) { window.MathLive.renderMathInElement(questionText); }");
            
        content = content.replace("document.getElementById('question-text').innerHTML = '$$' + questions[index].question + '$$';", 
            "const qt = document.getElementById('question-text');\n        qt.innerHTML = '$$' + questions[index].question + '$$';\n        if(window.MathLive) { window.MathLive.renderMathInElement(qt); }");
        
        fs.writeFileSync(file, content, 'utf8');
        console.log("Patched Math Blitz Level", level);
    }
}

// Patch Word Equation
for (let level = 1; level <= 3; level++) {
    let file = `word-equation-level-${level}.html`;
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // 1. Inject MathLive
        if (!content.includes('unpkg.com/mathlive')) {
            content = content.replace('</head>', '  <script src="https://unpkg.com/mathlive"></script>\n</head>');
        }
        
        // 2. Wrap in $$ and render
        // word equation usually has: questionText.innerHTML = q.q.replace(/\[ \? \]/g, ...);
        const weRegex = /questionText\.innerHTML\s*=\s*q\.q\.replace\(\/\\\[ \\\? \\\]\/g, '.*?<span class="animate-pulse text-primary-container".*?>\\\[ \\\? \\\]<\\\/span>'\);/i;
        // Actually the replacement is usually:
        // questionText.innerHTML = q.q.replace(/\[ \? \]/g, '<span class="animate-pulse text-primary-container" style="color: rgb(255, 149, 0);">[ ? ]</span>');
        // Let's just find `questionText.innerHTML = q.q.replace`
        const simpleWeRegex = /questionText\.innerHTML\s*=\s*q\.q\.replace\([\s\S]*?\);/;
        if (simpleWeRegex.test(content)) {
            // Keep the original replacement for [ ? ] but then wrap in $$ and render.
            // Wait, Word Equation has normal words. If we wrap normal text like "Mobil : Bensin = Manusia : [ ? ]" in $$, MathLive will render it as math variables (italicized, no spaces).
            // So we SHOULD NOT wrap Word Equation in $$ unless we use \text{}.
            // Actually, we don't need to wrap Word Equation in $$ at all. It's just words!
            // But if the user types math, they might want it to render. We can just run renderMathInElement on the whole page so any $$ they typed gets rendered, but don't force $$ on everything.
            content = content.replace(simpleWeRegex, 
                "questionText.innerHTML = q.q.replace(/\\[ \\? \\]/g, '<span class=\"animate-pulse text-primary-container\" style=\"color: rgb(255, 149, 0);\">[ ? ]</span>');\n        if(window.MathLive) { window.MathLive.renderMathInElement(questionText); }");
        }
        
        fs.writeFileSync(file, content, 'utf8');
        console.log("Patched Word Equation Level", level);
    }
}
