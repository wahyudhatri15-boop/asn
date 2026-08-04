const fs = require('fs');

let html = fs.readFileSync('database-soal.html', 'utf8');

// 1. Update renderQuestions
const renderRegex = /<h2 class="text-xl font-bold text-on-surface leading-tight math-display break-words">\$\{qText\}<\/h2>/g;
html = html.replace(renderRegex, '<h2 class="text-xl font-bold text-on-surface leading-tight math-display break-words">${index + 1}. ${qText}</h2>');

const optionsRegex = /<div class="p-3 rounded-lg border \$\{bg\} flex flex-col justify-center">\s*\$\{opt \? `<span class="text-sm font-medium math-display break-words">\$\{opt\}<\/span>` : ''\}\s*\$\{optImgHtml\}\s*<\/div>/g;
const newOptionsHtml = `<div class="p-3 rounded-lg border \${bg} flex flex-col justify-center">
                                    <div class="flex items-start gap-2">
                                        <span class="text-sm font-bold shrink-0">\${String.fromCharCode(65 + i)}.</span>
                                        <div class="flex-grow min-w-0 overflow-hidden">
                                            \${opt ? \`<span class="text-sm font-medium math-display break-words">\${opt}</span>\` : ''}
                                            \${optImgHtml}
                                        </div>
                                    </div>
                                 </div>`;
html = html.replace(optionsRegex, newOptionsHtml);

// 2. Update modal titles
html = html.replace(/document\.getElementById\('modal-title'\)\.innerText = "Tambah Soal";/g, `document.getElementById('modal-title').innerText = "Tambah Soal " + (questions.length + 1);`);
html = html.replace(/document\.getElementById\('modal-title'\)\.innerText = "Edit Soal";/g, `document.getElementById('modal-title').innerText = "Edit Soal " + (index + 1);`);

fs.writeFileSync('database-soal.html', html);
console.log("Updated HTML with question numbers and option letters.");
