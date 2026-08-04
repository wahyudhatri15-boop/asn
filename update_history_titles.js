const fs = require('fs');

let c = fs.readFileSync('history.html', 'utf8');

let tI = 1, tW = 1, tK = 1;
c = c.replace(/>TIU - Intelegensia</g, () => `>TIU - Part ${tI++}<`);
c = c.replace(/>TWK - Kebangsaan</g, () => `>TWK - Part ${tW++}<`);
c = c.replace(/>TKP - Karakteristik</g, () => `>TKP - Part ${tK++}<`);

fs.writeFileSync('history.html', c);
console.log('Updated history.html category titles');
