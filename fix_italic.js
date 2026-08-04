const fs = require('fs');

let c = fs.readFileSync('database-soal.html', 'utf8');
c = c.replace(/formatText\(''\)/g, "formatText('italic')");
c = c.replace(/<span class="text-lg  font-serif">I<\/span> /g, '<span class="text-lg italic font-serif">I</span> Italic');
c = c.replace(/else if \(style === ''\)/g, "else if (style === 'italic')");
c = c.replace(/\(bukan variabel math\/\)/g, "(bukan variabel math/italic)");
c = c.replace(/format HTML bawaan \(bold\/\)/g, "format HTML bawaan (bold/italic)");

fs.writeFileSync('database-soal.html', c);
console.log('Fixed database-soal.html');
