const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract nav and header
const headerRegex = /(<!-- TopNavBar -->[\s\S]*?<\/header>)/;
const headerMatch = indexHtml.match(headerRegex);
const headerContent = headerMatch ? headerMatch[1] : '';

const scriptContent = `
<script>
    function updateUIState() {
        let pts = parseInt(localStorage.getItem('mathBlitzStreakPoints')) || 0;
        let el = document.getElementById('header-streak-points');
        if (el) el.innerText = pts;
        
        let elMobile = document.getElementById('mobile-header-streak-points');
        if (elMobile) elMobile.innerText = pts;

        let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        document.querySelectorAll('.auth-login-btn').forEach(btn => {
            btn.style.display = isLoggedIn ? 'none' : 'block';
        });
        document.querySelectorAll('.auth-profile-pic').forEach(pic => {
            pic.style.display = isLoggedIn ? 'block' : 'none';
        });
        
        // Hide/Show Streak Numbers based on login status
        let streakDesktop = document.getElementById('header-streak-points');
        if (streakDesktop) streakDesktop.style.display = isLoggedIn ? '' : 'none';
        
        let streakMobile = document.getElementById('mobile-header-streak-points');
        if (streakMobile) streakMobile.style.display = isLoggedIn ? '' : 'none';
    }
    document.addEventListener('DOMContentLoaded', updateUIState);
</script>
`;

let userCode = `<!DOCTYPE html><html class="dark" lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=block" rel="stylesheet"><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script><script id="tailwind-config">try{
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "primary": "#ff9500",
                      "on-primary": "#000000",
                      "background": "#131315",
                      "surface": "#131315",
                      "on-surface": "#ffffff",
                      "on-surface-variant": "#a1a1aa",
                      "outline": "#3f3f46",
                      "outline-variant": "#27272a",
                      "surface-container": "#1c1c1e",
                      "surface-container-high": "#2c2c2e",
                      "surface-container-low": "#18181b",
                      "error": "#ff453a",
                      "success": "#10b981"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "section-gap": "64px",
                      "unit": "8px",
                      "gutter": "16px",
                      "container-margin": "24px"
              }
            },
          },
        }
    }catch(_e){}</script></head><body class="selection:bg-primary/30 selection:text-white bg-background text-on-surface">

<nav class="fixed top-0 w-full z-[200] flex justify-between items-center px-container-padding-desktop py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.2)] hidden md:flex">
<div class="flex items-center gap-4">
<span class="font-display text-display text-primary tracking-tighter" style="font-size: 24px;">Clash Of Civil Servants</span>
</div>
<div class="hidden md:flex items-center gap-8">
<a class="font-label-caps text-label-caps text-primary font-semibold hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">Arena</a>

<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-lg" href="#">History</a>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-white/5 transition-all duration-300 active:scale-95">
<span class="material-symbols-outlined text-primary">local_fire_department</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-white/10">
<img class="w-full h-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoXFUAQQhhoalc5U-9gm5xK9QzHm11BFZwkhJWGsTrvLlOMUI4McHWbycbyzEPJ-1-44E-oFonyeqO6XNXvcYOwQ9d21toKj5c5JOytHEG8ZB5fISsGeTdVzzoEarvNGvTrnH17XysWCrk9ciBDn7Ye3lTxId2Buzhc7I51FvTBH5JwQFyZAQT1p5aJuy29MDHu85XqYR7G08OcRAirKnVrSVL6nT2k3DNlES1U8TzZansPwY0FeYo">
</div>
</div>
</nav>

<aside class="fixed left-0 top-0 h-screen bg-surface-container border-r border-white/5 backdrop-blur-md hidden md:flex flex-col p-4 pt-24 z-40 w-20"><div class="flex flex-col items-center gap-8 mb-10">
        <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 hover:scale-105 transition-transform cursor-pointer">
            <span class="material-symbols-outlined text-primary" data-icon="database">database</span>
        </div>
    </div>
    <nav class="flex-1 flex flex-col items-center gap-4">
        <a class="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all group" href="index.html" title="Dashboard">
            <span class="material-symbols-outlined group-hover:text-primary" data-icon="dashboard">dashboard</span>
        </a>
        <a class="w-12 h-12 flex items-center justify-center bg-primary text-black rounded-xl transition-all shadow-[0_0_15px_rgba(255,149,0,0.2)]" href="#" title="TIU Arena">
            <span class="material-symbols-outlined" data-icon="calculate">calculate</span>
        </a>
        <a class="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all group" href="#" title="TWK Arena">
            <span class="material-symbols-outlined group-hover:text-primary" data-icon="history_edu">history_edu</span>
        </a>
        <a class="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-white rounded-xl transition-all group" href="#" title="TKP Arena">
            <span class="material-symbols-outlined group-hover:text-primary" data-icon="psychology">psychology</span>
        </a>
    </nav>
    <div class="mt-auto flex flex-col items-center gap-4 pt-6 border-t border-white/5">
        
        <a class="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-white transition-all" href="#" title="Support">
            <span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
        </a>
        <a class="w-12 h-12 flex items-center justify-center text-error/80 hover:text-error transition-all" href="#" title="Sign Out">
            <span class="material-symbols-outlined" data-icon="logout">logout</span>
        </a>
    </div></aside>

<main class="pt-24 px-container-margin min-h-screen pb-24 md:ml-20">
    <section class="max-w-4xl mx-auto space-y-8">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2">
                <button class="flex-none px-4 py-1.5 rounded-full bg-primary text-black font-bold text-xs shadow-[0_0_10px_rgba(255,149,0,0.3)] transition-all active:scale-95">Math Blitz</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all text-xs font-medium">Number Chain</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all text-xs font-medium">Syllogism Scan</button>
                <button class="flex-none px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all text-xs font-medium">Logic Matrix</button>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Total Nodes: 12,842</span>
            </div>
        </div>

        <!-- Question 1 -->
        <div class="bg-surface-container border border-white/5 rounded-3xl shadow-2xl overflow-hidden group hover:border-primary/20 transition-all">
            <div class="p-6 md:p-8 space-y-6">
                <div class="flex justify-between items-start">
                    <div class="flex flex-wrap items-center gap-3">
                        
                        
                        <div class="flex items-center gap-2">
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 1</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 2</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-primary text-black shadow-[0_0_8px_rgba(255,149,0,0.2)]">Lvl 3</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 4</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 5</button>
</div>
                    </div>
                    <div class="flex items-center gap-4">
                        
                        <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" data-icon="more_vert">more_vert</button>
                    </div>
                </div>

                <h2 class="text-xl md:text-2xl font-bold text-on-surface leading-tight">If A can finish a task in 12 days and B in 15 days, how long will they take together?</h2>

                <div class="grid gap-3">
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-success/10 border border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all">
                        <span class="material-symbols-outlined text-success" data-icon="check_circle">check_circle</span>
                        <span class="text-sm font-bold text-success">A) 6 2/3 days</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">B) 7 days</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">C) 8 1/4 days</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">D) 5 1/2 days</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">E) 9 days</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Question 2 -->
        <div class="bg-surface-container border border-white/5 rounded-3xl shadow-2xl overflow-hidden group hover:border-primary/20 transition-all">
            <div class="p-6 md:p-8 space-y-6">
                <div class="flex justify-between items-start">
                    <div class="flex flex-wrap items-center gap-3">
                        
                        
                        <div class="flex items-center gap-2">
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 1</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 2</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 3</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 4</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-primary text-black shadow-[0_0_8px_rgba(255,149,0,0.2)]">Lvl 5</button>
</div>
                    </div>
                    <div class="flex items-center gap-4">
                        
                        <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" data-icon="more_vert">more_vert</button>
                    </div>
                </div>

                <h2 class="text-xl md:text-2xl font-bold text-on-surface leading-tight">How many hidden faces are touching other cubes in a 3x3x3 stack?</h2>

                <div class="grid gap-3">
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">A) 27</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">B) 48</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">C) 52</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-success/10 border border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all">
                        <span class="material-symbols-outlined text-success" data-icon="check_circle">check_circle</span>
                        <span class="text-sm font-bold text-success">D) 54 (Correct)</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">E) 60</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Question 3 -->
        <div class="bg-surface-container border border-white/5 rounded-3xl shadow-2xl overflow-hidden group hover:border-primary/20 transition-all">
            <div class="p-6 md:p-8 space-y-6">
                <div class="flex justify-between items-start">
                    <div class="flex flex-wrap items-center gap-3">
                        
                        
                        <div class="flex items-center gap-2">
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 1</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-primary text-black shadow-[0_0_8px_rgba(255,149,0,0.2)]">Lvl 2</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 3</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 4</button>
  <button class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all bg-white/5 border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary">Lvl 5</button>
</div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            
                            
                        </div>
                        <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" data-icon="more_vert">more_vert</button>
                    </div>
                </div>

                <h2 class="text-xl md:text-2xl font-bold text-on-surface leading-tight">Complete the sequence: 2, 4, 12, 48, [?]</h2>

                <div class="grid gap-3">
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">A) 120</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-success/10 border border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all">
                        <span class="material-symbols-outlined text-success" data-icon="check_circle">check_circle</span>
                        <span class="text-sm font-bold text-success">B) 240 (Correct)</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">C) 192</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">D) 96</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                        <span class="text-sm font-medium text-on-surface-variant">E) 480</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between pt-8 border-t border-white/5">
            <p class="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">Showing <span class="text-white">3</span> of <span class="text-white">12,842</span> nodes</p>
            <div class="flex gap-1.5">
                <button class="w-10 h-10 flex items-center justify-center border border-white/5 rounded-xl hover:bg-white/5 text-on-surface-variant transition-colors disabled:opacity-20" disabled="">
                    <span class="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
                </button>
                <button class="w-10 h-10 flex items-center justify-center bg-primary text-black rounded-xl text-sm font-bold shadow-[0_0_8px_rgba(255,149,0,0.2)]">1</button>
                </div></div></section></main><button class="fixed bottom-8 right-8 z-[200] flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,149,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 group">
  <span class="material-symbols-outlined">add</span>
  <span class="">Tambah Soal</span>
</button></body></html>`;

// Replace nav with headerContent
userCode = userCode.replace(/<nav class="fixed top-0[\s\S]*?<\/nav>/, headerContent);

// Append script content
userCode = userCode.replace(/<\/body>/, scriptContent + '\n</body>');

fs.writeFileSync('database-soal.html', userCode, 'utf8');
console.log("Successfully created database-soal.html");
