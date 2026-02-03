(function() {
    const strings = [
        'Embed docs in vectors, RAG agents retrieve, LLM responds',
        'Run notebook ML jobs, eval models, deploy via MLOps',
        'Transform data with SQL to tables, catalog assets, monitor',
        'Score payment streams with ML models, enforce policies'
    ];
    
    const element = document.getElementById('text-build');
    const target = document.querySelector('[data-w-id="cf7ed0ae-648a-dda1-5e66-b665f8b20a67"]');
    
    if (!element || !target) {
        console.error('Elementos no encontrados');
        return;
    }
    
    let currentIndex = 0;
    let isRunning = false;
    let timeoutIds = [];
    let animationId = null;
    
    function clearAll() {
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];
        if (animationId) cancelAnimationFrame(animationId);
    }
    
    function safeTimeout(cb, delay) {
        const id = setTimeout(cb, delay);
        timeoutIds.push(id);
        return id;
    }
    
    function typeString(text, duration, callback) {
        if (!isRunning) return;
        element.textContent = '';
        const chars = text.split('');
        const startTime = performance.now();
        
        function animate(now) {
            if (!isRunning) return;
            const progress = Math.min((now - startTime) / duration, 1);
            element.textContent = chars.slice(0, Math.floor(progress * chars.length)).join('');
            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            } else {
                if (callback) callback();
            }
        }
        animationId = requestAnimationFrame(animate);
    }
    
    function eraseString(callback) {
        if (!isRunning) return;
        const chars = element.textContent.split('');
        const startTime = performance.now();
        
        function animate(now) {
            if (!isRunning) return;
            const progress = Math.min((now - startTime) / 500, 1);
            element.textContent = chars.slice(0, chars.length - Math.floor(progress * chars.length)).join('');
            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            } else {
                element.textContent = '';
                if (callback) callback();
            }
        }
        animationId = requestAnimationFrame(animate);
    }
    
    function loop() {
        if (!isRunning) return;
        
        typeString(strings[currentIndex], 2000, () => {
            safeTimeout(() => {
                if (!isRunning) return;
                safeTimeout(() => {
                    eraseString(() => {
                        currentIndex = (currentIndex + 1) % strings.length;
                        safeTimeout(loop, 500);
                    });
                }, 6000);
            }, 100);
        });
    }
    
    function start() {
        if (isRunning) return;
        isRunning = true;
        currentIndex = 0;
        element.textContent = '';
        safeTimeout(loop, 500);
    }
    
    function stop() {
        isRunning = false;
        clearAll();
        element.textContent = '';
        currentIndex = 0;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                start();
            } else {
                stop();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(target);
})();
