const fs = require('fs');
const path = require('path');

const filesToUpdate = ['math-blitz-level-1.html', 'math-blitz-level-2.html'];
const dir = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC';

const logicInjection = `
        let highFeedback = [
            "MUTLAK! Kamu melibas level ini tanpa ampun. Otakmu sudah sinkron dengan kecepatan dewa!",
            "LUAR BIASA! 100% insting angka sakti. Kamu resmi jadi ancaman besar di papan peringkat!",
            "GENIUS! Kalkulasi secepat kilat. Babak Full Combat rasanya sudah di depan mata!"
        ];
        let midFeedback = [
            "KERJA BAGUS! Kamu berhasil lolos dari jebakan angka desimal. Sedikit polesan lagi menuju sempurna!",
            "LULUS TARGET! Fondasi berhitungmu sudah solid. Siap menantang level berikutnya?",
            "MANTAP! Akurasi yang aman untuk mengamankan poin TIU. Pertahankan ritme ini!"
        ];
        let lowFeedback = [
            "JANGAN MENYERAH! Rantai fokusmu baru saja teruji. Yuk, ulangi sekali lagi untuk kunci hafalanmu!",
            "PROSES YANG BAGUS! Otakmu sedang merekam pola baru. Tarik napas, dan coba taklukkan lagi!",
            "HAMPIR BISA! Matematika kilat hanya butuh pembiasaan. Ulangi latihan untuk melatih refleksmu!"
        ];

        let selectedFeedbackArray = lowFeedback;
        let cAnswers = typeof correctAnswersCount !== 'undefined' ? correctAnswersCount : correctAnswers;
        if (cAnswers >= 9) {
            selectedFeedbackArray = highFeedback;
        } else if (cAnswers >= 7) {
            selectedFeedbackArray = midFeedback;
        }
        
        const randomFeedback = selectedFeedbackArray[Math.floor(Math.random() * selectedFeedbackArray.length)];
        let exclamation = "SELAMAT!";
        let detail = randomFeedback;
        let qIndex = randomFeedback.indexOf('? ');
        let exclIndex = randomFeedback.indexOf('! ');
        if (exclIndex !== -1 && (qIndex === -1 || exclIndex < qIndex)) {
            exclamation = randomFeedback.substring(0, exclIndex + 1);
            detail = randomFeedback.substring(exclIndex + 2);
        } else if (qIndex !== -1) {
            exclamation = randomFeedback.substring(0, qIndex + 1);
            detail = randomFeedback.substring(qIndex + 2);
        }

        let nextBtnClass = accuracy >= 70`;

filesToUpdate.forEach(file => {
    let filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the logic before nextBtnClass
    content = content.replace(/let nextBtnClass = accuracy >= 70/, logicInjection);

    // Replace the HTML part
    // Search for:
    // '<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-extrabold leading-tight mb-2">' +
    //     'SELAMAT&nbsp;<br>KAMU LUAR BIASA' +
    // '</h1>' +
    // '<p class="text-on-surface-variant font-body-lg max-w-md mx-auto">' +
    //     'Kamu berhasil menguasai Level 1! Otakmu sudah siap untuk naik ke tantangan yang lebih tinggi.' +
    // '</p>' +
    // (the actual text varies between level 1 and 2, so I will match more loosely)

    const regex = /<h1 class="[^"]*text-primary font-extrabold[^"]*">'\s*\+\s*'[^']*'\s*\+\s*'<\/h1>'\s*\+\s*'<p class="[^"]*text-on-surface-variant[^"]*">'\s*\+\s*'[^']*'\s*\+\s*'<\/p>'/g;
    
    // Wait, let's look at the exact HTML in both files to be sure.
    // Level 1:
    // '<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-extrabold leading-tight mb-2">' +
    // 'SELAMAT&nbsp;<br>KAMU LUAR BIASA' +
    // '</h1>' +
    // '<p class="text-on-surface-variant font-body-lg max-w-md mx-auto">' +
    // 'Kamu berhasil menguasai Level 1! Otakmu sudah siap untuk naik ke tantangan yang lebih tinggi.' +
    // '</p>' +

    // I will replace it using a more robust replace that just looks for the <h1>...</h1><p>...</p> structure inside text-center.

    content = content.replace(/(<div class="text-center mb-10">[\s\S]*?<\/div>\s*'\s*\+)/, (match, p1) => {
        // match is the whole matched string
        // We'll reconstruct the whole inner text-center div.
        
        let levelText = file.includes('level-2') ? 'Level 2' : 'Level 1';
        
        return \`'<div class="text-center mb-10">' +
                    '<div class="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">' +
                        '<span class="text-primary font-label-md tracking-widest uppercase">\${levelText} Selesai</span>' +
                    '</div>' +
                    '<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-extrabold leading-tight mb-2">' +
                        exclamation +
                    '</h1>' +
                    '<p class="text-on-surface-variant font-body-lg max-w-md mx-auto">' +
                        detail +
                    '</p>' +\`;
    });

    fs.writeFileSync(filePath, content);
});

console.log("Updated both files.");
