const fs = require('fs');
let html = fs.readFileSync('math-blitz-level-2.html', 'utf8');

// Replace Level 2 with Level 3
html = html.replace(/Level 2/g, 'Level 3');

const newLogic = `        function generateTerm() {
            let d = [1, 2, 4, 5, 8, 10][Math.floor(Math.random() * 6)];
            let n = Math.floor(Math.random() * 20) + 1;
            return { val: n/d, str: d === 1 ? String(n) : n + '/' + d };
        }

        function generateQuestionAddSub() {
            let isValid = false;
            let answer = 0;
            let str = '';
            while(!isValid) {
                let t1 = generateTerm();
                let t2 = generateTerm();
                let t3 = generateTerm();
                let ops = ['+', '-'];
                let op1 = ops[Math.floor(Math.random() * 2)];
                let op2 = ops[Math.floor(Math.random() * 2)];
                
                let v1 = t1.val;
                let v2 = t2.val;
                let v3 = t3.val;
                
                let temp = (op1 === '+') ? (v1 + v2) : (v1 - v2);
                answer = (op2 === '+') ? (temp + v3) : (temp - v3);
                
                let rounded = Math.round(answer * 1000) / 1000;
                let hasFraction = t1.str.includes('/') || t2.str.includes('/') || t3.str.includes('/');
                if (hasFraction && answer >= 0 && answer <= 40 && Number.isInteger(answer) && Math.abs(rounded - answer) < 0.000001) {
                    str = t1.str + ' ' + op1 + ' ' + t2.str + ' ' + op2 + ' ' + t3.str;
                    isValid = true;
                }
            }
            return { question: str, answer: String(answer) };
        }

        function generateQuestionMulDiv() {
            let isValid = false;
            let answer = 0;
            let str = '';
            while(!isValid) {
                let t1 = generateTerm();
                let t2 = generateTerm();
                let t3 = generateTerm();
                let ops = ['×', '÷'];
                let op1 = ops[Math.floor(Math.random() * 2)];
                let op2 = ops[Math.floor(Math.random() * 2)];
                
                let v1 = t1.val;
                let v2 = t2.val;
                let v3 = t3.val;
                
                let temp = (op1 === '×') ? (v1 * v2) : (v1 / v2);
                answer = (op2 === '×') ? (temp * v3) : (temp / v3);
                
                let rounded = Math.round(answer * 1000) / 1000;
                let hasFraction = t1.str.includes('/') || t2.str.includes('/') || t3.str.includes('/');
                if (hasFraction && answer > 0 && answer <= 60 && Number.isInteger(answer) && Math.abs(rounded - answer) < 0.000001) {
                    str = t1.str + ' ' + op1 + ' ' + t2.str + ' ' + op2 + ' ' + t3.str;
                    isValid = true;
                }
            }
            return { question: str, answer: String(answer) };
        }`;

html = html.replace(/        function generateQuestionAddSub\(\) \{[\s\S]*?function generateQuestionMulDiv\(\) \{[\s\S]*?return \{ question: questionStr, answer: String\(answer\) \};\n        \}/, newLogic);

html = html.replace(/<a href="#" class="px-8 py-4 rounded-2xl font-label-lg font-bold transition-all duration-300 ' \+ nextBtnClass \+ ' flex items-center justify-center gap-2">\s*' \+\s*nextBtnContent \+\s*'<\/a>/, 
    '<a href="math-blitz.html" class="px-8 py-4 rounded-2xl font-label-lg font-bold transition-all duration-300 \' + nextBtnClass + \' flex items-center justify-center gap-2">\' +\n' +
    '\'<span class="material-symbols-outlined">home</span><span>Kembali ke Menu</span>\' +\n' +
    '\'</a>');

fs.writeFileSync('math-blitz-level-3.html', html);
