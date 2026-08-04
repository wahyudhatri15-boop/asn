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
        
        let elMobile = document.getElementById('mobile-header-streak-points');
        if (elMobile) elMobile.innerText = pts;
    }
    document.addEventListener('DOMContentLoaded', updateHeaderStreakPoints);
</script>
</body>`;

let content = fs.readFileSync('index.html', 'utf8');

// Replace desktop menu fire icon
content = content.replace(/<button class="p-2 rounded-full hover:bg-white\/5 transition-all duration-300 active:scale-95">\s*<span class="material-symbols-outlined text-primary">local_fire_department<\/span>\s*<\/button>/, replacementHeaderMenu);

// Add mobile fire icon (this injects the flex container right before the profile picture)
let mobileHeader = `<div class="flex items-center gap-2 text-primary mr-3" title="Total Streak Points">
<span id="mobile-header-streak-points" class="font-display font-bold text-lg">0</span>
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
</div>
<div class="h-8 w-8 rounded-full`;

// Only replace if not already replaced
if (!content.includes('mobile-header-streak-points')) {
    content = content.replace(/<div class="h-8 w-8 rounded-full/, mobileHeader);
}

// Add script
if (!content.includes('updateHeaderStreakPoints')) {
    content = content.replace(/<\/body>/, globalScript);
} else {
    // If we need to replace existing script, let's just make sure mobile is covered. 
    // We can run a regex replace just in case.
    content = content.replace(/<script>\s*function updateHeaderStreakPoints\(\)[\s\S]*?<\/body>/, globalScript);
}

fs.writeFileSync('index.html', content);
console.log('index.html updated successfully.');
