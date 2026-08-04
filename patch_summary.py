import os
import re

directory = "c:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\COC"
files = [f for f in os.listdir(directory) if f.endswith('.html') and ('level-' in f)]

for file in files:
    filepath = os.path.join(directory, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    arenaType = 0
    level = 0
    storageKey = 'globalStreakPoints'
    
    if file.startswith('math-blitz'):
        arenaType = 5
        storageKey = 'mathBlitzStreakPoints'
    elif file.startswith('the-alchemist'):
        arenaType = 5
        storageKey = 'theAlchemistStreakPoints'
    elif file.startswith('word-equation'):
        arenaType = 3
        storageKey = 'wordEquationStreakPoints'
        
    m = re.search(r'level-(\d+)', file)
    if m:
        level = int(m.group(1))
        
    if arenaType == 0:
        continue
        
    if arenaType == 5:
        if level == 1: mult = "1"
        elif level == 2: mult = "1.5"
        elif level == 3: mult = "2"
        elif level == 4: mult = "2.5"
        elif level == 5: mult = "3"
    else:
        mult = str(level)
        
    streak_logic = f"""
        // --- STREAK POINTS CALCULATION ---
        let addedPoints = 0;
        let cAnswers = 0;
        if (typeof correctAnswersCount !== 'undefined') cAnswers = correctAnswersCount;
        else if (typeof correctAnswers !== 'undefined') cAnswers = correctAnswers;
        
        if (cAnswers > 0) {{
            let baseScore = cAnswers * 10;
            let multiplier = {mult};
            addedPoints = Math.round(baseScore * multiplier);
            
            let currentPts = parseInt(localStorage.getItem('{storageKey}')) || 0;
            localStorage.setItem('{storageKey}', currentPts + addedPoints);
        }}
        
        let totalPtsObj = document.getElementById('header-streak-points');
        if (totalPtsObj) {{
             let totalPts = (parseInt(localStorage.getItem('mathBlitzStreakPoints')) || 0) + 
                            (parseInt(localStorage.getItem('theAlchemistStreakPoints')) || 0) + 
                            (parseInt(localStorage.getItem('wordEquationStreakPoints')) || 0);
             totalPtsObj.innerText = totalPts;
        }}
        if (typeof updateHeaderStreakPoints === 'function') updateHeaderStreakPoints();
        // ---------------------------------
"""
    
    # Clean up any existing streak logic to avoid duplicates
    content = re.sub(r'// --- STREAK POINTS CALCULATION ---[\s\S]*?// ---------------------------------', '', content)
    
    # Insert logic right after `function endGame() {` or `const accuracy = ...`
    # Let's find `const accuracy = Math.round`
    if 'const accuracy = Math.round' in content:
        content = content.replace('const accuracy = Math.round', streak_logic + '\n            const accuracy = Math.round', 1)
    elif 'function endGame() {' in content:
        content = content.replace('function endGame() {', 'function endGame() {\n' + streak_logic, 1)

    # Now replace the Grid
    # We will match the entire grid block
    grid_pattern = r'\'<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">\' \+[\s\S]*?\'</div>\' \+\n\s*\'<div class="flex flex-col gap-4">\' \+'
    
    new_grid = """'<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">' +
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
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">local_fire_department</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Nilai Streak</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">+' + addedPoints + '</span>' +
                                '<span class="text-sm font-medium text-primary">Pts</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                            '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                                '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">timer</span>' +
                            '</div>' +
                            '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Akurasi Waktu</span>' +
                            '<div class="flex items-baseline gap-1">' +
                                '<span class="font-display text-4xl font-bold text-on-surface">' + (typeof timeAccuracy !== 'undefined' ? timeAccuracy : accuracy) + '</span>' +
                                '<span class="text-sm font-medium text-primary">%</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="flex flex-col gap-4">' +"""
                    
    content = re.sub(grid_pattern, new_grid, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Patched {file}")
