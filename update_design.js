const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let mathHtml = fs.readFileSync('math-blitz.html', 'utf8');

// 1. Replace tailwind config
const tailwindConfigMatch = indexHtml.match(/<script id="tailwind-config">[\s\S]*?<\/script>/);
if (tailwindConfigMatch) {
    mathHtml = mathHtml.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, tailwindConfigMatch[0]);
}

// 2. Remove hardcoded <style> block (to use tailwind exactly like main page)
mathHtml = mathHtml.replace(/<style>[\s\S]*?<\/style>/, '');

// 3. Update body tag
mathHtml = mathHtml.replace(/<body.*?>/, '<body class="text-on-background font-body-lg min-h-screen relative bg-background">');

// 4. Replace custom class "glass-card" with equivalent Tailwind classes used in main page
mathHtml = mathHtml.replace(/glass-card/g, 'bg-surface-container border border-white/10 hover:border-primary/50 hover:bg-surface-container-high transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-primary/5');

// 5. Replace custom class "active-press"
mathHtml = mathHtml.replace(/active-press/g, 'active:scale-95');

fs.writeFileSync('math-blitz.html', mathHtml);
console.log("Successfully aligned math-blitz.html design language with index.html.");
