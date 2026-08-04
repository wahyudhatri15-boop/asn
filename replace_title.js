const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // The previous script wrote:
    // <a href="index.html" class="font-display text-primary tracking-tighter hover:opacity-80 transition-opacity text-base md:text-2xl font-bold whitespace-nowrap">COC</a>
    
    // Or for levels:
    // <a href="index.html" class="font-display text-primary tracking-tighter hover:opacity-80 transition-opacity text-base md:text-2xl font-bold whitespace-nowrap">COC</a>

    if (content.includes('>COC</a>')) {
        content = content.replace(/>COC<\/a>/g, '>Clash Of Civil Servants</a>');
        fs.writeFileSync(file, content);
        console.log(`Updated title in ${file}`);
    } else {
        console.log(`Did not find COC abbreviation in ${file}`);
    }
}
