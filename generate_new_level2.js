const fs = require('fs');

const generateLevel2Data = () => {
    const part1 = [];
    const part2 = [];

    // Part 1: Addition/Subtraction of Fraction and Regular Number
    for (let i = 0; i < 50; i++) {
        const intVal = Math.floor(Math.random() * 8) + 2; 
        const den = Math.floor(Math.random() * 4) + 2; 
        const num = intVal * den;
        const fracStr = `\\frac{${num}}{${den}}`; 

        const regNum = Math.floor(Math.random() * 10) + 1;
        const isAdd = Math.random() > 0.5;
        const fractionFirst = Math.random() > 0.5;

        let qStr, ans;

        if (isAdd) {
            if (fractionFirst) {
                qStr = `${fracStr} + ${regNum} = ?`;
            } else {
                qStr = `${regNum} + ${fracStr} = ?`;
            }
            ans = intVal + regNum;
        } else {
            if (fractionFirst) {
                let safeReg = regNum;
                if (intVal - safeReg < 0) {
                    safeReg = intVal; 
                }
                qStr = `${fracStr} - ${safeReg} = ?`;
                ans = intVal - safeReg;
            } else {
                let safeReg = regNum;
                if (safeReg - intVal < 0) {
                    safeReg = intVal + Math.floor(Math.random() * 5); 
                }
                qStr = `${safeReg} - ${fracStr} = ?`;
                ans = safeReg - intVal;
            }
        }
        
        part1.push({ question: qStr, answer: ans.toString() });
    }

    // Part 2: Division involving Fractions
    for (let i = 0; i < 50; i++) {
        let type = Math.floor(Math.random() * 3);
        let qStr, ans;

        if (type === 0) {
            // Regular / Fraction -> a / (b/c) = (a*c)/b
            const den = Math.floor(Math.random() * 4) + 2; 
            const num = Math.floor(Math.random() * 4) + 1; 
            ans = Math.floor(Math.random() * 9) + 2; 
            
            let safeAns = ans * den; 
            let reg = (safeAns * num) / den; 
            
            qStr = `${reg} \\div \\frac{${num}}{${den}} = ?`;
            ans = safeAns;
        } else if (type === 1) {
            // Fraction / Fraction -> (a/b) / (c/b) = a/c
            const den = Math.floor(Math.random() * 4) + 2;
            const c = Math.floor(Math.random() * 3) + 2;
            ans = Math.floor(Math.random() * 8) + 2;
            const a = ans * c;
            
            qStr = `\\frac{${a}}{${den}} \\div \\frac{${c}}{${den}} = ?`;
        } else {
            // Fraction / Regular -> (a/b) / c = a / (b*c)
            // For ans to be integer, 'a' must be divisible by 'b*c'.
            const b = Math.floor(Math.random() * 4) + 2; // den
            const c = Math.floor(Math.random() * 5) + 2; // reg num
            ans = Math.floor(Math.random() * 8) + 2; // answer
            
            const a = ans * (b * c);
            
            qStr = `\\frac{${a}}{${b}} \\div ${c} = ?`;
        }
        
        part2.push({ question: qStr, answer: ans.toString() });
    }

    return { part1, part2 };
};

const dbFile = 'default_math_db.js';
let dbContent = fs.readFileSync(dbFile, 'utf8');

const { part1, part2 } = generateLevel2Data();
const p1Json = JSON.stringify(part1, null, 4).replace(/^/gm, '    ');
const p2Json = JSON.stringify(part2, null, 4).replace(/^/gm, '    ');

const regex = /"level2_part1": \[\s*\{[\s\S]*?\}\s*\],\n    "level2_part2": \[\s*\{[\s\S]*?\}\s*\]/m;
dbContent = dbContent.replace(regex, `"level2_part1": ${p1Json.trim()},\n    "level2_part2": ${p2Json.trim()}`);

fs.writeFileSync(dbFile, dbContent, 'utf8');
console.log('Updated default_math_db.js with all division types in part 2.');
