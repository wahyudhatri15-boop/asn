const fs = require('fs');

const files = [
    'index.html',
    'math-blitz.html',
    'word-equation.html',
    'number-chain.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Regex to find the History link and append Database Soal after it.
        // It looks like: <a ... href="#">History</a>
        const historyRegex = /(<a[^>]*href="[^"]*"[^>]*>History<\/a>)/i;
        
        if (historyRegex.test(content) && !content.includes('>Database Soal<')) {
            content = content.replace(historyRegex, `$1\n\n<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="database-soal.html">Database Soal</a>`);
            fs.writeFileSync(file, content, 'utf8');
            console.log("Updated", file);
        } else {
            console.log("Could not find History or already has Database Soal in", file);
        }
    }
});
