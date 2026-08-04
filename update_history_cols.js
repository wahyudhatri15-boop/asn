const fs = require('fs');

let html = fs.readFileSync('history.html', 'utf8');

// Replace table headers
const oldHeaders = `<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>`;
const newHeaders = `<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Jawaban Benar</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>`;

html = html.replace(oldHeaders, newHeaders);

// Replace JS render function columns
const oldColumns = `<td class="px-8 py-6">
                            <div class="flex flex-col">
                                <span class="text-headline-lg-mobile text-white font-black ">\\\${item.score}<span class="text-body-sm text-white/70 ml-1 font-bold">/ \\\${item.maxScore}</span></span>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <span class="font-title-md text-on-surface font-bold">\\\${passingGrade}</span>
                        </td>`;
const newColumns = `<td class="px-8 py-6">
                            <div class="flex flex-col">
                                <span class="text-headline-lg-mobile text-white font-black ">\\\${item.correct || 0}<span class="text-body-sm text-white/70 ml-1 font-bold">Benar</span></span>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <div class="flex flex-col">
                                <span class="text-headline-lg-mobile text-white font-black ">\\\${item.score}</span>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <span class="font-title-md text-on-surface font-bold">\\\${passingGrade}</span>
                        </td>`;
html = html.replace(oldColumns, newColumns);

// Update colspan in empty states
html = html.replace(/colspan="5"/g, 'colspan="6"');

fs.writeFileSync('history.html', html);
console.log('Columns updated');
