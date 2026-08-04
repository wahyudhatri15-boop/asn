const fs = require('fs');

const dbHtml = fs.readFileSync('database-soal.html', 'utf8');

// Update body tag
const newDbHtml = dbHtml.replace(/<body[^>]*>/, '<body class="text-on-background font-body-lg min-h-screen relative bg-background">');
fs.writeFileSync('database-soal.html', newDbHtml, 'utf8');
console.log("Successfully synced body tag.");
