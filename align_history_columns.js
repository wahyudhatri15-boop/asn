const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// 1. Fix Headers: Remove "Jawaban Benar"
const oldHeaders = `<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Jawaban Benar</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>`;

const newHeaders = `<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>
<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>`;

html = html.replace(oldHeaders, newHeaders);

// 2. Fix JS Rendering for Score (Remove / maxScore)
// The current td for score is:
// <td class="px-8 py-6">
//     <div class="flex flex-col">
//         <span class="text-headline-lg-mobile text-white font-black ">${item.score}<span class="text-body-sm text-white/70 ml-1 font-bold">/ ${item.maxScore}</span></span>
//     </div>
// </td>

const oldScoreRegex = /<span class="text-headline-lg-mobile text-white font-black ">\\\$\{item\.score\}<span class="text-body-sm text-white\/70 ml-1 font-bold">\/ \\\$\{item\.maxScore\}<\/span><\/span>/;
const newScoreHtml = `<span class="text-headline-lg-mobile text-white font-black ">\\\${item.score}</span>`;

html = html.replace(oldScoreRegex, newScoreHtml);

// 3. Fix colspans (if any were 6, revert to 5)
html = html.replace(/colspan="6"/g, 'colspan="5"');

fs.writeFileSync('history.html', html);
console.log('Fixed history table columns and score rendering.');
