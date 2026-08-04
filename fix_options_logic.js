const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, 'database-soal.html');
let content = fs.readFileSync(targetHtml, 'utf8');

// 1. Fix showOptions and isOptionsBased to be true always
content = content.replace(
    /let showOptions = \(currentGame === 'math_blitz' && currentLevel === 1\) \|\| \(currentGame === 'word_equation'\);/g, 
    'let showOptions = true;'
);
content = content.replace(
    /let isOptionsBased = \(currentGame === 'math_blitz' && currentLevel === 1\) \|\| \(currentGame === 'word_equation'\);/g, 
    'let isOptionsBased = true;'
);

// 2. Fix saveQuestion logic for options
const saveOptionsRegex = /let opts = document\.getElementById\('q-options'\)\.value\.split\(\',\'\)\.map\(s => s\.trim\(\)\)\.filter\(s => s\);\s*if \(!opts\.includes\(answer\)\) \{\s*opts\.push\(answer\);\s*\}\s*newItem\.options = opts;/;

const newSaveOptions = `
                let opts = [];
                for(let i=1; i<=4; i++) {
                    let optVal = document.getElementById('q-opt-'+i).value.trim();
                    if(optVal) opts.push(optVal);
                }
                
                let selectedRadio = document.querySelector('input[name="correct-option"]:checked');
                if (selectedRadio) {
                    let idx = selectedRadio.value;
                    newItem.a = document.getElementById('q-opt-'+idx).value.trim();
                } else {
                    newItem.a = answer;
                }
                newItem.options = opts;
`;

content = content.replace(saveOptionsRegex, newSaveOptions.trim());

fs.writeFileSync(targetHtml, content, 'utf8');
console.log("Fixed options logic for Tambah Soal modal");
