const fs = require('fs');

const generateQuestions = () => {
    const fractions = [
        { num: 1, den: 2, dec: 0.5 },
        { num: 1, den: 4, dec: 0.25 },
        { num: 3, den: 4, dec: 0.75 },
        { num: 1, den: 5, dec: 0.2 },
        { num: 2, den: 5, dec: 0.4 },
        { num: 3, den: 5, dec: 0.6 },
        { num: 4, den: 5, dec: 0.8 },
        { num: 1, den: 10, dec: 0.1 },
        { num: 3, den: 10, dec: 0.3 },
        { num: 7, den: 10, dec: 0.7 },
        { num: 9, den: 10, dec: 0.9 },
        { num: 11, den: 20, dec: 0.55 },
        { num: 9, den: 20, dec: 0.45 },
        { num: 11, den: 25, dec: 0.44 },
        { num: 1, den: 8, dec: 0.125 },
        { num: 3, den: 8, dec: 0.375 },
    ];

    const questions = [];

    while (questions.length < 50) {
        const frac = fractions[Math.floor(Math.random() * fractions.length)];
        
        const mixedInt = Math.floor(Math.random() * 5) + 1;
        const mixedVal = mixedInt + frac.dec;
        const mixedStr = `${mixedInt} \\frac{${frac.num}}{${frac.den}}`;

        const addDecimal = Math.random() > 0.5;
        let decimalVal, decimalStr;

        if (addDecimal) {
            const neededDec = 1 - frac.dec;
            const decInt = Math.floor(Math.random() * 4) + 1;
            decimalVal = decInt + neededDec;
        } else {
            const neededDec = frac.dec;
            const decInt = Math.floor(Math.random() * 4) + 1;
            decimalVal = decInt + neededDec;
        }
        
        decimalStr = decimalVal.toFixed(3).replace(/\.?0+$/, '');

        let qStr;
        let finalAns;

        // Two terms only
        const randLayout = Math.random();
        
        if (randLayout < 0.25) {
            // Mixed + Decimal
            qStr = `${mixedStr} + ${decimalStr} = ?`;
            finalAns = mixedVal + decimalVal;
        } else if (randLayout < 0.5) {
            // Decimal + Mixed
            qStr = `${decimalStr} + ${mixedStr} = ?`;
            finalAns = decimalVal + mixedVal;
        } else if (randLayout < 0.75) {
            // Mixed - Decimal
            qStr = `${mixedStr} - ${decimalStr} = ?`;
            finalAns = mixedVal - decimalVal;
        } else {
            // Decimal - Mixed
            qStr = `${decimalStr} - ${mixedStr} = ?`;
            finalAns = decimalVal - mixedVal;
        }

        finalAns = Math.round(finalAns);
        
        // Ensure strictly non-negative answer
        if (finalAns < 0) {
            continue;
        }

        questions.push({
            question: qStr,
            answer: finalAns.toString()
        });
    }
    return questions;
};

const dbFile = 'default_math_db.js';
let dbContent = fs.readFileSync(dbFile, 'utf8');

const newLevel2 = generateQuestions();
const newLevel2Json = JSON.stringify(newLevel2, null, 4).replace(/^/gm, '    ');

const regex = /"level2": \[\s*\{[\s\S]*?\}\s*\],/m;
dbContent = dbContent.replace(regex, `"level2": ${newLevel2Json.trim()},`);

fs.writeFileSync(dbFile, dbContent, 'utf8');
console.log('Regenerated default_math_db.js with 2-term level 2 questions.');
