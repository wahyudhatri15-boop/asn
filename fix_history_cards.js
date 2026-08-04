const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// Revert grid-cols-3 to grid-cols-4 and center it by pushing it with an empty div, or just flex.
// Actually, let's just make it grid-cols-4 and put an empty <div></div> at the beginning or end?
// "seperti sebelumnya" -> The cards were squares/rectangles. Grid cols 4 made them small. Grid cols 3 made them wider.
// To keep them small and centered, we can use flex flex-wrap justify-center gap-6.
// Let's replace the grid div with a flex container.

html = html.replace(
    'class="grid grid-cols-1 md:grid-cols-3 mx-auto max-w-4xl mb-8 gap-6 px-8"', 
    'class="grid grid-cols-1 md:grid-cols-4 mx-auto max-w-4xl mb-8 gap-6 px-8 justify-center"'
);

// If I add an empty div at the start or end, it simulates the space of the win rate card.
// Let's add an empty div at the end or start? The user said "hanya saja kotak winrate hilang"
// Let's just put it in a flex container to center them beautifully with the same width.
// Actually, let's just restore grid-cols-4. 
// A 3-column grid is wider because 100% / 3 > 100% / 4.
// To make them the same size as 1/4 without the empty space, I can use flex:
html = html.replace(
    'class="grid grid-cols-1 md:grid-cols-4 mx-auto max-w-4xl mb-8 gap-6 px-8 justify-center"', 
    'class="flex flex-col md:flex-row justify-center mx-auto max-w-4xl mb-8 gap-6 px-8 [&>div]:w-full md:[&>div]:w-[22%]"'
);

fs.writeFileSync('history.html', html);
console.log('Fixed card widths.');
