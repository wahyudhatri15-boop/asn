const fs = require('fs');

const files = ['index.html', 'math-blitz.html', 'math-blitz-level-1.html', 'math-blitz-level-2.html', 'math-blitz-level-3.html'];

const scriptReplacement = `
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
    }
    document.addEventListener('DOMContentLoaded', updateUIState);
</script>
</body>`;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // Replace script
    if (content.includes('function updateHeaderStreakPoints()')) {
        content = content.replace(/<script>\s*function updateHeaderStreakPoints\(\)[\s\S]*?<\/body>/, scriptReplacement);
    } else if (content.includes('updateUIState()')) {
        // already has the new script, skip script update
    }

    // Replace Desktop & Mobile Profile Pics
    // Match any div that is rounded-full and contains an img with User profile/avatar
    content = content.replace(/(<div class="[^"]*rounded-full[^"]*"[^>]*>)\s*(<img[^>]*alt="User [^"]*"[^>]*>)\s*<\/div>/g, 
    (match, divOpen, imgTag) => {
        // If it's already auth-profile-pic, don't replace
        if (divOpen.includes('auth-profile-pic')) return match;

        let newDivOpen = divOpen.replace('class="', 'class="auth-profile-pic cursor-pointer ').replace('">', '" onclick="localStorage.removeItem(\'isLoggedIn\'); window.location.reload();" style="display: none;" title="Logout">');
        
        let loginBtnClass = "auth-login-btn bg-primary text-on-primary-container font-label-md font-bold px-4 py-2 rounded-lg hover:bg-surface-tint transition-all whitespace-nowrap";
        
        // Mobile uses smaller button
        if (divOpen.includes('h-8') || divOpen.includes('w-8')) {
             loginBtnClass = "auth-login-btn bg-primary text-on-primary-container text-[12px] font-bold px-3 py-1.5 rounded-lg hover:bg-surface-tint transition-all whitespace-nowrap";
        }

        return `<a href="login.html" class="${loginBtnClass}" style="display: none;">Log In</a>\n${newDivOpen}\n${imgTag}\n</div>`;
    });

    fs.writeFileSync(f, content);
});

console.log('Auth toggle added to all files.');
