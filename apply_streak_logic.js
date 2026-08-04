const fs = require('fs');

const replacementHeaderMenu = `<div class="flex items-center gap-2 text-primary" title="Total Streak Points">
<span id="header-streak-points" class="font-display font-bold text-xl">0</span>
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
</div>`;

const globalScript = `
<script>
    function updateHeaderStreakPoints() {
        let pts = parseInt(localStorage.getItem('mathBlitzStreakPoints')) || 0;
        let el = document.getElementById('header-streak-points');
        if (el) el.innerText = pts;
    }
    document.addEventListener('DOMContentLoaded', updateHeaderStreakPoints);
</script>
</body>`;

function processMenu() {
    let content = fs.readFileSync('math-blitz.html', 'utf8');
    
    // Replace menu fire icon
    content = content.replace(/<button class="p-2 rounded-full hover:bg-white\/5 transition-all duration-300 active:scale-95">[\s\S]*?<span class="material-symbols-outlined text-primary">local_fire_department<\/span>[\s\S]*?<\/button>/, replacementHeaderMenu);
    
    // Add script
    if (!content.includes('updateHeaderStreakPoints')) {
        content = content.replace(/<\/body>/, globalScript);
    }
    
    fs.writeFileSync('math-blitz.html', content);
}

function processLevel(level) {
    let content = fs.readFileSync(`math-blitz-level-${level}.html`, 'utf8');
    
    // Replace header
    content = content.replace(/<button class="flex items-center gap-2 hover:text-primary transition-all duration-300 group text-primary">[\s\S]*?<span class="material-symbols-outlined text-xl">local_fire_department<\/span>[\s\S]*?<span class="font-label-md">12 Streak<\/span>[\s\S]*?<\/button>/, replacementHeaderMenu);
    
    // Add script
    if (!content.includes('updateHeaderStreakPoints')) {
        content = content.replace(/<\/body>/, globalScript);
    }
    
    // Add calculation to endGame
    if (!content.includes('STREAK POINTS CALCULATION')) {
        const calcBlock = `
        // --- STREAK POINTS CALCULATION ---
        let addedPoints = 0;
        if (accuracy >= 70) {
            let multiplier = 1.0 + (${level} - 1) * 0.5;
            addedPoints = Math.round(accuracy * multiplier);
            let currentPts = parseInt(localStorage.getItem('mathBlitzStreakPoints')) || 0;
            localStorage.setItem('mathBlitzStreakPoints', currentPts + addedPoints);
        }
        if (typeof updateHeaderStreakPoints === 'function') updateHeaderStreakPoints();
        // ---------------------------------
`;
        // Inject after accuracy declaration
        content = content.replace(/(const accuracy = Math\.round\([\s\S]*?\* 100\);)/, `$1\n${calcBlock}`);
    }

    fs.writeFileSync(`math-blitz-level-${level}.html`, content);
}

processMenu();
[1, 2, 3].forEach(l => processLevel(l));
console.log('All files updated');
