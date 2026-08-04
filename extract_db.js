const fs = require('fs');

function generateMathDB() {
    let db = {};
    
    // Level 1: Fractions
    let lvl1 = [];
    const denominators = [3, 4, 5, 6, 7, 8, 9, 11];
    denominators.forEach(d => {
        for (let n = 1; n < d; n++) {
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            if (gcd(n, d) !== 1) continue;
            let decimal = n / d;
            let ansStr = (d === 8) ? decimal.toFixed(3) : decimal.toFixed(2);
            
            let options = new Set();
            options.add(ansStr);
            while(options.size < 4) {
                let fakeN = n + Math.floor(Math.random() * 5) - 2;
                if(fakeN <= 0) fakeN = 1;
                let fakeD = d + Math.floor(Math.random() * 3) - 1;
                if(fakeD <= 0) fakeD = 1;
                let fakeVal = fakeN / fakeD;
                if(fakeVal !== decimal) {
                    options.add((d === 8) ? fakeVal.toFixed(3) : fakeVal.toFixed(2));
                }
            }
            
            lvl1.push({ q: `\\frac{${n}}{${d}}`, a: ansStr, options: Array.from(options) });
        }
    });
    db.level1 = lvl1.sort(() => Math.random() - 0.5).slice(0, 15);
    
    // Level 2: Add/Sub
    let lvl2 = [];
    for(let i=0; i<15; i++) {
        let op = Math.random() > 0.5 ? '+' : '-';
        let a = Math.floor(Math.random() * 50) + 10;
        let b = Math.floor(Math.random() * 50) + 10;
        if(op === '-') {
            if(a < b) { let temp = a; a = b; b = temp; }
        }
        let ans = op === '+' ? a + b : a - b;
        lvl2.push({ question: `${a} ${op} ${b} = ?`, answer: ans.toString() });
    }
    db.level2 = lvl2;
    
    // Level 3: Mul/Div
    let lvl3 = [];
    for(let i=0; i<15; i++) {
        let op = Math.random() > 0.5 ? '*' : '/';
        let a, b, ans;
        if (op === '*') {
            a = Math.floor(Math.random() * 12) + 2;
            b = Math.floor(Math.random() * 12) + 2;
            ans = a * b;
        } else {
            b = Math.floor(Math.random() * 10) + 2;
            ans = Math.floor(Math.random() * 12) + 2;
            a = b * ans;
        }
        lvl3.push({ question: `${a} ${op === '*' ? '\\times' : '\\div'} ${b} = ?`, answer: ans.toString() });
    }
    db.level3 = lvl3;
    
    // Level 4: Mixed
    let lvl4 = [];
    for(let i=0; i<15; i++) {
        let a = Math.floor(Math.random() * 20) + 5;
        let b = Math.floor(Math.random() * 10) + 2;
        let c = Math.floor(Math.random() * 10) + 2;
        let ans = a + (b * c);
        lvl4.push({ question: `${a} + ${b} \\times ${c} = ?`, answer: ans.toString() });
    }
    db.level4 = lvl4;
    
    // Level 5: Complex
    let lvl5 = [];
    for(let i=0; i<15; i++) {
        let a = Math.floor(Math.random() * 10) + 2;
        let ans = a * a;
        lvl5.push({ question: `${ans} = ?^2`, answer: a.toString() });
    }
    db.level5 = lvl5;
    
    const jsCode = `const defaultMathBlitzDB = ${JSON.stringify(db, null, 2)};`;
    fs.writeFileSync('default_math_db.js', jsCode, 'utf8');
}

generateMathDB();
console.log("Successfully generated default DB with LaTeX.");
