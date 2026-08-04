const fs = require('fs');
const path1 = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html';
const path2 = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-2.html';

function removeRedirect(filePath) {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Regex to remove the specific script block
    html = html.replace(/<script>[\s\S]*?if\s*\(\s*window\.performance\s*\)[\s\S]*?<\/script>/, '');
    
    fs.writeFileSync(filePath, html);
}

removeRedirect(path1);
removeRedirect(path2);
console.log("Redirect scripts removed from both files.");
