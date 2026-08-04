
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
