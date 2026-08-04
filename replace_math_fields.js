const fs = require('fs');
let c = fs.readFileSync('database-soal.html', 'utf8');

c = c.replace(/<math-field([^>]*)id="q-text"([^>]*)><\/math-field>/g, '<textarea$1id="q-text"$2></textarea>');
c = c.replace(/<math-field([^>]*)id="q-answer"([^>]*)><\/math-field>/g, '<textarea$1id="q-answer"$2></textarea>');
c = c.replace(/<math-field([^>]*)id="q-pembahasan"([^>]*)><\/math-field>/g, '<textarea$1id="q-pembahasan"$2></textarea>');

// Since these are textareas, the MathLive attributes (default-mode, math-virtual-keyboard-policy, etc) will just be ignored by the browser. 

fs.writeFileSync('database-soal.html', c);
console.log('Replaced math-fields with textareas');
