const fs = require('fs');
let content = fs.readFileSync('database-soal.html', 'utf8');

// Replace the render logic to use <math-field readonly> instead of $$
const oldRenderRegex = /setTimeout\(\(\) => \{\s*document\.querySelectorAll\('\.math-display'\)\.forEach\(el => \{\s*let text = el\.innerText;\s*if \(text\.startsWith\('Jawaban: '\)\) \{\s*let mathPart = text\.replace\('Jawaban: ', ''\);\s*el\.innerHTML = 'Jawaban: <span class="math-content">\$\$' \+ mathPart \+ '\$\$<\/span>';\s*\} else \{\s*el\.innerHTML = '\$\$' \+ text \+ '\$\$';\s*\}\s*\}\);\s*if \(window\.MathLive\) \{\s*window\.MathLive\.renderMathInDocument\(\);\s*\}\s*\}, 50\);/;

const newRenderCode = `setTimeout(() => {
                    document.querySelectorAll('.math-display').forEach(el => {
                        let text = el.innerText;
                        let innerHtml = '';
                        if (text.startsWith('Jawaban: ')) {
                            let mathPart = text.replace('Jawaban: ', '');
                            innerHtml = 'Jawaban: <math-field readonly style="display:inline-block; pointer-events:none; background:transparent; border:none; padding:0; margin:0;" class="text-success">' + mathPart + '</math-field>';
                        } else {
                            innerHtml = '<math-field readonly style="display:inline-block; pointer-events:none; background:transparent; border:none; padding:0; margin:0;" class="text-white">' + text + '</math-field>';
                        }
                        el.innerHTML = innerHtml;
                    });
                }, 50);`;

if(oldRenderRegex.test(content)) {
    content = content.replace(oldRenderRegex, newRenderCode);
    fs.writeFileSync('database-soal.html', content, 'utf8');
    console.log("Successfully replaced with math-field readonly");
} else {
    console.log("Regex failed, doing manual split...");
    let parts = content.split("setTimeout(() => {");
    if(parts.length > 1) {
       let endParts = parts[1].split("}, 50);");
       let rest = endParts.slice(1).join("}, 50);");
       content = parts[0] + newRenderCode + rest;
       fs.writeFileSync('database-soal.html', content, 'utf8');
       console.log("Successfully replaced via split");
    }
}
