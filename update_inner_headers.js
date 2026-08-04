const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'login.html' && f !== 'database-soal.html');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it's a level page (contains <header> instead of <nav> for top bar)
    const isLevelPage = file.includes('-level-');
    
    if (isLevelPage) {
        // Find title
        let titleMatch = content.match(/<span class="font-display text-on-surface font-medium tracking-tight"[^>]*>([^<]+)<\/span>/);
        let title = titleMatch ? titleMatch[1] : "Level";

        // Build responsive header for level
        const newHeader = '<header class="fixed top-0 w-full bg-surface/60 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.05)] flex justify-between items-center px-4 md:px-6 py-3 md:py-4 z-50 border-b border-outline-variant/20">\n' +
'<div class="flex items-center gap-2 md:gap-4">\n' +
'<a href="index.html" class="font-display text-primary tracking-tighter hover:opacity-80 transition-opacity text-base md:text-2xl font-bold whitespace-nowrap">COC</a>\n' +
'<div class="h-4 md:h-6 w-[1px] bg-outline-variant mx-1 md:mx-2"></div>\n' +
'<span class="font-display text-on-surface font-medium tracking-tight text-sm md:text-xl truncate max-w-[120px] md:max-w-none">' + title + '</span>\n' +
'</div>\n' +
'<div class="flex items-center gap-2 md:gap-4">\n' +
'<div class="flex items-center gap-1 md:gap-2 text-primary" title="Total Streak Points">\n' +
'<span id="header-streak-points" class="font-display font-bold text-base md:text-xl">0</span>\n' +
'<span class="material-symbols-outlined text-lg md:text-2xl" style="font-variation-settings: \'FILL\' 1;">local_fire_department</span>\n' +
'</div>\n' +
'<div class="h-4 md:h-6 w-[1px] bg-outline-variant"></div>\n' +
'<div class="auth-profile-pic cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/30 flex items-center justify-center overflow-hidden" onclick="localStorage.removeItem(\'isLoggedIn\'); window.location.reload();" title="Logout">\n' +
'<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBloqCsv54Uav8Y3ystavbPcsPqKqI4qf7e2xLSccxgOi6H_kKHFLWNGlB4flIfiAY9PhGgn7CsO1cmv6Noj_3Or-qgLozPOe_Mj55ydWSDmo4K8Pn6uAgqQrURcm3OB5l-9ub7Sh_ijfUBWrX_0f1wymQ9PdaZmP-G4byIq_Ws58depN-cz6si_rHtfL_Nn7d790DWhi-drmc94MdnobYyYcgNKtT4RX-JDEIbzunop7NvbMDnO1Wj">\n' +
'</div>\n' +
'</div>\n' +
'</header>';

        const headerRegex = /<header class="fixed top-0 w-full bg-surface\/60[\s\S]*?<\/header>/;
        if (headerRegex.test(content)) {
            content = content.replace(headerRegex, newHeader);
            fs.writeFileSync(file, content);
            console.log('Updated ' + file + ' with responsive level header (Title: ' + title + ')');
        } else {
            console.log('Could not find header in ' + file);
        }
    }
}
