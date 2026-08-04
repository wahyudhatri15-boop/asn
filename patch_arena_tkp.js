const fs = require('fs');

let html = fs.readFileSync('arena-battle.html', 'utf8');

const oldLogic = `        let correctCount = 0;
        let wrongCount = 0;
        let emptyCount = 0;
        
        const labels = ['A', 'B', 'C', 'D', 'E'];
        
        for (let i = 0; i < totalQuestions; i++) {
            const qData = dbQuestions[i];
            const selectedLabel = userAnswers[i + 1];
            
            if (!selectedLabel) {
                emptyCount++;
            } else {
                let isCorrect = false;
                if (qData.key && selectedLabel === qData.key) {
                    isCorrect = true;
                } else if (qData.a && qData.options) {
                    const selectedIndex = labels.indexOf(selectedLabel);
                    if (selectedIndex !== -1 && qData.options[selectedIndex] === qData.a) {
                        isCorrect = true;
                    }
                }
                
                if (isCorrect) {
                    correctCount++;
                } else {
                    wrongCount++;
                }
            }
        }
        
        // Calculate score: each correct is 5 points
        const score = correctCount * 5;
        const maxScore = totalQuestions * 5;`;

const newLogic = `        let correctCount = 0;
        let wrongCount = 0;
        let emptyCount = 0;
        let score = 0;
        
        const labels = ['A', 'B', 'C', 'D', 'E'];
        
        for (let i = 0; i < totalQuestions; i++) {
            const qData = dbQuestions[i];
            const selectedLabel = userAnswers[i + 1];
            
            if (!selectedLabel) {
                emptyCount++;
            } else {
                let isCorrect = false;
                const selectedIndex = labels.indexOf(selectedLabel);
                
                if (activeQuizCategory === 'TKP') {
                    let pts = 0;
                    if (qData.tkpScores && selectedIndex !== -1 && selectedIndex < qData.tkpScores.length) {
                        pts = parseInt(qData.tkpScores[selectedIndex]) || 0;
                    }
                    score += pts;
                    if (pts === 5) {
                        isCorrect = true; // For stats, 5 points is considered "Correct"
                    }
                } else {
                    if (qData.key && selectedLabel === qData.key) {
                        isCorrect = true;
                    } else if (qData.a && qData.options) {
                        if (selectedIndex !== -1 && qData.options[selectedIndex] === qData.a) {
                            isCorrect = true;
                        }
                    }
                    if (isCorrect) score += 5;
                }
                
                if (isCorrect) {
                    correctCount++;
                } else {
                    wrongCount++;
                }
            }
        }
        
        const maxScore = totalQuestions * 5;`;

html = html.replace(oldLogic, newLogic);
fs.writeFileSync('arena-battle.html', html);
console.log('arena-battle.html scoring logic updated');
