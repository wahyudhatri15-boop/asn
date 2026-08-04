const fs = require('fs');
let content = fs.readFileSync('math-blitz-level-1.html', 'utf8');

// 1. Inject mathlive script if not present
if (!content.includes('unpkg.com/mathlive')) {
    content = content.replace(/<head>/, '<head><script defer src="https://unpkg.com/mathlive"></script>');
}

// 2. Patch questionText.innerHTML
const oldRender = /questionText\.innerHTML = '\$' \+ q\.q \+ '\$';/;
const newRender = `questionText.innerHTML = '<math-field readonly style="background:transparent; border:none; pointer-events:none; padding:0; margin:0;" class="text-white">' + q.q + '</math-field>';`;

if (oldRender.test(content)) {
    content = content.replace(oldRender, newRender);
    fs.writeFileSync('math-blitz-level-1.html', content, 'utf8');
    console.log("Successfully patched Math Blitz Level 1");
} else {
    // try finding it generic
    const regex2 = /questionText\.innerHTML = [^;]+;/;
    if (regex2.test(content)) {
        content = content.replace(regex2, newRender);
        fs.writeFileSync('math-blitz-level-1.html', content, 'utf8');
        console.log("Successfully patched Math Blitz Level 1 via generic regex");
    } else {
        console.log("Could not find questionText.innerHTML in math-blitz-level-1.html");
    }
}
