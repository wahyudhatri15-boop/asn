const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const mainContent = `
<!-- Page Title -->
<div class="mb-12 text-center md:text-left">
<h1 class="font-display text-display md:text-display text-glow mb-4 text-primary-container">Riwayat Belajar</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-body-md">Tinjau kembali perjalanan Anda menuju abdi negara sejati. Setiap kegagalan adalah pelajaran, setiap kemenangan adalah langkah pasti.</p>
</div>

<!-- Stats Grid -->
<div class="grid grid-cols-1 md:grid-cols-4 mx-auto max-w-4xl mb-8 gap-6 px-8">
  <!-- Win Rate Card -->
  <div class="glass-card rounded-xl border-primary/40 bg-surface-container-low/80 flex flex-col items-center justify-center text-center p-3"><span class="text-[10px] text-primary uppercase tracking-[0.2em] mb-1 font-black">Win Rate</span><div class="flex items-baseline gap-1"><span class="text-[24px] text-primary tracking-tighter font-black">82</span><span class="text-[12px] text-primary font-bold">%</span></div><div class="mt-2 w-12 h-1 bg-primary/20 rounded-full overflow-hidden border border-primary/30"><div class="h-full bg-primary w-[82%] shadow-[0_0_10px_#ff9500]"></div></div></div>
  <!-- TIU High Score -->
  <div class="glass-card rounded-xl border-primary/40 bg-surface-container-low/80 flex flex-col items-center justify-center text-center p-3"><span class="text-[10px] text-primary uppercase tracking-[0.2em] mb-1 font-black">TIU</span><div class="flex items-baseline gap-1"><span class="text-[24px] text-primary tracking-tighter font-black">145</span></div><div class="mt-1.5 flex items-center gap-1 text-primary"><span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">psychology</span><span class="text-[10px] font-bold">Intelegensia</span></div></div>
  <!-- TWK High Score -->
  <div class="glass-card rounded-xl border-primary/40 bg-surface-container-low/80 flex flex-col items-center justify-center text-center p-3"><span class="text-[10px] text-primary uppercase tracking-[0.2em] mb-1 font-black">TWK</span><div class="flex items-baseline gap-1"><span class="text-[24px] text-primary tracking-tighter font-black">138</span></div><div class="mt-1.5 flex items-center gap-1 text-primary"><span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">public</span><span class="text-[10px] font-bold">Kebangsaan</span></div></div>
  <!-- TKP High Score -->
  <div class="glass-card rounded-xl border-primary/40 bg-surface-container-low/80 flex flex-col items-center justify-center text-center p-3"><span class="text-[10px] text-primary uppercase tracking-[0.2em] mb-1 font-black">TKP</span><div class="flex items-baseline gap-1"><span class="text-[24px] text-primary tracking-tighter font-black">188</span></div><div class="mt-1.5 flex items-center gap-1 text-primary"><span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">groups</span><span class="text-[10px] font-bold">Karakteristik</span></div></div>
</div>

<!-- Filters -->
<div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
    <div id="filter-buttons" class="flex bg-surface-container-low rounded-full border border-primary/20 w-full md:w-auto p-1">
        <button class="px-4 py-1.5 rounded-full font-label-caps text-black bg-primary shadow-[0_0_15px_rgba(255,149,0,0.4)] text-[11px]">Semua Arena</button>
        <button class="px-4 py-1.5 rounded-full font-label-caps text-on-surface-variant hover:text-primary transition-colors text-[11px]">TIU</button>
        <button class="px-4 py-1.5 rounded-full font-label-caps text-on-surface-variant hover:text-primary transition-colors text-[11px]">TWK</button>
        <button class="px-4 py-1.5 rounded-full font-label-caps text-on-surface-variant hover:text-primary transition-colors text-[11px]">TKP</button>
    </div>
    
    <div class="flex items-center gap-2 w-full md:w-auto">
        <button id="clear-history-btn" class="px-4 py-2.5 bg-error/10 text-error rounded-full font-bold text-xs hover:bg-error/20 transition-all border border-error/30 uppercase tracking-widest" onclick="clearHistory()">Hapus Semua Riwayat</button>
        <div class="relative w-full md:w-64">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            <input class="w-full bg-surface-container-low border border-primary/30 rounded-full py-2.5 pl-11 pr-4 text-body-sm focus:outline-none focus:border-primary shadow-[inset_0_0_10px_rgba(255,149,0,0.05)] transition-all text-on-surface placeholder:text-on-surface-variant/50" placeholder="Cari tanggal atau arena..." type="text">
        </div>
    </div>
</div>

<!-- History Table / Cards -->
<div class="glass-card rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-primary/20">
    <table class="w-full text-left border-collapse">
        <thead class="bg-primary/5 border-b border-primary/20">
            <tr>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>
                <th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>
            </tr>
        </thead>
        <tbody id="history-table-body" class="divide-y divide-primary/10">
        </tbody>
    </table>
</div>
`;

const jsContent = `
<script>
    function renderHistoryTable(filter = 'SEMUA ARENA') {
        const tableBody = document.getElementById('history-table-body');
        let historyData = localStorage.getItem('userTryoutHistory');
        let history = historyData ? JSON.parse(historyData) : [];
        
        let html = '';
        if (history.length === 0) {
            html = '<tr><td colspan="5" class="px-8 py-10 text-center text-on-surface-variant">Belum ada riwayat belajar.</td></tr>';
        } else {
            let filteredHistory = history;
            if (filter !== 'SEMUA ARENA') {
                filteredHistory = history.filter(item => item.category.toUpperCase().includes(filter));
            }
            
            if (filteredHistory.length === 0) {
                html = '<tr><td colspan="5" class="px-8 py-10 text-center text-on-surface-variant">Tidak ada riwayat untuk kategori ini.</td></tr>';
            } else {
                filteredHistory.forEach(item => {
                    let icon = 'psychology';
                    if (item.category === 'TWK') icon = 'public';
                    if (item.category === 'TKP') icon = 'groups';
                    
                    let passStatusHtml = item.passed 
                        ? \`<span class="font-label-caps flex items-center gap-2 text-green-400 font-black"><span class="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>LULUS</span>\`
                        : \`<span class="font-label-caps flex items-center gap-2 text-error font-black"><span class="w-2.5 h-2.5 rounded-full bg-error shadow-[0_0_8px_#ef4444] animate-pulse"></span>GAGAL</span>\`;
                        
                    let passingGrade = item.category === 'TIU' ? 80 : (item.category === 'TWK' ? 65 : 166);
                    
                    html += \`<tr class="hover:bg-primary/5 transition-colors group">
                        <td class="px-8 py-6">
                            <div class="flex flex-col">
                                <span class="font-title-md text-on-surface">\${item.date}</span>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-lg bg-primary/10 border border-primary flex items-center justify-center">
                                    <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">\${icon}</span>
                                </div>
                                <span class="font-body-sm font-bold text-on-surface">\${item.category}</span>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <div class="flex flex-col">
                                <span class="text-headline-lg-mobile text-white font-black ">\${item.score}<span class="text-body-sm text-white/70 ml-1 font-bold">/ \${item.maxScore}</span></span>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <span class="font-title-md text-on-surface font-bold">\${passingGrade}</span>
                        </td>
                        <td class="px-8 py-6">
                            \${passStatusHtml}
                        </td>
                    </tr>\`;
                });
            }
        }
        tableBody.innerHTML = html;
    }

    function clearHistory() {
        if(confirm("Apakah Anda yakin ingin menghapus semua riwayat belajar?")) {
            localStorage.removeItem('userTryoutHistory');
            renderHistoryTable(window.currentHistoryFilter || 'SEMUA ARENA');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.currentHistoryFilter = 'SEMUA ARENA';
        renderHistoryTable();

        const filterContainer = document.getElementById('filter-buttons');
        if (!filterContainer) return;
        const buttons = filterContainer.querySelectorAll('button');

        const activeClasses = ['text-black', 'bg-primary', 'shadow-[0_0_15px_rgba(255,149,0,0.4)]'];
        const inactiveClasses = ['text-on-surface-variant', 'hover:text-primary', 'transition-colors'];

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => {
                    btn.classList.remove(...activeClasses);
                    btn.classList.add(...inactiveClasses);
                });
                button.classList.remove(...inactiveClasses);
                button.classList.add(...activeClasses);

                window.currentHistoryFilter = button.textContent.trim().toUpperCase();
                renderHistoryTable(window.currentHistoryFilter);
            });
        });
    });
</script>
`;

let historyHtml = indexHtml.replace(
    /(<main[^>]*>)[\s\S]*?(<\/main>)/,
    `$1\n${mainContent}\n$2`
);

// Update active states
historyHtml = historyHtml.replace(
    /<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Belajar<\/a>/g,
    '<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="index.html">Belajar</a>'
);
historyHtml = historyHtml.replace(
    /<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white\/5 transition-all duration-300 px-3 py-2 rounded-lg" href="history\.html">Riwayat<\/a>/g,
    '<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Riwayat</a>'
);
historyHtml = historyHtml.replace(
    /<a class="flex flex-col items-center justify-center w-16 text-primary" href="#">\s*<span[^>]*>book<\/span>\s*<span[^>]*>Belajar<\/span>\s*<\/a>/,
    '<a class="flex flex-col items-center justify-center w-16 text-on-surface-variant hover:text-white" href="index.html">\\n<span class="material-symbols-outlined" style="font-variation-settings: \\\'FILL\\\' 1;">book</span>\\n<span class="text-[10px] font-bold mt-1 uppercase tracking-tighter">Belajar</span>\\n</a>'
);

historyHtml = historyHtml.replace('</body>', jsContent + '\n</body>');

fs.writeFileSync('history.html', historyHtml);
console.log("Successfully rebuilt history.html from index.html");
