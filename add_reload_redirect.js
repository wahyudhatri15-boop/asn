const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const reloadScript = `
<script id="reload-redirect">
    // Redirect to main menu on page reload
    if (performance.getEntriesByType("navigation").length > 0) {
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage !== 'index.html' && currentPage !== '') {
                window.location.href = 'index.html';
            }
        }
    }
</script>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if script already exists
    if (!content.includes('id="reload-redirect"')) {
        // Inject right before </head>
        content = content.replace('</head>', reloadScript + '</head>');
        fs.writeFileSync(file, content, 'utf8');
        console.log("Added reload redirect to", file);
    } else {
        console.log("Already exists in", file);
    }
});
