const fs = require('fs');

const indexHtml = fs.readFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/index.html', 'utf-8');
const arenaHtml = fs.readFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/arena-battle.html', 'utf-8');

const scriptRegex = /<script id=\"tailwind-config\">([\s\S]*?)<\/script>/;
const indexMatch = indexHtml.match(scriptRegex);

if (indexMatch && indexMatch[1]) {
    const updatedArena = arenaHtml.replace(scriptRegex, '<script id=\"tailwind-config\">' + indexMatch[1] + '<\/script>');
    fs.writeFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/arena-battle.html', updatedArena, 'utf-8');
    console.log('Successfully synced tailwind config!');
} else {
    console.log('Failed to find tailwind config in index.html');
}
