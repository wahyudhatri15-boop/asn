const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f.includes('level'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if there's a nextBtn
    if (content.includes("Lanjut ke Level Berikutnya")) {
        console.log(`${file} HAS next button`);
    } else {
        console.log(`${file} NO next button`);
    }
}
