const fs = require('fs');
const indexHtml = fs.readFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/index.html', 'utf8');

const tailwindConfigMatch = indexHtml.match(/<script id="tailwind-config">[\s\S]*?<\/script>/);
const tailwindConfig = tailwindConfigMatch ? tailwindConfigMatch[0] : '';

const htmlContent = `<!DOCTYPE html><html lang="en" class="dark" style=""><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Geist:wght@400;500;600&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet"><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
` + tailwindConfig + `
<meta charset="utf-8">
<style id="page-transition">
  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
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
<main class="animate-fade-in-up flex-1 flex flex-col items-center justify-center pt-24 px-6 relative overflow-hidden">
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
            if(currentScoreEl) currentScoreEl.innerText = score;
        } else {
            overlay.classList.add("bg-red-500/20");
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
        if(questionText) {
            questionText.innerText = "Selesai!";
            questionText.classList.add("text-4xl", "md:text-6xl");
        }
        
        if(progressBarContainer) progressBarContainer.innerHTML = "";
        if(timerText) timerText.innerText = "-";
        if(timerCircle) timerCircle.style.strokeDashoffset = 0;

        if(answerButtonsContainer) {
            answerButtonsContainer.innerHTML = 
                '<div class="col-span-2 md:col-span-4 flex flex-col items-center gap-6 mt-8">' +
                    '<h3 class="font-display text-2xl text-on-surface-variant">Skor Akhir: <span class="text-primary font-bold">' + score + '</span></h3>' +
                    '<button onclick="window.location.href=\\'math-blitz.html\\'" class="px-8 py-4 bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-primary rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center gap-2">' +
                        '<span class="material-symbols-outlined">arrow_back</span> Kembali ke Menu' +
                    '</button>' +
                '</div>';
        }
    }

    // Start game on load
    window.addEventListener("DOMContentLoaded", initGame);
</script>
</body></html>`;

fs.writeFileSync('c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html', htmlContent);
console.log("Successfully rebuilt math-blitz-level-1.html");
