const fs = require('fs');

const files = ['index.html', 'math-blitz.html', 'math-blitz-level-1.html', 'math-blitz-level-2.html', 'math-blitz-level-3.html'];

const oldScriptContent = `        let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        document.querySelectorAll('.auth-login-btn').forEach(btn => {
            btn.style.display = isLoggedIn ? 'none' : 'block';
        });
        document.querySelectorAll('.auth-profile-pic').forEach(pic => {
            pic.style.display = isLoggedIn ? 'block' : 'none';
        });`;

const newScriptContent = `        let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
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
        if (streakMobile) streakMobile.style.display = isLoggedIn ? '' : 'none';`;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(oldScriptContent, newScriptContent);
    fs.writeFileSync(f, content);
});

console.log('Streak visibility logic updated.');
