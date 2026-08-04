const fs = require('fs');

let html = fs.readFileSync('math-blitz-level-1.html', 'utf8');

// 1. Add IDs to elements we need to control
html = html.replace(
    /<div class="absolute bottom-8 left-0 w-full flex justify-center gap-1 opacity-60">.*?<\/div>/,
    '<div id="progress-bar" class="absolute bottom-8 left-0 w-full flex justify-center gap-1 opacity-60"></div>'
);

html = html.replace(
    /<div class="relative z-10 w-full max-w-4xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">/,
    '<div id="answer-buttons" class="relative z-10 w-full max-w-4xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">'
);

html = html.replace(
    /<span class="font-display text-2xl font-bold text-primary">125<\/span>/,
    '<span id="current-score" class="font-display text-2xl font-bold text-primary">0</span>'
);

// We need to replace the entire <script> block at the end.
const scriptRegex = /<script>[\s\S]*?<\/script>\s*<\/body>/;

const newScript = `<script>
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

        const timerText = document.getElementById('timer-text');
        const timerCircle = document.getElementById('timer-circle');
        const overlay = document.getElementById('feedback-overlay');
        const questionContainer = document.getElementById('question-container');
        const questionText = document.getElementById('question-text');
        const answerButtonsContainer = document.getElementById('answer-buttons');
        const progressBarContainer = document.getElementById('progress-bar');
        const currentScoreEl = document.getElementById('current-score');

        function initGame() {
            currentQuestionIndex = 0;
            score = 0;
            currentScoreEl.innerText = '0';
            loadQuestion(0);
        }

        function loadQuestion(index) {
            if (index >= questions.length) {
                endGame();
                return;
            }

            const q = questions[index];
            questionText.innerHTML = q.q.replace(/(\d+)\/(\d+)/g, '<span class="inline-flex flex-col items-center justify-center align-middle" style="line-height: 1; font-size: 0.85em;"><span style="border-bottom: 0.05em solid currentColor; padding: 0 0.1em; margin-bottom: 0.1em;">$1</span><span style="padding: 0 0.1em;">$2</span></span>');

            // Render progress bar
            let progressHtml = '';
            for (let i = 0; i < questions.length; i++) {
                if (i < index) {
                    progressHtml += '<div class="h-1 w-6 rounded-full bg-primary opacity-50"></div>';
                } else if (i === index) {
                    progressHtml += '<div class="h-1 w-6 rounded-full bg-primary shadow-[0_0_10px_rgba(255,149,0,0.8)]"></div>';
                } else {
                    progressHtml += '<div class="h-1 w-6 rounded-full bg-white/20"></div>';
                }
            }
            progressBarContainer.innerHTML = progressHtml;

            // Shuffle options
            let options = [...q.options];
            options.sort(() => Math.random() - 0.5);

            // Render buttons
            let buttonsHtml = '';
            options.forEach(opt => {
                const isCorrect = (opt === q.a);
                buttonsHtml += \`
                <button class="answer-button group glass-card py-8 rounded-2xl border border-white/5 hover:border-primary/40 hover:bg-white/5 active:scale-95 transition-all duration-200" onclick="handleAnswer(this, \${isCorrect})" style="background: rgba(28, 28, 30, 0.6); backdrop-filter: blur(20px);">
                    <span class="font-display text-3xl font-semibold text-on-surface-variant group-hover:text-primary">\${opt}</span>
                </button>\`;
            });
            answerButtonsContainer.innerHTML = buttonsHtml;

            // Reset Timer
            timeLeft = totalTime;
            timerText.innerText = timeLeft;
            timerCircle.style.strokeDashoffset = 0;
            timerText.classList.remove('text-red-500');
            timerCircle.classList.remove('stroke-red-500');
            timerCircle.classList.add('stroke-primary-container');
            
            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);
        }

        function updateTimer() {
            if (timeLeft <= 0) {
                handleAnswer(null, false);
                return;
            }
            timeLeft--;
            timerText.innerText = timeLeft;
            const offset = 251.2 - (251.2 * timeLeft) / totalTime;
            timerCircle.style.strokeDashoffset = offset;

            if (timeLeft <= 3) {
                timerText.classList.toggle('text-red-500');
                timerCircle.classList.toggle('stroke-red-500');
            }
        }

        function handleAnswer(element, isCorrect) {
            clearInterval(timerInterval);

            // Disable all buttons
            document.querySelectorAll('.answer-button').forEach(btn => btn.disabled = true);

            // Visual feedback
            if (isCorrect) {
                overlay.classList.add('bg-emerald-500/20');
                score += (timeLeft * 10) + 50; // Base 50 + time bonus
                currentScoreEl.innerText = score;
            } else {
                overlay.classList.add('bg-red-500/20');
            }

            if (element) {
                element.classList.add(isCorrect ? 'border-emerald-500/50' : 'border-red-500/50');
                element.classList.add(isCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10');
            }

            // Next question transition
            setTimeout(() => {
                questionContainer.style.transform = 'translateX(-100vw)';
                answerButtonsContainer.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.className = 'fixed inset-0 pointer-events-none z-[300] transition-colors duration-300';
                    questionContainer.style.transition = 'none';
                    questionContainer.style.transform = 'translateX(100vw)';
                    
                    currentQuestionIndex++;
                    loadQuestion(currentQuestionIndex);

                    questionContainer.offsetHeight; // reflow
                    questionContainer.style.transition = 'transform 0.3s ease-out';
                    questionContainer.style.transform = 'translateX(0)';
                    answerButtonsContainer.style.opacity = '1';
                }, 200);
            }, 500);
        }

        function endGame() {
            clearInterval(timerInterval);
            questionText.innerText = "Selesai!";
            questionText.classList.add('text-4xl', 'md:text-6xl');
            
            progressBarContainer.innerHTML = '';
            timerText.innerText = "-";
            timerCircle.style.strokeDashoffset = 0;

            answerButtonsContainer.innerHTML = \`
                <div class="col-span-2 md:col-span-4 flex flex-col items-center gap-6 mt-8">
                    <h3 class="font-display text-2xl text-on-surface-variant">Skor Akhir: <span class="text-primary font-bold">\${score}</span></h3>
                    <button onclick="window.location.href='math-blitz.html'" class="px-8 py-4 bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-primary rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center gap-2">
                        <span class="material-symbols-outlined">arrow_back</span> Kembali ke Menu
                    </button>
                </div>
            \`;
        }

        // Start game on load
        window.addEventListener('DOMContentLoaded', initGame);
    </script>
</body>`;

html = html.replace(scriptRegex, newScript);

fs.writeFileSync('math-blitz-level-1.html', html);
console.log("Successfully updated math-blitz-level-1.html with 10-question logic.");
