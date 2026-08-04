const fs = require('fs');
const path = require('path');

const dir = __dirname;
const belajarHtmlPath = path.join(dir, 'belajar.html');
const tempBelajarHtmlPath = path.join(dir, 'temp_user_belajar.html');
const indexHtmlPath = path.join(dir, 'index.html');

// 1. Overwrite index.html with belajar.html
if (fs.existsSync(belajarHtmlPath)) {
    fs.copyFileSync(belajarHtmlPath, indexHtmlPath);
    console.log("Copied belajar.html to index.html");
}

// 2. Process all HTML files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Remove the Drilling nav item
    content = content.replace(/<a[^>]*>Drilling<\/a>\s*/gi, '');
    
    // Update any link to belajar.html to point to index.html
    content = content.replace(/href="belajar\.html"/g, 'href="index.html"');
    content = content.replace(/href='belajar\.html'/g, "href='index.html'");
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated links in ${file}`);
});

// 3. Delete belajar.html and temp_user_belajar.html
if (fs.existsSync(belajarHtmlPath)) {
    fs.unlinkSync(belajarHtmlPath);
    console.log("Deleted belajar.html");
}
if (fs.existsSync(tempBelajarHtmlPath)) {
    fs.unlinkSync(tempBelajarHtmlPath);
    console.log("Deleted temp_user_belajar.html");
}
