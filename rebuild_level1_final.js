const fs = require('fs');

const indexHtml = fs.readFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/index.html', 'utf8');
const tailwindConfigMatch = indexHtml.match(/<script id="tailwind-config">[\s\S]*?<\/script>/);
let tailwindConfig = tailwindConfigMatch ? tailwindConfigMatch[0] : '';
tailwindConfig = tailwindConfig.replace('"background": "#131315"', '"background": "#131315", "neon-green": "#39FF14"');

const newHtml = `<!DOCTYPE html><html lang="en" class="dark" style=""><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Geist:wght@400;500;600&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet"><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
` + tailwindConfig + `
<meta charset="utf-8">
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
<script>
    if (window.performance) {
        var navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0 && navEntries[0].type === "reload") {
            window.location.replace("index.html");
        } else if (performance.navigation && performance.navigation.type === 1) {
            window.location.replace("index.html");
        }
    }
</script>
</head><body class="min-h-screen flex flex-col font-body-md overflow-hidden bg-background text-on-surface">
<!-- Feedback Layer -->
<div id="feedback-overlay" class="fixed inset-0 pointer-events-none z-[300] transition-colors duration-300"></div>
<!-- Navigation Shell (TopAppBar) -->
<header class="fixed top-0 w-full z-[200] flex justify-between items-center px-container-padding-desktop py-4 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
<div class="flex items-center gap-4">
<a href="index.html" class="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity">Clash Of Civil Servants</a>
<div class="h-6 w-px bg-white/20 mx-2"></div>
<h1 class="font-headline-lg text-lg font-semibold text-primary">Math Blitz | Level 1: Flashcard Conversion</h1>
</div>
<div class="flex items-center gap-6">
<button class="flex items-center gap-2 hover:text-primary transition-all duration-300 group text-primary">
<span class="material-symbols-outlined text-xl">local_fire_department</span>
<span class="font-label-md">12 Streak</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center overflow-hidden">
<img class="w-full h-full object-cover" data-alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyS_murfKquHnf2OMt_z1yY6bdHtp-OILVTm-ajqk0-FbaxjKSgpqG_9DCirSwb1YxegnvlCKeVPYW8zwiOdBh4xOLxyyZgAE1rk10BhJ7w71c5h2uV3eV3yb2JGtYfqeVjMzLq-i41yMaPOKsu5NttTIm71yKAmxocOKzFe6T1uhv5ZVhZKyhzGGWI5rXTpibbUmcLpeIGwh8VVUI0fUqWsGeELJpMO-oVjjnGe8qma2zSD_TMADe">
</div>
</div>
</header>
<!-- Main Gameplay Canvas -->
<main class="animate-fade-in-up flex-1 flex flex-col items-center justify-center pt-24 px-6 relative overflow-hidden transition-opacity duration-300">
<!-- Background Atmospheric Element -->
<div class="absolute inset-0 z-0 opacity-20"></div>
<!-- Timer Section -->
<div class="relative z-10 flex flex-col items-center mb-12">
<div class="relative w-24 h-24 flex items-center justify-center">
<svg class="timer-svg w-full h-full" viewBox="0 0 100 100">
<circle class="stroke-white/5" cx="50" cy="50" fill="none" r="40" stroke-width="6"></circle>
<circle class="timer-circle stroke-primary" cx="50" cy="50" fill="none" id="timer-circle" r="40" stroke-linecap="round" stroke-width="6"></circle>
</svg>
<span class="absolute font-display text-2xl font-bold text-on-surface" id="timer-text">8</span>
</div>
</div>
<!-- Question Card -->
<div class="relative z-10 w-full max-w-2xl aspect-[16/9] card-transition" id="question-container">
<div class="glass-card w-full h-full rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden group bg-surface-container border border-white/10">
<!-- Inner Glow -->
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
<div class="font-display text-8xl md:text-[120px] font-bold text-on-surface tracking-tighter transition-all duration-300" id="question-text">4/5</div>
<!-- Bottom Status -->
<div id="progress-bar" class="absolute bottom-8 left-0 w-full flex justify-center gap-1 opacity-60"></div>
</div>
</div>
<!-- Answer Grid -->
<div id="answer-buttons" class="relative z-10 w-full max-w-4xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
</div>
</main>
<!-- Side Decoration (Minimalist Score) -->
<aside class="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-60 hover:opacity-100 transition-opacity hidden lg:flex">
<div class="flex flex-col items-end">
<span class="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Best</span>
<span class="font-display text-2xl font-bold text-on-surface">450</span>
</div>
<div class="flex flex-col items-end">
<span class="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Current</span>
<span id="current-score" class="font-display text-2xl font-bold text-primary">0</span>
</div>
</aside>

<script>
    const questions = [
        { q: "1/2", a: "0.50", options: ["0.25", "0.50", "0.75", "0.15"] },
        { q: "3/4", a: "0.75", options: ["0.45", "0.65", "0.75", "0.85"] },
        { q: "1/4", a: "0.25", options: ["0.15", "0.20", "0.25", "0.40"] },
        { q: "4/5", a: "0.80", options: ["0.65", "0.80", "0.75", "0.40"] },
        { q: "1/8", a: "0.125", options: ["0.125", "0.250", "0.150", "0.175"] },
        { q: "3/8", a: "0.375", options: ["0.325", "0.350", "0.375", "0.875"] },
        { q: "1/3", a: "0.33", options: ["0.33", "0.67", "0.30", "0.13"] },
        { q: "2/3", a: "0.67", options: ["0.33", "0.66", "0.67", "0.23"] },
        { q: "1/5", a: "0.20", options: ["0.10", "0.15", "0.20", "0.25"] },
        { q: "2/5", a: "0.40", options: ["0.30", "0.40", "0.50", "0.60"] }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let correctAnswersCount = 0;
    let timeLeft = 8;
    const totalTime = 8;
    let timerInterval = null;

    const timerText = document.getElementById("timer-text");
    const timerCircle = document.getElementById("timer-circle");
    const overlay = document.getElementById("feedback-overlay");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const answerButtonsContainer = document.getElementById("answer-buttons");
    const progressBarContainer = document.getElementById("progress-bar");
    const currentScoreEl = document.getElementById("current-score");

    function initGame() {
        currentQuestionIndex = 0;
        score = 0;
        currentStreak = 0;
        maxStreak = 0;
        correctAnswersCount = 0;
        if(currentScoreEl) currentScoreEl.innerText = "0";
        loadQuestion(0);
    }

    function loadQuestion(index) {
        if (index >= questions.length) {
            endGame();
            return;
        }

        const q = questions[index];
        questionText.innerText = q.q;

        // Render progress bar
        let progressHtml = "";
        for (let i = 0; i < questions.length; i++) {
            if (i < index) {
                progressHtml += '<div class="h-1 w-6 rounded-full bg-primary opacity-50"></div>';
            } else if (i === index) {
                progressHtml += '<div class="h-1 w-6 rounded-full bg-primary shadow-[0_0_10px_rgba(255,149,0,0.8)]"></div>';
            } else {
                progressHtml += '<div class="h-1 w-6 rounded-full bg-white/20"></div>';
            }
        }
        if(progressBarContainer) progressBarContainer.innerHTML = progressHtml;

        // Shuffle options
        let options = [...q.options];
        options.sort(() => Math.random() - 0.5);

        // Render buttons
        let buttonsHtml = "";
        options.forEach(opt => {
            const isCorrect = (opt === q.a);
            buttonsHtml += 
            '<button class="answer-button group py-8 rounded-2xl border border-white/5 hover:border-primary/40 hover:bg-white/5 active:scale-95 transition-all duration-200 bg-surface-container" onclick="handleAnswer(this, ' + isCorrect + ')">' +
                '<span class="font-display text-3xl font-semibold text-on-surface-variant group-hover:text-primary">' + opt + '</span>' +
            '</button>';
        });
        if(answerButtonsContainer) answerButtonsContainer.innerHTML = buttonsHtml;

        // Reset Timer
        timeLeft = totalTime;
        if(timerText) timerText.innerText = timeLeft;
        if(timerCircle) {
            timerCircle.style.strokeDashoffset = 0;
            timerCircle.classList.remove("stroke-red-500");
            timerCircle.classList.add("stroke-primary");
        }
        if(timerText) timerText.classList.remove("text-red-500");
        
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        if (timeLeft <= 0) {
            handleAnswer(null, false);
            return;
        }
        timeLeft--;
        if(timerText) timerText.innerText = timeLeft;
        if(timerCircle) {
            const offset = 251.2 - (251.2 * timeLeft) / totalTime;
            timerCircle.style.strokeDashoffset = offset;

            if (timeLeft <= 3) {
                timerText.classList.toggle("text-red-500");
                timerCircle.classList.toggle("stroke-red-500");
            }
        }
    }

    function handleAnswer(element, isCorrect) {
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
    }

    function endGame() {
        clearInterval(timerInterval);
        
        const accuracy = Math.round((correctAnswersCount / questions.length) * 100);
        let stars = accuracy >= 80 ? 3 : accuracy >= 50 ? 2 : 1;
        
        let nextBtnClass = accuracy >= 70 
            ? "bg-neon-green text-black hover:brightness-105" 
            : "bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50";
        
        let nextBtnContent = accuracy >= 70 
            ? '<span>Lanjut ke Level Berikutnya</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>'
            : '<span class="material-symbols-outlined">lock</span><span>Lanjut ke Level Berikutnya</span>';

        const summaryHtml = 
        '<div class="w-full max-w-2xl animate-fade-in-up mt-8" style="transform: translateY(0); opacity: 1;">' +
            '<div class="absolute -top-12 -left-8 animate-float" style="animation-delay: 75ms;">' +
                '<div class="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 blur-sm"></div>' +
            '</div>' +
            '<div class="absolute -bottom-8 -right-12 animate-float" style="animation-delay: 500ms;">' +
                '<div class="w-24 h-24 rounded-full bg-neon-green/5 border border-neon-green/10 blur-md"></div>' +
            '</div>' +
            '<div class="glass-card p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden bg-surface-container border border-white/10" style="background: rgba(28, 28, 30, 0.6); backdrop-filter: blur(20px);">' +
                '<div class="text-center mb-10">' +
                    '<div class="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">' +
                        '<span class="text-primary font-label-md tracking-widest uppercase">Level 1 Selesai</span>' +
                    '</div>' +
                    '<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-extrabold leading-tight mb-2">' +
                        'SELAMAT&nbsp;<br>KAMU LUAR BIASA' +
                    '</h1>' +
                    '<p class="text-on-surface-variant font-body-lg max-w-md mx-auto">' +
                        'Kamu berhasil menguasai Level 1! Otakmu sudah siap untuk naik ke tantangan yang lebih tinggi.' +
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

        const mainCanvas = document.querySelector("main");
        if (mainCanvas) {
            mainCanvas.style.opacity = 0;
            setTimeout(() => {
                mainCanvas.innerHTML = summaryHtml;
                mainCanvas.style.opacity = 1;
                if (accuracy > 80) {
                    setInterval(createParticle, 200);
                }
            }, 300);
        }
    }

    function createParticle() {
        const particle = document.createElement("div");
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        
        particle.style.position = "fixed";
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor = Math.random() > 0.5 ? "#ff9500" : "#39FF14";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "500";
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: "translate(0, 0)", opacity: particle.style.opacity },
            { transform: "translate(" + ((Math.random() - 0.5) * 200) + "px, -" + (window.innerHeight + 100) + "px)", opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 4000,
            easing: "cubic-bezier(0, 0, 0.2, 1)"
        });
        
        animation.onfinish = () => particle.remove();
    }

    // Start game on load
    window.addEventListener("DOMContentLoaded", initGame);
</script>
</body></html>`;

fs.writeFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html', newHtml);
console.log("Rebuilt math-blitz-level-1.html successfully with summary logic.");
