const fs = require('fs');
let html = fs.readFileSync('database-soal.html', 'utf8');

// Replace "w-full bg-black/50" in the TKP score inputs with "w-16 text-center bg-black/50"
// Actually, looking at the injection: class="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-primary focus:outline-none" placeholder="1-5"

for (let i = 1; i <= 5; i++) {
    const searchString = `id="q-tkp-score-${i}" min="1" max="5" class="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-primary focus:outline-none"`;
    const replaceString = `id="q-tkp-score-${i}" min="1" max="5" class="w-16 text-center bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-primary focus:outline-none"`;
    html = html.replace(searchString, replaceString);
}

// Ensure the container w-full is removed so it only takes up necessary space?
// <div id="tkp-score-container-1" class="hidden flex items-center gap-2 mt-2 w-full">
// Let's remove w-full from the container too, or keep it but just make the input small.
for (let i = 1; i <= 5; i++) {
    html = html.replace(`id="tkp-score-container-${i}" class="hidden flex items-center gap-2 mt-2 w-full"`, `id="tkp-score-container-${i}" class="hidden flex items-center gap-2 mt-2"`);
}

fs.writeFileSync('database-soal.html', html);
console.log('Fixed TKP score input sizes.');
