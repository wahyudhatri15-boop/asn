const fs = require('fs');
let content = fs.readFileSync('database-soal.html', 'utf8');

const oldBlock = `                    </div>
                    <div class="bg-success/10 border border-success/30 rounded-lg p-3 inline-block">
                        <span class="text-sm font-bold text-success math-display">Jawaban: \${aText}</span>
                    </div>
                \`
                
                let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');`;

const newBlock = `                    </div>
                \`;
                
                let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
                if (!showOptions) {
                    html += \`
                    <div class="bg-success/10 border border-success/30 rounded-lg p-3 inline-block">
                        <span class="text-sm font-bold text-success math-display">Jawaban: \${aText}</span>
                    </div>
                    \`;
                }`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync('database-soal.html', content, 'utf8');
    console.log("Successfully patched Jawaban box rendering.");
} else {
    // If spaces mismatch, let's use regex
    const regex = /<\/div>\s*<div class="bg-success\/10 border border-success\/30 rounded-lg p-3 inline-block">\s*<span class="text-sm font-bold text-success math-display">Jawaban: \$\{aText\}<\/span>\s*<\/div>\s*`\s*let showOptions = \(currentGame === 'math_blitz' && currentLevel === 1\) \|\| \(currentGame === 'word_equation'\);/;
    
    if (regex.test(content)) {
        content = content.replace(regex, `                    </div>
                \`;
                
                let showOptions = (currentGame === 'math_blitz' && currentLevel === 1) || (currentGame === 'word_equation');
                if (!showOptions) {
                    html += \`
                    <div class="bg-success/10 border border-success/30 rounded-lg p-3 inline-block">
                        <span class="text-sm font-bold text-success math-display">Jawaban: \${aText}</span>
                    </div>
                    \`;
                }`);
        fs.writeFileSync('database-soal.html', content, 'utf8');
        console.log("Successfully patched Jawaban box rendering using regex.");
    } else {
        console.log("Failed to match the Jawaban block.");
    }
}
