const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.startsWith('math-blitz-level-') && f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix cAnswers prioritization bug
    let updated = false;
    if (content.includes("if (typeof correctAnswersCount !== 'undefined') cAnswers = correctAnswersCount;") &&
        content.includes("else if (typeof correctAnswers !== 'undefined') cAnswers = correctAnswers;")) {
        
        content = content.replace(
            /let cAnswers = 0;\s*if \(typeof correctAnswersCount !== 'undefined'\) cAnswers = correctAnswersCount;\s*else if \(typeof correctAnswers !== 'undefined'\) cAnswers = correctAnswers;/,
            "let cAnswers = (typeof correctAnswers !== 'undefined' && correctAnswers > 0) ? correctAnswers : ((typeof correctAnswersCount !== 'undefined') ? correctAnswersCount : 0);"
        );
        updated = true;
    }
    
    if (updated) {
        fs.writeFileSync(file, content);
        console.log(`Fixed cAnswers logic in ${file}`);
    }
}
