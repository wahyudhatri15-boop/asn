const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// 1. Re-add the "Jawaban Benar" header
const oldHeaders = `<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>`;

const newHeaders = `<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Jawaban Benar</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>`;

if (html.includes(oldHeaders)) {
    html = html.replace(oldHeaders, newHeaders);
} else {
    // try to insert after Kategori Test if oldHeaders string doesn't match perfectly
    html = html.replace('<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>', '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Jawaban Benar</th>');
}


// 2. Add the Jawaban Benar cell to the table row output
// I will find the 'score' td and prepend the 'correct' td
const scoreTd = `<td class="px-8 py-6">
                            <div class="flex flex-col">
                                <span class="text-headline-lg-mobile text-white font-black ">\${item.score}</span>
                            </div>
                        </td>`;
                        
const correctTd = `<td class="px-8 py-6">
                            <span class="font-title-md text-on-surface font-bold">\${item.correct || 0} / \${(item.correct || 0) + (item.wrong || 0)}</span>
                        </td>`;

if (html.includes(scoreTd)) {
    html = html.replace(scoreTd, correctTd + '\n                        ' + scoreTd);
} else {
    // If exact match fails, let's use regex
    html = html.replace(/<td class="px-8 py-6">\s*<div class="flex flex-col">\s*<span class="text-headline-lg-mobile text-white font-black ">\\\$\{item\.score\}<\/span>\s*<\/div>\s*<\/td>/,
    correctTd + '\n                        ' + scoreTd);
}

// 3. Update colspans
html = html.replace(/colspan="5"/g, 'colspan="6"');

fs.writeFileSync('history.html', html);
console.log('Added Jawaban Benar column back.');
