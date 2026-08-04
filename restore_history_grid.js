const fs = require('fs');
let html = fs.readFileSync('history.html', 'utf8');

// Replace the flex back to the original grid
html = html.replace(
    'class="flex flex-col md:flex-row justify-center mx-auto max-w-4xl mb-8 gap-6 px-8 [&>div]:w-full md:[&>div]:w-[22%]"',
    'class="grid grid-cols-1 md:grid-cols-4 mx-auto max-w-4xl mb-8 gap-6 px-8"'
);

// Add an empty div before the first glass-card (which is TIU High Score now) to take up the space of the deleted Win Rate card
html = html.replace(
    '  <!-- TIU High Score -->',
    '  <!-- Empty Space for deleted Win Rate -->\n  <div class="hidden md:block"></div>\n  <!-- TIU High Score -->'
);

fs.writeFileSync('history.html', html);
console.log('Restored to grid-cols-4 with an empty placeholder div.');
