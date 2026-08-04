const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtmlPath = path.join(dir, 'index.html');
const belajarHtmlPath = path.join(dir, 'belajar.html');

let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
let belajarContent = fs.readFileSync(belajarHtmlPath, 'utf8');

// Extract main from index.html
const mainMatch = indexContent.match(/(<main[\s\S]*?<\/main>)/);
if (!mainMatch) {
    console.error("Main not found in index");
    process.exit(1);
}
let newMain = mainMatch[1];

// Update hero text in the extracted main to fit 'Belajar' instead of 'Arena'
newMain = newMain.replace('Selamat Datang di Arena Pertarungan Otak', 'Selamat Datang di Menu Belajar');
newMain = newMain.replace('Tantang dirimu di berbagai arena simulasi CPNS dan raih skor tertinggi melalui rangkaian mini-game edukatif.', 'Pelajari berbagai materi seleksi CPNS dan persiapkan dirimu secara maksimal.');

// Replace main in belajar.html
belajarContent = belajarContent.replace(/<main[\s\S]*?<\/main>/, newMain);

// Write back to belajar.html
fs.writeFileSync(belajarHtmlPath, belajarContent, 'utf8');
console.log("Reverted belajar.html to index.html layout");
