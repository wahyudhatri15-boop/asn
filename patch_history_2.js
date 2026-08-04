const fs = require('fs');
let code = fs.readFileSync('history.html', 'utf-8');

// 1. Replace Headers
code = code.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal Mengerjakan</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>'
);
code = code.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Arena Battle</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>'
);
code = code.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor Akhir</th>\\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>\\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>\\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>'
);
code = code.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor Akhir</th>\\r\\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>\\r\\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>\\r\\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>'
);

// 2. Replace time spans with icon
const timeRegex = /<span class="text-label-tiny text-primary mt-1 font-bold">(\\d{2}):(\\d{2}) WIB<\/span>/g;
code = code.replace(timeRegex, (match, hh, mm) => {
    let hour = parseInt(hh, 10);
    let icon = 'light_mode'; // Pagi
    if (hour >= 11 && hour < 15) {
        icon = 'partly_cloudy_day'; // Siang
    } else if (hour >= 15 && hour < 18) {
        icon = 'brightness_high'; // Sore
    } else if (hour >= 18 || hour < 4) {
        icon = 'dark_mode'; // Malam
    }
    
    return `<div class="flex items-center gap-1 text-label-tiny text-primary mt-1 font-bold">
<span class="material-symbols-outlined text-[14px]">\${icon}</span>
<span>\${hh}:\${mm} WIB</span>
</div>`;
});

// 3. Add batas lulus column
// Since the rows are well structured, we can match the start of `Status Kelulusan` column, which is:
// `<td class="px-8 py-6">\n<span class="font-label-caps flex items-center gap-2 text-green-400 font-black">` or similar text-error ones
// Or better, match `<tr>` blocks, parse them, modify them.
let rowRegex = /<tr class="hover:bg-primary\\/5 transition-colors group">[\\s\\S]*?<\\/tr>/g;
code = code.replace(rowRegex, (rowMatch) => {
    let currentTestType = '';
    let batasLulus = 80;
    
    if (rowMatch.includes('TIU - Intelegensia')) {
        currentTestType = 'TIU';
        batasLulus = 80;
    } else if (rowMatch.includes('TWK - Kebangsaan')) {
        currentTestType = 'TWK';
        batasLulus = 65;
    } else if (rowMatch.includes('TKP - Karakteristik')) {
        currentTestType = 'TKP';
        batasLulus = 166;
    }
    
    let batasLulusCol = `\\n<td class="px-8 py-6">\\n<span class="font-title-md text-on-surface font-bold">\${batasLulus}</span>\\n</td>\\n`;
    
    // Inject the batas lulus column before the status kelulusan column.
    // The status kelulusan column starts with <td class="px-8 py-6">\n<span class="font-label-caps flex items-center gap-2 text-green-400 font-black"> or similar.
    // However, some rows are minified: <td class="px-8 py-6"><span class="font-label-caps flex items-center gap-2 text-green-400 font-black">
    // So we replace the match of `<td class="px-8 py-6">\\n?<span class="font-label-caps flex items-center gap-2 text-`
    
    let statusRegex = /<td class="px-8 py-6">\\r?\\n?\\s*<span class="font-label-caps flex items-center gap-2 text-(green-400|error)/;
    
    return rowMatch.replace(statusRegex, (match) => {
        return batasLulusCol + match;
    });
});

fs.writeFileSync('history.html', code);
console.log('done');
