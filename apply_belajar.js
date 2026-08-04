const fs = require('fs');
const path = require('path');

const dir = __dirname;
const userHtmlPath = path.join(dir, 'temp_user_belajar.html');
const belajarHtmlPath = path.join(dir, 'belajar.html');

let userContent = fs.readFileSync(userHtmlPath, 'utf8');
let targetContent = fs.readFileSync(belajarHtmlPath, 'utf8');

// Extract the <main> block from userContent
const mainMatch = userContent.match(/(<main[\s\S]*?<\/main>)/);
if (!mainMatch) {
    console.error("No main tag found in temp_user_belajar.html");
    process.exit(1);
}
let newMain = mainMatch[1];

// Extract atmospheric glows and script from userContent
const atmosphericMatch = userContent.match(/(<!-- Atmospheric Glows -->[\s\S]*?<\/script>)/);
let newAtmospheric = atmosphericMatch ? atmosphericMatch[1] : '';

// Replace the main block in targetContent
targetContent = targetContent.replace(/<main[\s\S]*?<\/main>/, newMain);

// Insert atmospheric glows before the closing body tag or script tags if they exist
// Currently belajar.html ends with:
// <script>
//     function toggleArena(contentId, iconId) { ...
// ...
//     document.addEventListener('DOMContentLoaded', updateUIState);
// </script>
// </body></html>

// We can safely append it just before </body>
targetContent = targetContent.replace(/(<\/body>)/, newAtmospheric + '\n$1');

fs.writeFileSync(belajarHtmlPath, targetContent, 'utf8');
console.log("Replaced main content and added glows to belajar.html");
