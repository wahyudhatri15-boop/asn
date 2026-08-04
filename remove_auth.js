const fs = require('fs');

const files = fs.readdirSync('.');
files.filter(f => f.endsWith('.html')).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Remove login button
    content = content.replace(/<a href="login\.html" class="auth-login-btn[^>]+>Log In<\/a>/g, '');
    // Remove profile pic block
    content = content.replace(/<div class="auth-profile-pic[^>]+>\s*<img[^>]+>\s*<\/div>/g, '');
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Done");
