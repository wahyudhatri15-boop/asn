const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'history.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// 1. Add id to filter container
content = content.replace(
    /<div class="flex bg-surface-container-low rounded-full border border-primary\/20 w-full md:w-auto p-1">/,
    '<div id="filter-buttons" class="flex bg-surface-container-low rounded-full border border-primary/20 w-full md:w-auto p-1">'
);

// 2. Add id to table body
content = content.replace(
    /<tbody class="divide-y divide-primary\/10">/,
    '<tbody id="history-table-body" class="divide-y divide-primary/10">'
);

// 3. Add JS script before </body>
const scriptToAdd = `
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const filterContainer = document.getElementById('filter-buttons');
        if (!filterContainer) return;
        const buttons = filterContainer.querySelectorAll('button');
        const tableBody = document.getElementById('history-table-body');
        const rows = tableBody ? tableBody.querySelectorAll('tr') : [];

        const activeClasses = ['text-black', 'bg-primary', 'shadow-[0_0_15px_rgba(255,149,0,0.4)]'];
        const inactiveClasses = ['text-on-surface-variant', 'hover:text-primary', 'transition-colors'];

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active classes from all and add inactive
                buttons.forEach(btn => {
                    btn.classList.remove(...activeClasses);
                    btn.classList.add(...inactiveClasses);
                });
                
                // Add active to clicked
                button.classList.remove(...inactiveClasses);
                button.classList.add(...activeClasses);

                // Filter rows
                const filterText = button.textContent.trim().toUpperCase();
                
                rows.forEach(row => {
                    if (filterText === 'SEMUA ARENA') {
                        row.style.display = '';
                    } else {
                        const arenaCell = row.querySelector('td:nth-child(2)');
                        if (arenaCell) {
                            const text = arenaCell.textContent.toUpperCase();
                            if (text.includes(filterText)) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        }
                    }
                });
            });
        });
    });
</script>
`;

content = content.replace('</body>', scriptToAdd + '</body>');

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Added filter logic to history.html");
