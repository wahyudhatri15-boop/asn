const fs = require('fs');
const path = require('path');

const level1Pool = `[
    { q: "Mobil : Bensin = Manusia : [ ? ]", a: "Makanan", options: ["Air", "Oksigen", "Rumah"] },
    { q: "Ikan : Air = Burung : [ ? ]", a: "Udara", options: ["Pohon", "Sangkar", "Sayap"] },
    { q: "Mata : Melihat = Telinga : [ ? ]", a: "Mendengar", options: ["Berbicara", "Merasa", "Mencium"] },
    { q: "Siang : Terang = Malam : [ ? ]", a: "Gelap", options: ["Tidur", "Bintang", "Dingin"] },
    { q: "Guru : Sekolah = Dokter : [ ? ]", a: "Rumah Sakit", options: ["Pasien", "Obat", "Klinik"] },
    { q: "Buku : Membaca = Pena : [ ? ]", a: "Menulis", options: ["Tinta", "Menggambar", "Kertas"] },
    { q: "Api : Panas = Es : [ ? ]", a: "Dingin", options: ["Cair", "Keras", "Beku"] },
    { q: "Kucing : Mengeong = Anjing : [ ? ]", a: "Menggonggong", options: ["Menggigit", "Berlari", "Melompat"] },
    { q: "Sepatu : Kaki = Topi : [ ? ]", a: "Kepala", options: ["Rambut", "Tangan", "Leher"] },
    { q: "Lapar : Makan = Haus : [ ? ]", a: "Minum", options: ["Air", "Gelas", "Susu"] },
    { q: "Bunga : Taman = Pohon : [ ? ]", a: "Hutan", options: ["Kayu", "Daun", "Buah"] },
    { q: "Pensil : Kertas = Kapur : [ ? ]", a: "Papan Tulis", options: ["Penghapus", "Debu", "Putih"] },
    { q: "Roda : Kendaraan = Layar : [ ? ]", a: "Perahu", options: ["Angin", "Bioskop", "Gambar"] },
    { q: "Kayu : Lemari = Kain : [ ? ]", a: "Pakaian", options: ["Benang", "Kapas", "Selimut"] },
    { q: "Senang : Tertawa = Sedih : [ ? ]", a: "Menangis", options: ["Murung", "Marah", "Kecewa"] }
]`;

const level2Pool = `[
    { q: "Hangat : Panas = Berbisik : [ ? ]", a: "Berteriak", options: ["Menangis", "Terdiam", "Berjalan"] },
    { q: "Senyum : Tawa = Marah : [ ? ]", a: "Mengamuk", options: ["Menangis", "Sedih", "Kesal"] },
    { q: "Baik : Sempurna = Buruk : [ ? ]", a: "Hancur", options: ["Jahat", "Salah", "Jelek"] },
    { q: "Rajin : Pintar = Malas : [ ? ]", a: "Bodoh", options: ["Miskin", "Gagal", "Lambat"] },
    { q: "Kayu : Arang = Kertas : [ ? ]", a: "Abu", options: ["Tinta", "Buku", "Tulisan"] },
    { q: "Benih : Pohon = Telur : [ ? ]", a: "Ayam", options: ["Burung", "Sarang", "Menetas"] },
    { q: "Sedih : Depresi = Takut : [ ? ]", a: "Fobia", options: ["Lari", "Teriak", "Cemas"] },
    { q: "Gembira : Euforia = Kecewa : [ ? ]", a: "Putus Asa", options: ["Sedih", "Marah", "Menangis"] },
    { q: "Jalan : Lari = Angin : [ ? ]", a: "Badai", options: ["Hujan", "Sejuk", "Udara"] },
    { q: "Pandai : Jenius = Cantik : [ ? ]", a: "Mempesona", options: ["Rapi", "Bersih", "Menarik"] },
    { q: "Anak : Remaja = Pagi : [ ? ]", a: "Siang", options: ["Sore", "Malam", "Fajar"] },
    { q: "Berani : Nekat = Hemat : [ ? ]", a: "Pelit", options: ["Kaya", "Menabung", "Uang"] },
    { q: "Lelah : Istirahat = Bingung : [ ? ]", a: "Bertanya", options: ["Menyerah", "Diam", "Berpikir"] },
    { q: "Merah : Berhenti = Hijau : [ ? ]", a: "Berjalan", options: ["Maju", "Aman", "Terang"] },
    { q: "Hujan : Banjir = Kemarau : [ ? ]", a: "Kekeringan", options: ["Panas", "Gersang", "Berdebu"] }
]`;

const level3Pool = `[
    { q: "[ ? ] : Benang = Dinding : [ ? ]", a: "Kain & Bata", options: ["Jarum & Pasir", "Sutra & Semen", "Baju & Kayu"] },
    { q: "[ ? ] : Langit = Kapal : [ ? ]", a: "Pesawat & Laut", options: ["Burung & Air", "Bintang & Pelabuhan", "Matahari & Nahkoda"] },
    { q: "[ ? ] : Siang = Bulan : [ ? ]", a: "Matahari & Malam", options: ["Panas & Gelap", "Terang & Bintang", "Awan & Tidur"] },
    { q: "[ ? ] : Telinga = Kacamata : [ ? ]", a: "Anting & Mata", options: ["Suara & Hidung", "Mendengar & Melihat", "Musik & Wajah"] },
    { q: "[ ? ] : Pohon = Halaman : [ ? ]", a: "Daun & Buku", options: ["Akar & Kata", "Hutan & Kertas", "Ranting & Cerita"] },
    { q: "[ ? ] : Sakit = Senyum : [ ? ]", a: "Menangis & Bahagia", options: ["Obat & Tertawa", "Dokter & Sedih", "Luka & Gigi"] },
    { q: "[ ? ] : Garasi = Pesawat : [ ? ]", a: "Mobil & Hangar", options: ["Motor & Bandara", "Sepeda & Landasan", "Jalan & Terbang"] },
    { q: "[ ? ] : Tulang = Rangka : [ ? ]", a: "Kalsium & Bangunan", options: ["Daging & Besi", "Otot & Fondasi", "Sendi & Baja"] },
    { q: "[ ? ] : Gitar = Tutup : [ ? ]", a: "Senar & Panci", options: ["Musik & Botol", "Suara & Buka", "Pemetik & Kaca"] },
    { q: "[ ? ] : Hutan = Air : [ ? ]", a: "Pohon & Laut", options: ["Hewan & Kolam", "Hijau & Biru", "Gelap & Sungai"] },
    { q: "[ ? ] : Cepat = Kura-kura : [ ? ]", a: "Kelinci & Lambat", options: ["Lari & Siput", "Kilat & Jalur", "Mobil & Cangkang"] },
    { q: "[ ? ] : Kertas = Kanvas : [ ? ]", a: "Pena & Kuas", options: ["Buku & Lukisan", "Tinta & Cat", "Surat & Galeri"] },
    { q: "[ ? ] : Kamera = Mata : [ ? ]", a: "Lensa & Kornea", options: ["Foto & Kacamata", "Cahaya & Alis", "Gambar & Pandangan"] },
    { q: "[ ? ] : Dingin = Api : [ ? ]", a: "Es & Panas", options: ["Salju & Merah", "Kutub & Bara", "Kulkas & Bakar"] },
    { q: "[ ? ] : Burung = Berenang : [ ? ]", a: "Terbang & Ikan", options: ["Sayap & Sirip", "Bulu & Sisik", "Udara & Laut"] }
]`;

const generateScript = (pool, timeLimit, sectorMsg) => `
<script>
    const pool = ${pool};

    let questions = [];
    let currentQuestionIndex = 0;
    let lives = 5;
    const timeLimit = ${timeLimit};
    let timeoutHandler = null;
    let countdownInterval = null;

    const timerBar = document.getElementById('timer-bar');
    const timerText = document.getElementById('timer-text');
    const cyberBox = document.getElementById('cyber-box');
    const questionText = document.getElementById('question-text');
    const progressBar = document.getElementById('progress-bar');
    const lifeBar = document.getElementById('life-bar');
    const canvas = document.getElementById('game-canvas');

    function initGame() {
        let shuffled = [...pool].sort(() => Math.random() - 0.5);
        questions = shuffled.slice(0, 10);
        currentQuestionIndex = 0;
        lives = 5;
        
        // Reset Life Bar
        const hearts = lifeBar.querySelectorAll('.material-symbols-outlined');
        hearts.forEach(h => {
            h.classList.add('text-error');
            h.classList.remove('text-outline-variant');
            h.style.variationSettings = "'FILL' 1";
        });
        
        loadQuestion(currentQuestionIndex);
    }

    function loadQuestion(index) {
        if (index >= questions.length) {
            alert("${sectorMsg}");
            window.location.href = "word-equation.html";
            return;
        }

        const q = questions[index];
        // Render question text with highlight
        questionText.innerHTML = q.q.replace(/\\[ \\? \\]/g, '<span class="animate-pulse text-primary-container" style="color: rgb(255, 149, 0);">[ ? ]</span>');

        // Render progress bar
        let progressHtml = "";
        for (let i = 0; i < questions.length; i++) {
            if (i < index) {
                progressHtml += '<div class="h-1.5 w-8 rounded-full bg-primary opacity-50"></div>';
            } else if (i === index) {
                progressHtml += '<div class="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(255,149,0,0.8)]"></div>';
            } else {
                progressHtml += '<div class="h-1.5 w-8 rounded-full bg-white/20"></div>';
            }
        }
        if (progressBar) progressBar.innerHTML = progressHtml;

        // Render buttons
        let allOptions = [q.a, ...q.options];
        allOptions.sort(() => Math.random() - 0.5);

        let buttonsHtml = "";
        allOptions.forEach(opt => {
            const isCorrect = (opt === q.a);
            buttonsHtml += \`<button class="group bg-white/5 border border-white/10 rounded-2xl py-8 px-8 transition-all duration-200 active:scale-95 flex items-center justify-center answer-btn" onclick="handleAnswer(\${isCorrect}, this)"><span class="font-headline-md text-on-surface transition-colors group-hover:text-primary">\${opt}</span></button>\`;
        });
        cyberBox.innerHTML = buttonsHtml;

        // Reset Timer
        timerText.innerText = timeLimit;
        timerBar.style.animation = 'none';
        void timerBar.offsetWidth; // trigger reflow
        timerBar.style.animation = \`countdown \${timeLimit}s linear forwards\`;
        
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(() => {
            triggerIncorrect();
        }, timeLimit * 1000);

        // Update timer text every second
        let timeLeft = timeLimit;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) timerText.innerText = timeLeft;
            if (timeLeft <= 0) clearInterval(countdownInterval);
        }, 1000);
    }

    function handleAnswer(isCorrect, element) {
        clearTimeout(timeoutHandler);
        clearInterval(countdownInterval);
        timerBar.style.animationPlayState = 'paused';
        
        // Disable buttons
        document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);

        if (isCorrect) {
            document.body.classList.add('screen-flash-green');
            setTimeout(() => document.body.classList.remove('screen-flash-green'), 200);
            element.classList.add('border-primary', 'shadow-[0_0_15px_rgba(16,185,129,0.3)]', 'bg-primary/20');
            
            setTimeout(() => {
                canvas.classList.add('swipe-transition');
                setTimeout(() => {
                    canvas.classList.remove('swipe-transition');
                    currentQuestionIndex++;
                    loadQuestion(currentQuestionIndex);
                }, 400);
            }, 250);
        } else {
            triggerIncorrect(element);
        }
    }

    function triggerIncorrect(element = null) {
        document.body.classList.add('screen-flash-red');
        setTimeout(() => document.body.classList.remove('screen-flash-red'), 500);
        
        clearTimeout(timeoutHandler);
        clearInterval(countdownInterval);
        timerBar.style.animationPlayState = 'paused';

        if (lives > 0) {
            const hearts = lifeBar.querySelectorAll('.material-symbols-outlined');
            if (hearts.length >= lives) {
                hearts[lives - 1].classList.remove('text-error');
                hearts[lives - 1].classList.add('text-outline-variant');
                hearts[lives - 1].style.variationSettings = "'FILL' 0";
            }
            lives--;
        }

        if (element) {
            element.classList.add('border-error', 'shake-animation', 'bg-red-500/20');
        } else {
            cyberBox.classList.add('shake-animation');
            setTimeout(() => cyberBox.classList.remove('shake-animation'), 400);
        }

        if (lives === 0) {
            setTimeout(() => {
                alert("System Failure. Mission Compromised.");
                window.location.href = "word-equation.html";
            }, 600);
        } else {
            setTimeout(() => {
                canvas.classList.add('swipe-transition');
                setTimeout(() => {
                    canvas.classList.remove('swipe-transition');
                    currentQuestionIndex++;
                    loadQuestion(currentQuestionIndex);
                }, 400);
            }, 250);
        }
    }

    document.addEventListener('DOMContentLoaded', initGame);
</script>
`;

function processFile(filename, poolCode, timeLimit, sectorMsg) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Replace script part
    const scriptStart = content.indexOf('<script>\n        let lives = 5;');
    if(scriptStart !== -1) {
        content = content.substring(0, scriptStart) + generateScript(poolCode, timeLimit, sectorMsg) + "\n" + content.substring(content.indexOf('</script>', scriptStart) + 9);
    }

    // Add progress bar container and id for question text and timer text if they don't exist
    
    // 1. Add id="question-text" to h1
    if (!content.includes('id="question-text"')) {
        content = content.replace(/<h1 class="font-display ([^"]+)" style="font-family: serif;">([\s\S]*?)<\/h1>/, '<h1 class="font-display $1" style="font-family: serif;" id="question-text">$2</h1>');
    }
    // 2. Add id="timer-text" to span for timer
    if (!content.includes('id="timer-text"')) {
        content = content.replace(/<span class="font-mono text-primary font-bold tracking-tighter" style="([^"]+)">(\d+)<\/span>/, '<span class="font-mono text-primary font-bold tracking-tighter" style="$1" id="timer-text">$2</span>');
    }
    // 3. Add progress-bar
    if (!content.includes('id="progress-bar"')) {
        // Find end of flex container for timer and add progress bar below it
        content = content.replace(/(<span class="font-mono text-primary font-bold tracking-tighter"[^>]+>\d+<\/span>\s*<\/div>)/, '$1\n<div id="progress-bar" class="flex justify-center gap-2 mt-8"></div>');
    }
    
    fs.writeFileSync(filename, content, 'utf8');
    console.log("Updated", filename);
}

processFile('word-equation-level-1.html', level1Pool, 10, "Logic Correct. Advancing to Sector 2.");
processFile('word-equation-level-2.html', level2Pool, 10, "Logic Correct. Advancing to Sector 3.");
processFile('word-equation-level-3.html', level3Pool, 15, "Logic Correct. Sector Cleared.");
