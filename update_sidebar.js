const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

const oldAsideRegex = /<aside[\s\S]*?<\/aside>/;
const newAside = `
<style id="sidebar-styles">
  .sidebar-expanded {
      width: 16rem !important; /* w-64 */
  }
  .sidebar-expanded .sidebar-text {
      opacity: 1 !important;
      width: auto !important;
  }
  .sidebar-expanded .sidebar-item {
      justify-content: flex-start !important;
      padding-left: 1rem !important;
      padding-right: 1.5rem !important;
  }
  .sidebar-collapsed-main {
      margin-left: 4rem !important; /* ml-16 */
  }
  .sidebar-expanded-main {
      margin-left: 16rem !important; /* ml-64 */
  }
</style>
<aside id="sidebar" class="fixed left-0 top-0 h-screen bg-surface-container border-r border-white/5 backdrop-blur-md hidden md:flex flex-col pt-24 pb-6 z-40 w-16 transition-all duration-300 overflow-x-hidden">
    <div class="px-2 mb-6 flex justify-center">
        <button onclick="toggleSidebar()" class="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all">
            <span class="material-symbols-outlined" id="sidebar-toggle-icon">menu</span>
        </button>
    </div>
    <div class="flex flex-col px-2 gap-8 mb-8">
        <div class="sidebar-item h-12 flex items-center justify-center gap-4 bg-primary/20 rounded-xl border border-primary/30 cursor-pointer transition-all">
            <span class="material-symbols-outlined text-primary flex-shrink-0" data-icon="database">database</span>
            <span class="font-bold text-primary whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">Database Soal</span>
        </div>
    </div>
    <nav class="flex-1 flex flex-col px-2 gap-2">
        <a class="sidebar-item h-12 flex items-center justify-center gap-4 text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all" href="index.html" title="Dashboard">
            <span class="material-symbols-outlined flex-shrink-0">dashboard</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">Dashboard</span>
        </a>
        <a class="sidebar-item h-12 flex items-center justify-center gap-4 bg-primary text-black rounded-xl transition-all shadow-[0_0_15px_rgba(255,149,0,0.2)]" href="#" title="TIU Arena">
            <span class="material-symbols-outlined flex-shrink-0">calculate</span>
            <span class="font-bold whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">TIU Arena</span>
        </a>
        <a class="sidebar-item h-12 flex items-center justify-center gap-4 text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all" href="#" title="TWK Arena">
            <span class="material-symbols-outlined flex-shrink-0">history_edu</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">TWK Arena</span>
        </a>
        <a class="sidebar-item h-12 flex items-center justify-center gap-4 text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all" href="#" title="TKP Arena">
            <span class="material-symbols-outlined flex-shrink-0">psychology</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">TKP Arena</span>
        </a>
    </nav>
    <div class="mt-auto flex flex-col px-2 gap-2 pt-6 border-t border-white/5">
        <a class="sidebar-item h-12 flex items-center justify-center gap-4 text-on-surface-variant hover:text-white transition-all" href="#" title="Support">
            <span class="material-symbols-outlined flex-shrink-0">help_outline</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">Bantuan</span>
        </a>
        <a class="sidebar-item h-12 flex items-center justify-center gap-4 text-error/80 hover:text-error transition-all" href="#" title="Sign Out">
            <span class="material-symbols-outlined flex-shrink-0">logout</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden">Keluar</span>
        </a>
    </div>
</aside>
`;

content = content.replace(oldAsideRegex, newAside);

// Main content adjustment
content = content.replace('<main class="pt-24 px-container-margin min-h-screen pb-24 md:ml-20">', '<main id="main-content" class="pt-24 px-container-margin min-h-screen pb-24 md:ml-16 sidebar-collapsed-main transition-all duration-300">');

// Script injection
const toggleScript = `
<script>
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main-content');
    const icon = document.getElementById('sidebar-toggle-icon');
    
    if (sidebar.classList.contains('sidebar-expanded')) {
        sidebar.classList.remove('sidebar-expanded');
        if(main) {
            main.classList.remove('sidebar-expanded-main');
            main.classList.add('sidebar-collapsed-main');
        }
        icon.innerText = 'menu';
    } else {
        sidebar.classList.add('sidebar-expanded');
        if(main) {
            main.classList.remove('sidebar-collapsed-main');
            main.classList.add('sidebar-expanded-main');
        }
        icon.innerText = 'chevron_left';
    }
}
</script>
`;
content = content.replace('</body>', toggleScript + '\n</body>');

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully updated sidebar layout.");
