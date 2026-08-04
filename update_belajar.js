const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace "Arena" with "Belajar" in top nav
    content = content.replace(/href="arena\.html">Arena<\/a>/g, 'href="belajar.html">Belajar</a>');
    
    // Replace "Arena" with "Belajar" in mobile bottom nav
    content = content.replace(/>Arena<\/span>/g, '>Belajar</span>');
    
    // Just in case there's an inactive "Arena" link pointing somewhere else or similar
    content = content.replace(/href="arena\.html"/g, 'href="belajar.html"');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});

// Now create belajar.html based on index.html
let indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Update active state in belajar.html
indexContent = indexContent.replace(
    /<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Drilling<\/a>/,
    '<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="index.html">Drilling</a>'
);
indexContent = indexContent.replace(
    /<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="belajar\.html">Belajar<\/a>/,
    '<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Belajar</a>'
);

// Update Mobile Nav active state if possible (usually active state might not be fully implemented but let's just make sure links are right)
indexContent = indexContent.replace(
    /<a class="flex flex-col items-center justify-center w-16 text-primary" href="#">\s*<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1;">swords<\/span>\s*<span class="text-\[10px\] font-bold mt-1 uppercase tracking-tighter">Belajar<\/span>\s*<\/a>/,
    '<a class="flex flex-col items-center justify-center w-16 text-primary" href="#">\n<span class="material-symbols-outlined" style="font-variation-settings: "FILL" 1;">book</span>\n<span class="text-[10px] font-bold mt-1 uppercase tracking-tighter">Belajar</span>\n</a>'
);

// We need to keep the structure the same but change titles to reflect "Belajar"
indexContent = indexContent.replace(/Selamat Datang di Arena Pertarungan Otak/g, 'Selamat Datang di Menu Belajar');
indexContent = indexContent.replace(/Tantang dirimu di berbagai arena simulasi CPNS dan raih skor tertinggi melalui rangkaian mini-game edukatif\./g, 'Pelajari berbagai materi CPNS dan tingkatkan pemahamanmu melalui modul pembelajaran komprehensif.');
indexContent = indexContent.replace(/TIU Arena/g, 'Materi TIU');
indexContent = indexContent.replace(/TWK Arena/g, 'Materi TWK');
indexContent = indexContent.replace(/TKP Arena/g, 'Materi TKP');

fs.writeFileSync(path.join(dir, 'belajar.html'), indexContent, 'utf8');
console.log('Created belajar.html');
