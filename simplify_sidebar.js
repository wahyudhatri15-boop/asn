const fs = require('fs');

let content = fs.readFileSync('database-soal.html', 'utf8');

const styleRegex = /<style id="sidebar-styles">[\s\S]*?<\/style>/;
const newStyle = `
<style id="sidebar-styles">
  #sidebar:hover {
      width: 14rem !important; /* hover:w-56 */
  }
  #sidebar:hover .sidebar-text {
      opacity: 1 !important;
      width: auto !important;
      margin-left: 0.75rem;
  }
  #sidebar:hover .sidebar-item {
      justify-content: flex-start !important;
      padding-left: 1rem !important;
      padding-right: 1.5rem !important;
  }
  .sidebar-collapsed-main {
      margin-left: 3.5rem !important; /* ml-14 */
  }
</style>
`;

const asideRegex = /<aside id="sidebar"[\s\S]*?<\/aside>/;
const newAside = `
<aside id="sidebar" class="fixed left-0 top-0 h-screen bg-surface-container border-r border-white/5 backdrop-blur-md hidden md:flex flex-col justify-center pt-24 pb-6 z-40 w-14 transition-all duration-300 overflow-x-hidden shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
    <nav class="flex-1 flex flex-col justify-center px-2 gap-3 mt-12">
        <a class="sidebar-item h-10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-lg transition-all" href="#" title="TIU Arena">
            <span class="material-symbols-outlined flex-shrink-0" style="font-size: 20px;">calculate</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden text-sm">TIU Arena</span>
        </a>
        <a class="sidebar-item h-10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-lg transition-all" href="#" title="TWK Arena">
            <span class="material-symbols-outlined flex-shrink-0" style="font-size: 20px;">history_edu</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden text-sm">TWK Arena</span>
        </a>
        <a class="sidebar-item h-10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-lg transition-all" href="#" title="TKP Arena">
            <span class="material-symbols-outlined flex-shrink-0" style="font-size: 20px;">psychology</span>
            <span class="font-medium whitespace-nowrap sidebar-text opacity-0 w-0 transition-all duration-300 overflow-hidden text-sm">TKP Arena</span>
        </a>
    </nav>
</aside>
`;

// Remove the Javascript toggle function
const scriptRegex = /<script>\s*function toggleSidebar\(\)[\s\S]*?<\/script>/;

content = content.replace(styleRegex, newStyle.trim());
content = content.replace(asideRegex, newAside.trim());
content = content.replace(scriptRegex, '');

// Update main margin
content = content.replace('md:ml-16', 'md:ml-14');

fs.writeFileSync('database-soal.html', content, 'utf8');
console.log("Successfully simplified sidebar.");
