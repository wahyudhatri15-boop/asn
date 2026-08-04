const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// 1. Remove hardcoded rows
const tbodyRegex = /<tbody id="history-table-body" class="divide-y divide-primary\/10">[\s\S]*?<\/tbody>/;
const newTbody = '<tbody id="history-table-body" class="divide-y divide-primary/10"></tbody>';
html = html.replace(tbodyRegex, newTbody);

// 2. Add 'Hapus Semua Riwayat' button
const filterRegex = /<div class="relative w-full md:w-64">/;
const newFilterAndBtn = `<div class="flex items-center gap-2 w-full md:w-auto">
<button id="clear-history-btn" class="px-4 py-2.5 bg-error/10 text-error rounded-full font-bold text-xs hover:bg-error/20 transition-all border border-error/30 uppercase tracking-widest" onclick="clearHistory()">Hapus Semua Riwayat</button>
<div class="relative w-full md:w-64">`;
html = html.replace(filterRegex, newFilterAndBtn);

// 3. Replace the old script with dynamic loading logic
const scriptRegex = /<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded', \(\) => \{[\s\S]*?const filterContainer[\s\S]*?<\/script>/;

const newScript = `<script>
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
                        
                    // Ambang batas (passing grade) - you can hardcode or estimate if not saved
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
</script>`;

html = html.replace(scriptRegex, newScript);
fs.writeFileSync('history.html', html);
console.log('History logic updated.');
