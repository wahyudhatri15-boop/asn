const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

// Add relative class to sidebar-item
content = content.replace(/class="sidebar-item/g, 'class="sidebar-item relative');

const indicatorScript = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            sidebarItems.forEach(el => {
                el.classList.remove('bg-white/10', 'text-primary');
                el.classList.add('text-on-surface-variant');
                const indicator = el.querySelector('.active-indicator');
                if(indicator) indicator.remove();
            });
            
            item.classList.add('bg-white/10', 'text-primary');
            item.classList.remove('text-on-surface-variant');
            
            item.insertAdjacentHTML('afterbegin', '<div class="active-indicator absolute left-0 w-1 h-5 bg-primary rounded-r-full transition-all duration-300"></div>');
        });
    });
    
    // Set first item active by default
    if(sidebarItems.length > 0) {
        sidebarItems[0].click();
    }
});
</script>
`;

content = content.replace('</body>', indicatorScript + '\n</body>');

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully added active indicator script.");
