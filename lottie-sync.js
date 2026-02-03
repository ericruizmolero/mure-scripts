
(function() {
    const strings = [
        'Score payment streams with ML models, enforce policies',
        'Embed docs in vectors, RAG agents retrieve, LLM responds',
        'Run notebook ML jobs, eval models, deploy via MLOps',
        'Transform data with SQL to tables, catalog assets, monitor'
    ];

    const element = document.getElementById('text-build');
    if (!element) {
        console.error('Element #text-build not found');
        return;
    }
    
    let currentIndex = 0;

    function typeString(text, duration, callback) {
        element.textContent = '';
        const chars = text.split('');
        const totalChars = chars.length;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const charsToShow = Math.floor(progress * totalChars);
            
            element.textContent = chars.slice(0, charsToShow).join('');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = text;
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(animate);
    }

    function eraseString(callback) {
        const text = element.textContent;
        const chars = text.split('');
        const duration = 500;  // ✅ 500ms borrar
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const charsToShow = chars.length - Math.floor(progress * chars.length);
            
            element.textContent = chars.slice(0, charsToShow).join('');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = '';
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(animate);
    }

    function loop() {
        const currentString = strings[currentIndex];
        
        typeString(currentString, 2000, () => {      // 2s escribir
            setTimeout(() => {                        // 0.1s pausa
                console.log('String completado - Lottie empieza');
                
                setTimeout(() => {                    // 4s mantener
                    eraseString(() => {               // 0.5s borrar
                        currentIndex = (currentIndex + 1) % strings.length;
                        setTimeout(loop, 500);        // 0.5s antes de siguiente
                    });
                }, 6000);
            }, 100);
        });
    }

    setTimeout(loop, 500);
})();
