const fs = require('fs');

for (let i = 2; i <= 5; i++) {
    const file = `math-blitz-level-${i}.html`;
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    const targetStr = `document.getElementById('question-text').innerHTML = '$' + questions[index].question + '$';`;
    const replaceStr = `document.getElementById('question-text').innerHTML = '<math-field readonly style="background:transparent; border:none; pointer-events:none; padding:0; margin:0; text-align:center;" class="text-white">' + questions[index].question + '</math-field>';`;
    
    if (content.includes(targetStr)) {
        content = content.replace(targetStr, replaceStr);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched ${file}`);
    } else {
        console.log(`Target string not found in ${file}`);
    }
}
