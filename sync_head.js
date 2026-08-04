const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const dbHtml = fs.readFileSync('database-soal.html', 'utf8');

// Extract head from index.html
const headRegex = /(<head>[\s\S]*?<\/head>)/;
const indexHeadMatch = indexHtml.match(headRegex);

if (indexHeadMatch) {
    const newDbHtml = dbHtml.replace(headRegex, indexHeadMatch[1]);
    fs.writeFileSync('database-soal.html', newDbHtml, 'utf8');
    console.log("Successfully synced head from index.html to database-soal.html");
} else {
    console.log("Failed to extract head from index.html");
}
