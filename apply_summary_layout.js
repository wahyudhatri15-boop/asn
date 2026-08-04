const fs = require('fs');

let html = fs.readFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html', 'utf8');

// 1. Update Style Block
const newStyle = `
<style id="page-transition">
  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
</style>
`;
html = html.replace(/<style id="page-transition">[\s\S]*?<\/style>/, newStyle.trim());


// 2. Add Variables
html = html.replace('let score = 0;', 'let score = 0;\n    let currentStreak = 0;\n    let maxStreak = 0;\n    let correctAnswersCount = 0;');

html = html.replace('if(currentScoreEl) currentScoreEl.innerText = "0";', 'if(currentScoreEl) currentScoreEl.innerText = "0";\n        currentStreak = 0;\n        maxStreak = 0;\n        correctAnswersCount = 0;');


// 3. Update handleAnswer
const newHandleAnswer = `function handleAnswer(element, isCorrect) {
        clearInterval(timerInterval);

        // Disable all buttons
        document.querySelectorAll(".answer-button").forEach(btn => btn.disabled = true);

        // Visual feedback
        if (isCorrect) {
            overlay.classList.add("bg-emerald-500/20");
            score += (timeLeft * 10) + 50; // Base 50 + time bonus
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
            correctAnswersCount++;
            if(currentScoreEl) currentScoreEl.innerText = score;
        } else {
            overlay.classList.add("bg-red-500/20");
            currentStreak = 0;
        }

        if (element) {
            element.classList.add(isCorrect ? "border-emerald-500/50" : "border-red-500/50");
            element.classList.add(isCorrect ? "bg-emerald-500/10" : "bg-red-500/10");
        }

        // Next question transition
        setTimeout(() => {
            if(questionContainer) questionContainer.style.transform = "translateX(-100vw)";
            if(answerButtonsContainer) answerButtonsContainer.style.opacity = "0";
            
            setTimeout(() => {
                if(overlay) overlay.className = "fixed inset-0 pointer-events-none z-[300] transition-colors duration-300";
                if(questionContainer) {
                    questionContainer.style.transition = "none";
                    questionContainer.style.transform = "translateX(100vw)";
                }
                
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);

                if(questionContainer) {
                    questionContainer.offsetHeight; // reflow
                    questionContainer.style.transition = "transform 0.3s ease-out";
                    questionContainer.style.transform = "translateX(0)";
                }
                if(answerButtonsContainer) answerButtonsContainer.style.opacity = "1";
            }, 200);
        }, 500);
    }`;
html = html.replace(/function handleAnswer[\s\S]*?}, 500\);\n    }/, newHandleAnswer);


// 4. Replace endGame and add createParticle
const newEndGame = `function endGame() {
        clearInterval(timerInterval);
        
        const accuracy = Math.round((correctAnswersCount / questions.length) * 100);
        let stars = accuracy >= 80 ? 3 : accuracy >= 50 ? 2 : 1;
        
        let nextBtnClass = accuracy >= 70 
            ? "bg-[#39FF14] text-black hover:brightness-105" 
            : "bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50";
        
        let nextBtnContent = accuracy >= 70 
            ? '<span>Lanjut ke Level Berikutnya</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>'
            : '<span class="material-symbols-outlined">lock</span><span>Lanjut ke Level Berikutnya (Akurasi < 70%)</span>';

        const summaryHtml = 
        '<div class="w-full max-w-2xl animate-fade-in-up mt-8" style="transform: translateY(0); opacity: 1;">' +
            '<div class="absolute -top-12 -left-8 animate-float" style="animation-delay: 75ms;">' +
                '<div class="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 blur-sm"></div>' +
            '</div>' +
            '<div class="absolute -bottom-8 -right-12 animate-float" style="animation-delay: 500ms;">' +
                '<div class="w-24 h-24 rounded-full bg-[#39FF14]/5 border border-[#39FF14]/10 blur-md"></div>' +
            '</div>' +
            '<div class="glass-card p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden bg-surface-container border border-white/10" style="background: rgba(28, 28, 30, 0.6); backdrop-filter: blur(20px);">' +
                '<div class="text-center mb-10">' +
                    '<div class="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">' +
                        '<span class="text-primary font-label-md tracking-widest uppercase">Level 1 Selesai</span>' +
                    '</div>' +
                    '<h1 class="font-display text-4xl md:text-5xl text-primary font-extrabold leading-tight mb-2">' +
                        'SELAMAT<br>KAMU LUAR BIASA' +
                    '</h1>' +
                    '<p class="text-on-surface-variant font-body-lg max-w-md mx-auto">' +
                        'Kamu berhasil menyelesaikan Level 1! Otakmu sudah siap untuk tantangan berikutnya.' +
                    '</p>' +
                '</div>' +
                '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-on-surface/5 rounded-xl">' +
                        '<div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">' +
                            '<span class="material-symbols-outlined text-primary/60" style="font-variation-settings: \\'FILL\\' 1;">workspace_premium</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Skor Akhir</span>' +
                        '<span class="font-display text-2xl font-bold text-on-surface">' + score + ' Poin</span>' +
                        '<div class="mt-4 w-8 h-[1px] bg-primary/20"></div>' +
                    '</div>' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-on-surface/5 rounded-xl">' +
                        '<div class="relative w-10 h-10 flex items-center justify-center mb-2">' +
                            '<div class="absolute inset-0 flex items-center justify-center">' +
                                '<span class="text-[12px] font-bold text-primary/80">' + accuracy + '%</span>' +
                            '</div>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Akurasi</span>' +
                        '<span class="font-display text-2xl font-bold text-on-surface">' + accuracy + '%</span>' +
                        '<div class="mt-4 w-8 h-[1px] bg-primary/20"></div>' +
                    '</div>' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-on-surface/5 rounded-xl">' +
                        '<div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">' +
                            '<span class="material-symbols-outlined text-primary/60">local_fire_department</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Streak Tertinggi</span>' +
                        '<span class="font-display text-2xl font-bold text-on-surface">🔥 ' + maxStreak + ' Beruntun</span>' +
                        '<div class="mt-4 w-8 h-[1px] bg-primary/20"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="flex flex-col gap-4">' +
                    '<button ' + (accuracy >= 70 ? 'onclick="window.location.href=\\'math-blitz-level-2.html\\'"' : 'disabled') + ' class="h-[50px] w-full rounded-xl font-label-md font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all ' + nextBtnClass + '">' +
                        nextBtnContent +
                    '</button>' +
                    '<button onclick="window.location.reload()" class="h-[50px] w-full rounded-xl border border-on-surface/10 bg-transparent text-on-surface font-label-md font-medium flex items-center justify-center gap-2 hover:bg-on-surface/5 active:scale-[0.98] transition-all"><span class="material-symbols-outlined text-[20px]">replay</span><span>Ulangi Latihan Ini</span></button>' +
                    '<button onclick="window.location.href=\\'math-blitz.html\\'" class="h-[50px] w-full rounded-xl text-on-surface-variant font-label-md hover:bg-on-surface/5 hover:text-on-surface active:scale-[0.98] transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined text-[20px]">home</span><span>Kembali ke Menu Utama</span></button>' +
                '</div>' +
                '<div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>' +
            '</div>' +
            '<div class="mt-8 flex justify-center items-center gap-6 opacity-60">' +
                '<div class="flex items-center gap-2">' +
                    '<span class="material-symbols-outlined text-sm">bolt</span>' +
                    '<span class="text-sm">+' + score + ' XP</span>' +
                '</div>' +
                '<div class="flex items-center gap-2">' +
                    '<span class="material-symbols-outlined text-sm">stars</span>' +
                    '<span class="text-sm">' + stars + ' Stars</span>' +
                '</div>' +
                '<div class="flex items-center gap-2">' +
                    '<span class="material-symbols-outlined text-sm">history_edu</span>' +
                    '<span class="text-sm">Math Blitz</span>' +
                '</div>' +
            '</div>' +
        '</div>';

        const mainCanvas = document.querySelector('main');
        if (mainCanvas) {
            // Give main canvas a nice fade transition out/in
            mainCanvas.style.opacity = 0;
            setTimeout(() => {
                mainCanvas.innerHTML = summaryHtml;
                mainCanvas.style.opacity = 1;
                // Run particles if high score
                if (accuracy > 80) {
                    setInterval(createParticle, 200);
                }
            }, 300);
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        
        particle.style.position = 'fixed';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = Math.random() > 0.5 ? '#ff9500' : '#39FF14';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '500';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translate(0, 0)', opacity: particle.style.opacity },
            { transform: 'translate(' + ((Math.random() - 0.5) * 200) + 'px, -' + (window.innerHeight + 100) + 'px)', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 4000,
            easing: 'cubic-bezier(0, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }`;

html = html.replace(/function endGame[\s\S]*?\}<\/script>/, newEndGame + '\n\n    // Start game on load\n    window.addEventListener("DOMContentLoaded", initGame);\n</script>');

fs.writeFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html', html);
console.log("Successfully applied summary layout and logics to math-blitz-level-1.html");
