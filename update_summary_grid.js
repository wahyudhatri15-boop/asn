const fs = require('fs');
const filePath = 'c:/Users/ADMIN/.gemini/antigravity/scratch/COC/math-blitz-level-1.html';
let html = fs.readFileSync(filePath, 'utf8');

const oldGrid = 
`                '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-on-surface/5 rounded-xl">' +
                        '<div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">' +
                            '<span class="material-symbols-outlined text-primary/60" style="font-variation-settings: \\'FILL\\' 1;">workspace_premium</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Skor Akhir</span>' +
                        '<span class="font-display text-2xl font-bold text-on-surface">' + score + ' Poin</span>' +
                        '<div class="mt-4 w-8 h-[1px] bg-primary/20"></div>' +
                    '</div>' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-on-surface/5 rounded-xl">' +
                        '<div class="relative w-10 h-10 flex items-center justify-center mb-2">' +
                            '<div class="absolute inset-0 flex items-center justify-center">' +
                                '<span class="text-[12px] font-bold text-primary/80">' + accuracy + '%</span>' +
                            '</div>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Akurasi</span>' +
                        '<span class="font-display text-2xl font-bold text-on-surface">' + accuracy + '%</span>' +
                        '<div class="mt-4 w-8 h-[1px] bg-primary/20"></div>' +
                    '</div>' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-on-surface/5 rounded-xl">' +
                        '<div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">' +
                            '<span class="material-symbols-outlined text-primary/60">local_fire_department</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Streak Tertinggi</span>' +
                        '<span class="font-display text-2xl font-bold text-on-surface">🔥 ' + maxStreak + ' Beruntun</span>' +
                        '<div class="mt-4 w-8 h-[1px] bg-primary/20"></div>' +
                    '</div>' +
                '</div>'`;

const newGrid = 
`                '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                        '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                            '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">workspace_premium</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Skor Akhir</span>' +
                        '<div class="flex items-baseline gap-1">' +
                            '<span class="font-display text-4xl font-bold text-on-surface">\\' + score + \\'</span>' +
                            '<span class="text-sm font-medium text-primary">XP</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                        '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                            '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">my_location</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Akurasi</span>' +
                        '<div class="flex items-baseline gap-1">' +
                            '<span class="font-display text-4xl font-bold text-on-surface">\\' + accuracy + \\'</span>' +
                            '<span class="text-sm font-medium text-primary">%</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="p-4 flex flex-col items-center justify-center transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5">' +
                        '<div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">' +
                            '<span class="material-symbols-outlined text-primary" style="font-variation-settings: \\'FILL\\' 1;">local_fire_department</span>' +
                        '</div>' +
                        '<span class="text-on-surface-variant text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Streak Maks</span>' +
                        '<div class="flex items-baseline gap-1">' +
                            '<span class="font-display text-4xl font-bold text-on-surface">\\' + maxStreak + \\'</span>' +
                            '<span class="text-sm font-medium text-primary">x</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'`;

// Note: I escaped the JS concatenation correctly in newGrid using \\' instead of just '
html = html.replace(oldGrid, newGrid.replace(/\\'/g, "'")); // Safely replace standard strings

fs.writeFileSync(filePath, html);
console.log("UI Grid updated!");
