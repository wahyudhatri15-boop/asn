const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Find the Belajar link in the top nav
    const belajarRegex = /(<a[^>]*>Belajar<\/a>\s*)/;
    
    if (belajarRegex.test(content) && !content.includes('>Pembahasan</a>')) {
        const pembahasanLink = '<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="pembahasan.html">Pembahasan</a>\n';
        
        content = content.replace(belajarRegex, `$1${pembahasanLink}`);
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Added Pembahasan to ${file}`);
    }
});

// Create a basic pembahasan.html by duplicating index.html if it doesn't exist
const pembahasanPath = path.join(dir, 'pembahasan.html');
if (!fs.existsSync(pembahasanPath)) {
    let indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    // Set Pembahasan to active and Belajar to inactive in this new file
    indexContent = indexContent.replace(
        /<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Belajar<\/a>/,
        '<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="index.html">Belajar</a>'
    );
    indexContent = indexContent.replace(
        /<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="pembahasan\.html">Pembahasan<\/a>/,
        '<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Pembahasan</a>'
    );
    // Remove the main content and add a placeholder title
    indexContent = indexContent.replace(
        /<main[^>]*>[\s\S]*?<\/main>/,
        `<main class="flex-grow pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-[1200px] mx-auto w-full">
            <div class="mb-12 text-center md:text-left">
                <h1 class="font-display text-display md:text-display text-glow mb-4 text-primary-container">Pembahasan Soal</h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-body-md">Evaluasi dan pelajari pembahasan dari setiap jawaban Anda.</p>
            </div>
        </main>`
    );
    
    fs.writeFileSync(pembahasanPath, indexContent, 'utf8');
    console.log("Created pembahasan.html");
}
