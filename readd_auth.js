const fs = require('fs');

const authHtml = `
<a href="login.html" class="auth-login-btn bg-primary text-on-primary-container font-label-md font-bold px-4 py-2 rounded-lg hover:bg-surface-tint transition-all whitespace-nowrap" style="display: none;">Log In</a>
<div class="auth-profile-pic cursor-pointer w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-white/10" onclick="localStorage.removeItem('isLoggedIn'); window.location.reload();" style="display: none;" title="Logout">
<img class="w-full h-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBloqCsv54Uav8Y3ystavbPcsPqKqI4qf7e2xLSccxgOi6H_kKHFLWNGlB4flIfiAY9PhGgn7CsO1cmv6Noj_3Or-qgLozPOe_Mj55ydWSDmo4K8Pn6uAgqQrURcm3OB5l-9ub7Sh_ijfUBWrX_0f1wymQ9PdaZmP-G4byIq_Ws58depN-cz6si_rHtfL_Nn7d790DWhi-drmc94MdnobYyYcgNKtT4RX-JDEIbzunop7NvbMDnO1Wj">
</div>
`;

const authMobileHtml = `
<a href="login.html" class="auth-login-btn bg-primary text-on-primary-container text-[12px] font-bold px-3 py-1.5 rounded-lg hover:bg-surface-tint transition-all whitespace-nowrap" style="display: none;">Log In</a>
<div class="auth-profile-pic cursor-pointer h-8 w-8 rounded-full bg-surface-container-highest overflow-hidden border border-white/10" onclick="localStorage.removeItem('isLoggedIn'); window.location.reload();" style="display: none;" title="Logout">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBloqCsv54Uav8Y3ystavbPcsPqKqI4qf7e2xLSccxgOi6H_kKHFLWNGlB4flIfiAY9PhGgn7CsO1cmv6Noj_3Or-qgLozPOe_Mj55ydWSDmo4K8Pn6uAgqQrURcm3OB5l-9ub7Sh_ijfUBWrX_0f1wymQ9PdaZmP-G4byIq_Ws58depN-cz6si_rHtfL_Nn7d790DWhi-drmc94MdnobYyYcgNKtT4RX-JDEIbzunop7NvbMDnO1Wj">
</div>
`;

const globalAuthScript = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    document.querySelectorAll('.auth-login-btn').forEach(btn => {
        btn.style.display = isLoggedIn ? 'none' : 'block';
    });
    document.querySelectorAll('.auth-profile-pic').forEach(pic => {
        pic.style.display = isLoggedIn ? 'block' : 'none';
    });
    
    if (!isLoggedIn && !window.location.pathname.endsWith('login.html')) {
        document.addEventListener('click', (e) => {
            const btnOrLink = e.target.closest('button, a');
            if (btnOrLink) {
                // If it's the login button itself, allow it
                if (btnOrLink.classList.contains('auth-login-btn') || btnOrLink.closest('.auth-login-btn')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if(confirm("Silakan Log In terlebih dahulu untuk mengakses fitur ini!")) {
                    window.location.href = 'login.html';
                }
            }
        }, true);
    }
});
</script>
`;

const files = fs.readdirSync('.');
files.filter(f => f.endsWith('.html')).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Update login.html logic
    if (file === 'login.html') {
        content = content.replace(/<form class="space-y-4 mb-8" onsubmit="[^"]+">/, '<form id="login-form" class="space-y-4 mb-8">');
        content = content.replace(/value="Wahyudha"/, 'value="" id="username-input"');
        content = content.replace(/type="password" required\/>/, 'type="password" id="password-input" required/>');
        
        if (!content.includes('login-form-script')) {
            const loginScript = `
<script id="login-form-script">
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('username-input').value;
            const pass = document.getElementById('password-input').value;
            if (user === 'yudha' && pass === '123456') {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Username atau password salah!');
            }
        });
    }
});
</script>
</body>`;
            content = content.replace('</body>', loginScript);
        }
        
        fs.writeFileSync(file, content, 'utf8');
        return;
    }

    // For other HTML files: 
    // Find empty <div class="flex items-center gap-4">\s*<\/div> at the end of nav
    // The nav ends with <div class="flex items-center gap-4"> \n \n </div>
    // Let's replace the last <div class="flex items-center gap-4">[\s\S]*?<\/div> inside nav and header with the auth blocks.
    
    // Replace desktop nav right part
    content = content.replace(/(<nav[^>]*>[\s\S]*?)<div class="flex items-center gap-4">[\s\S]*?<\/div>\s*<\/nav>/, 
        `$1<div class="flex items-center gap-4">\n${authHtml}</div>\n</nav>`);
        
    // Replace mobile header right part
    content = content.replace(/(<header[^>]*>[\s\S]*?)<div class="flex items-center gap-4">[\s\S]*?<\/div>\s*<\/header>/, 
        `$1<div class="flex items-center gap-4">\n${authMobileHtml}</div>\n</header>`);
        
    // Add global auth script if not present
    if (!content.includes('Silakan Log In terlebih dahulu')) {
        content = content.replace('</body>', `${globalAuthScript}\n</body>`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Auth logic added back.');
