const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-2.html';
let html = fs.readFileSync(filePath, 'utf8');

const newScript = `
    <script>
        const easyFractions = [
            { d: "1/2", v: 0.5 }, { d: "1/4", v: 0.25 }, { d: "3/4", v: 0.75 },
            { d: "1/5", v: 0.2 }, { d: "2/5", v: 0.4 }, { d: "3/5", v: 0.6 }, { d: "4/5", v: 0.8 },
            { d: "1/8", v: 0.125 }, { d: "1/10", v: 0.1 }
        ];

        function generateQuestionAddSub() {
            let isValid = false;
            let questionStr = "";
            let answer = 0;
            
            while (!isValid) {
                let d1 = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
                let d2 = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
                let n1 = Math.floor(Math.random() * 15) + 1;
                let n2 = Math.floor(Math.random() * 15) + 1;
                let isAdd = Math.random() > 0.5;
                
                if (isAdd) {
                    answer = (n1 / d1) + (n2 / d2);
                    questionStr = n1 + '/' + d1 + ' + ' + n2 + '/' + d2;
                } else {
                    answer = (n1 / d1) - (n2 / d2);
                    questionStr = n1 + '/' + d1 + ' - ' + n2 + '/' + d2;
                }
                
                if (answer >= 0 && answer <= 20 && Number.isInteger(answer)) {
                    isValid = true;
                }
            }
            return { question: questionStr, answer: String(answer) };
        }

        function generateQuestionMulDiv() {
            let isValid = false;
            let questionStr = "";
            let answer = 0;
            
            while (!isValid) {
                let isMul = Math.random() > 0.5;
                let d1 = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
                let d2 = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
                let n1 = Math.floor(Math.random() * 15) + 1;
                let n2 = Math.floor(Math.random() * 15) + 1;
                
                if (isMul) {
                    answer = (n1 * n2) / (d1 * d2);
                    questionStr = n1 + '/' + d1 + ' × ' + n2 + '/' + d2;
                } else {
                    answer = (n1 * d2) / (d1 * n2);
                    questionStr = n1 + '/' + d1 + ' ÷ ' + n2 + '/' + d2;
                }
                
                if (answer >= 0 && answer <= 30 && Number.isInteger(answer)) {
                    isValid = true;
                }
            }
            return { question: questionStr, answer: String(answer) };
        }

        let questions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let streak = 0;
        let maxStreak = 0;
        let correctAnswers = 0;

        let seconds = 15;
        const totalSeconds = 15;
        let timerInterval;

        let currentAnswer = "";
        const display = document.getElementById('answer-display');
        const countdownText = document.getElementById('countdown-text');
        const timerBar = document.getElementById('timer-bar');
        
        function appendNum(num) {
            if (currentAnswer.length < 8) {
                currentAnswer += num;
                updateDisplay();
            }
        }

        function clearDisplay() {
            currentAnswer = "";
            updateDisplay();
        }

        function backspace() {
            currentAnswer = currentAnswer.slice(0, -1);
            updateDisplay();
        }

        function updateDisplay() {
            display.textContent = currentAnswer;
        }
        
        function initGame() {
            questions = [];
            for (let i = 0; i < 10; i++) {
                if (i < 5) {
                    questions.push(generateQuestionAddSub());
                } else {
                    questions.push(generateQuestionMulDiv());
                }
            }
            currentQuestionIndex = 0;
            score = 0;
            streak = 0;
            maxStreak = 0;
            correctAnswers = 0;
            loadQuestion(0);
        }

        function loadQuestion(index) {
            if (index >= questions.length) {
                endGame();
                return;
            }
            
            clearInterval(timerInterval);
            seconds = totalSeconds;
            document.getElementById('question-text').innerHTML = questions[index].question.replace(/(\d+)\/(\d+)/g, '<span class="inline-flex flex-col items-center justify-center align-middle" style="line-height: 1; font-size: 0.85em;"><span style="border-bottom: 0.05em solid currentColor; padding: 0 0.1em; margin-bottom: 0.1em;">$1</span><span style="padding: 0 0.1em;">$2</span></span>');
            clearDisplay();
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                seconds--;
                updateTimerDisplay();
                if (seconds <= 0) {
                    clearInterval(timerInterval);
                    handleWrongAnswer();
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            countdownText.textContent = seconds + "s";
            timerBar.style.width = (seconds / totalSeconds * 100) + '%';
            
            if (seconds <= 3 && seconds > 0) {
                countdownText.classList.add('text-red-500');
                countdownText.classList.add('animate-pulse');
                timerBar.classList.replace('bg-primary-container', 'bg-red-500');
            } else {
                countdownText.classList.remove('text-red-500');
                countdownText.classList.remove('animate-pulse');
                timerBar.classList.replace('bg-red-500', 'bg-primary-container');
            }
        }

        function submitAnswer() {
            if (!currentAnswer) return;
            clearInterval(timerInterval);
            
            const overlay = document.getElementById("feedback-overlay");
            
            if (Number(currentAnswer) === Number(questions[currentQuestionIndex].answer)) {
                correctAnswers++;
                streak++;
                if (streak > maxStreak) maxStreak = streak;
                score += (seconds * 10) + (streak * 5);
                
                display.classList.add('text-green-400');
                if (overlay) overlay.classList.add("bg-emerald-500/20");
                
                setTimeout(() => {
                    display.classList.remove('text-green-400');
                    if (overlay) overlay.className = "fixed inset-0 pointer-events-none z-[300] transition-colors duration-300";
                    currentQuestionIndex++;
                    loadQuestion(currentQuestionIndex);
                }, 500);
            } else {
                handleWrongAnswer();
            }
        }
        
        function handleWrongAnswer() {
            streak = 0;
            const overlay = document.getElementById("feedback-overlay");
            
            display.classList.remove('text-primary-container');
            display.classList.add('text-red-500');
            if (overlay) overlay.classList.add("bg-red-500/20");
            
            setTimeout(() => {
                display.classList.remove('text-red-500');
                display.classList.add('text-primary-container');
                if (overlay) overlay.className = "fixed inset-0 pointer-events-none z-[300] transition-colors duration-300";
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            }, 500);
        }

        function endGame() {
            clearInterval(timerInterval);
            const accuracy = Math.round((correctAnswers / 10) * 100);
            const stars = accuracy >= 90 ? 3 : (accuracy >= 70 ? 2 : (accuracy >= 50 ? 1 : 0));
            
            let nextBtnClass = accuracy >= 70 
                ? "bg-neon-green text-black hover:brightness-105" 
                : "bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50";
            
            let nextBtnContent = accuracy >= 70 
                ? '<span>Lanjut ke Level Berikutnya</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>'
                : '<span class="material-symbols-outlined">lock</span><span>Lanjut ke Level Berikutnya</span>';

            const summaryHtml = 
            '<div class="w-full max-w-2xl animate-fade-in-up mt-0" style="transform: translateY(0); opacity: 1;">' +
                '<div class="absolute -top-12 -left-8 animate-float" style="animation-delay: 75ms;">' +
                    '<div class="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 blur-sm"></div>' +
                '</div>' +
                '<div class="absolute -bottom-8 -right-12 animate-float" style="animation-delay: 500ms;">' +
                    '<div class="w-24 h-24 rounded-full bg-neon-green/5 border border-neon-green/10 blur-md"></div>' +
                '</div>' +
                '<div class="glass-card p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden bg-surface-container border border-white/10" style="background: rgba(28, 28, 30, 0.6); backdrop-filter: blur(20px);">' +
                    '<div class="text-center mb-10">' +
                        '<div class="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">' +
                            '<span class="text-primary font-label-md tracking-widest uppercase">Level 2 Selesai</span>' +
                        '</div>' +
                        '<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-extrabold leading-tight mb-2">' +
                            'SELAMAT&nbsp;<br>KAMU LUAR BIASA' +
                        '</h1>' +
                        '<p class="text-on-surface-variant font-body-lg max-w-md mx-auto">' +
                            'Kamu berhasil menguasai Level 2! Otakmu sudah siap untuk naik ke tantangan yang lebih tinggi.' +
                        '</p>' +
                    '</div>' +
                    '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">workspace_premium</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Skor Akhir</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">' + score + '</span>' +
                                '<span class="text-sm font-medium text-primary">XP</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">my_location</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Akurasi</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">' + accuracy + '</span>' +
                                '<span class="text-sm font-medium text-primary">%</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">local_fire_department</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Streak Maks</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">' + maxStreak + '</span>' +
                                '<span class="text-sm font-medium text-primary">x</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="flex flex-col gap-4">' +
                        '<button ' + (accuracy >= 70 ? 'onclick="window.location.href=\\'math-blitz-level-3.html\\'"' : 'disabled') + ' class="h-[50px] w-full rounded-xl font-label-md font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all ' + nextBtnClass + '">' +
                            nextBtnContent +
                        '</button>' +
                        '<button onclick="window.location.reload()" class="h-[50px] w-full rounded-xl border border-on-surface/10 bg-transparent text-on-surface font-label-md font-medium flex items-center justify-center gap-2 hover:bg-on-surface/5 active:scale-[0.98] transition-all"><span class="material-symbols-outlined text-[20px]">replay</span><span>Ulangi Latihan Ini</span></button>' +
                        '<button onclick="window.location.href=\\'math-blitz.html\\'" class="h-[50px] w-full rounded-xl text-on-surface-variant font-label-md hover:bg-on-surface/5 hover:text-on-surface active:scale-[0.98] transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined text-[20px]">home</span><span>Kembali ke Menu Utama</span></button>' +
                    '</div>' +
                    '<div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>' +
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
            particle.style.left = x + "px";
            particle.style.top = y + "px";
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            
            const colors = ['#39ff14', '#ff9500'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = "50%";
            particle.style.boxShadow = "0 0 10px " + particle.style.background;
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "999";
            
            document.body.appendChild(particle);
            
            const duration = Math.random() * 2000 + 1000;
            const targetY = Math.random() * (window.innerHeight / 2);
            
            const animation = particle.animate([
                { transform: \`translate(0, 0) scale(1)\`, opacity: 1 },
                { transform: \`translate(\${Math.random() * 100 - 50}px, -\${y - targetY}px) scale(0)\`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }

        // Keyboard Support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') appendNum(e.key);
            if (e.key === 'Backspace') backspace();
            if (e.key === 'Enter') submitAnswer();
            if (e.key === 'Escape') clearDisplay();
        });

        // Initialize Game
        initGame();
    </script>
`;

html = html.replace(/<script>[\s\S]*?<\/script>/, newScript);

fs.writeFileSync(filePath, html);
console.log("Level 2 logic generated!");
