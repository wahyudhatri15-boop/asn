const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f.includes('level'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We want to replace:
    // let baseScore = cAnswers * 10;
    // let multiplier = <value>;
    // addedPoints = Math.round(baseScore * multiplier);
    // WITH:
    // score = cAnswers * 10;
    // let multiplier = <value>;
    // addedPoints = Math.round(score * multiplier);
    
    if (content.includes('let baseScore = cAnswers * 10;')) {
        content = content.replace(/let baseScore = cAnswers \* 10;/g, 'score = cAnswers * 10;');
        content = content.replace(/Math\.round\(baseScore \*/g, 'Math.round(score *');
        
        fs.writeFileSync(file, content);
        console.log(`Updated summary screen scoring logic in ${file}`);
    } else {
        console.log(`No need to update ${file}`);
    }
}
