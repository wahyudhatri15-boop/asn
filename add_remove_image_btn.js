const fs = require('fs');
let html = fs.readFileSync('database-soal.html', 'utf8');

// 1. Wrap q-image-preview
html = html.replace(
    /<img id="q-image-preview" src="" class="hidden mt-3 max-h-40 rounded-lg border border-white\/10 object-contain">/,
    `<div id="q-image-preview-container" class="relative inline-block mt-3 hidden group w-fit">
        <img id="q-image-preview" src="" class="max-h-40 rounded-lg border border-white/10 object-contain">
        <button type="button" onclick="removeImage('q-image')" class="absolute -top-2 -right-2 bg-error hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-all z-10">
            <span class="material-symbols-outlined text-[14px]" style="display: block;">close</span>
        </button>
    </div>`
);

// 2. Wrap q-answer-image-preview
html = html.replace(
    /<img id="q-answer-image-preview" src="" class="hidden mt-3 max-h-40 rounded-lg border border-white\/10 object-contain">/,
    `<div id="q-answer-image-preview-container" class="relative inline-block mt-3 hidden group w-fit">
        <img id="q-answer-image-preview" src="" class="max-h-40 rounded-lg border border-white/10 object-contain">
        <button type="button" onclick="removeImage('q-answer-image')" class="absolute -top-2 -right-2 bg-error hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-all z-10">
            <span class="material-symbols-outlined text-[14px]" style="display: block;">close</span>
        </button>
    </div>`
);

// 3. Wrap q-opt-X-image-preview
for (let i = 1; i <= 5; i++) {
    let searchOpt = new RegExp(`<img id="q-opt-${i}-image-preview" src="" class="hidden max-h-24 rounded-lg border border-white\\/10 object-contain w-fit">`);
    let replaceOpt = `<div id="q-opt-${i}-image-preview-container" class="relative inline-block hidden group w-fit">
        <img id="q-opt-${i}-image-preview" src="" class="max-h-24 rounded-lg border border-white/10 object-contain">
        <button type="button" onclick="removeImage('q-opt-${i}-image')" class="absolute -top-2 -right-2 bg-error hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-all z-10">
            <span class="material-symbols-outlined text-[14px]" style="display: block;">close</span>
        </button>
    </div>`;
    html = html.replace(searchOpt, replaceOpt);
}

// 4. Update JS logic to toggle the container instead of just the image
// For q-image-preview
html = html.replace(/document\.getElementById\('q-image-preview'\)\.classList\.remove\('hidden'\);/g, "document.getElementById('q-image-preview-container').classList.remove('hidden');");
html = html.replace(/document\.getElementById\('q-image-preview'\)\.classList\.add\('hidden'\);/g, "document.getElementById('q-image-preview-container').classList.add('hidden');");

// For q-answer-image-preview
html = html.replace(/document\.getElementById\('q-answer-image-preview'\)\.classList\.remove\('hidden'\);/g, "document.getElementById('q-answer-image-preview-container').classList.remove('hidden');");
html = html.replace(/document\.getElementById\('q-answer-image-preview'\)\.classList\.add\('hidden'\);/g, "document.getElementById('q-answer-image-preview-container').classList.add('hidden');");

// For q-opt-X-image-preview
html = html.replace(/document\.getElementById\('q-opt-'\+i\+'-image-preview'\)\.classList\.remove\('hidden'\);/g, "document.getElementById('q-opt-'+i+'-image-preview-container').classList.remove('hidden');");
html = html.replace(/document\.getElementById\('q-opt-'\+i\+'-image-preview'\)\.classList\.add\('hidden'\);/g, "document.getElementById('q-opt-'+i+'-image-preview-container').classList.add('hidden');");


// 5. Add removeImage function
const removeScript = `
    <script>
    function removeImage(prefix) {
        // Clear input file
        const fileInput = document.getElementById(prefix);
        if (fileInput) fileInput.value = '';
        
        // Clear preview src and hide container
        const preview = document.getElementById(prefix + '-preview');
        const container = document.getElementById(prefix + '-preview-container');
        if (preview) preview.src = '';
        if (container) container.classList.add('hidden');
        
        // Clear global window variables
        if (prefix === 'q-image') window.currentQuestionImage = null;
        if (prefix === 'q-answer-image') window.currentAnswerImage = null;
        if (prefix.startsWith('q-opt-')) {
            const num = prefix.split('-')[2];
            window['currentOpt' + num + 'Image'] = null;
        }
    }
    </script>
`;

html = html.replace('</body>', removeScript + '\n</body>');

fs.writeFileSync('database-soal.html', html);
console.log('Added remove image buttons to database-soal.html');
