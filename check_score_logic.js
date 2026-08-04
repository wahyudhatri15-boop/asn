const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f.includes('level'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // find multiplier
    let multMatch = content.match(/let multiplier = ([0-9.]+);/);
    let scoreMatch = content.match(/score \+= /);
    let newScoreMatch = content.match(/score = cAnswers/);
    
    let multiplier = multMatch ? multMatch[1] : 'not found';
    let scoring = scoreMatch ? 'cumulative' : (newScoreMatch ? 'fixed (cAnswers)' : 'unknown');
    
    // Also check if word equation has it
    if (file.includes('word-equation')) {
        let weMult = content.match(/let multiplier = ([0-9.]+);/);
        multiplier = weMult ? weMult[1] : 'not found';
    }
    
    console.log(`${file.padEnd(30)} | Mult: ${multiplier.padEnd(10)} | Score type: ${scoring}`);
}
