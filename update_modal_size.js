const fs = require('fs');

let c = fs.readFileSync('database-soal.html', 'utf8');

// 1. Make modal wider
c = c.replace(/max-w-lg p-6/g, 'max-w-3xl p-6');

// 2. Increase height of q-text and q-pembahasan
// Currently they have style="min-height: 80px;" which we can replace.
c = c.replace(/<textarea([^>]*)id="q-text"([^>]*)style="min-height: 80px;"([^>]*)><\/textarea>/g, '<textarea$1id="q-text"$2rows="5" style="min-height: 120px;"$3></textarea>');
c = c.replace(/<textarea([^>]*)id="q-pembahasan"([^>]*)style="min-height: 80px;"([^>]*)><\/textarea>/g, '<textarea$1id="q-pembahasan"$2rows="5" style="min-height: 120px;"$3></textarea>');

// Wait, the previous replacement might not have matched if it didn't have style="min-height: 80px;" anymore, but let's just do:
c = c.replace(/style="min-height: 80px;"/g, 'rows="5" style="min-height: 120px;"');

// 3. Change options grid to 1 column
c = c.replace(/class="grid grid-cols-2 gap-3"/g, 'class="flex flex-col gap-3"');

// 4. Convert option inputs to textareas so text wraps
c = c.replace(/<input type="text" id="q-opt-1"([^>]*)>/g, '<textarea id="q-opt-1" rows="2"$1></textarea>');
c = c.replace(/<input type="text" id="q-opt-2"([^>]*)>/g, '<textarea id="q-opt-2" rows="2"$1></textarea>');
c = c.replace(/<input type="text" id="q-opt-3"([^>]*)>/g, '<textarea id="q-opt-3" rows="2"$1></textarea>');
c = c.replace(/<input type="text" id="q-opt-4"([^>]*)>/g, '<textarea id="q-opt-4" rows="2"$1></textarea>');
c = c.replace(/<input type="text" id="q-opt-5"([^>]*)>/g, '<textarea id="q-opt-5" rows="2"$1></textarea>');

fs.writeFileSync('database-soal.html', c);
console.log('Updated modal size and layout');
