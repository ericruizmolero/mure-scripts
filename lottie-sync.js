(function() {
    const strings = [
        'Embed docs in vectors, RAG agents retrieve, LLM responds',
        'Run notebook ML jobs, eval models, deploy via MLOps',
        'Transform data with SQL to tables, catalog assets, monitor',
        'Score payment streams with ML models, enforce policies'
    ];
    
    const element = document.getElementById('text-build');
    const target = document.querySelector('[data-w-id="cf7ed0ae-648a-dda1-5e66-b665f8b20a67"]');
    const lottieEl = document.querySelector('.built_pc-lottie');
    
    if (!element || !target) {
        console.error('Elementos no encontrados');
        return;
    }
    
    let myAnimation = null;
    
    function initLottie() {
        try {
            const lottie = Webflow.require('lottie').lottie;
            const animations = lottie.getRegisteredAnimations();
            myAnimation = animations.find(anim => anim.wrapper === lottieEl);
            
            if (!myAnimation) {
                console.warn('Lottie .built_pc-lottie no encontrado en animaciones registradas');
            }
        } catch (e) {
            console.warn('Lottie no encontrado:', e);
        }
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
        console.log('▶️ Iniciando animación');
        isRunning = true;
        currentIndex = 0;
        element.textContent = '';
        
        if (myAnimation) {
            myAnimation.goToAndPlay(0, true);
        }
        
        safeTimeout(loop, 500);
    }
    
    function stop() {
        console.log('⏹️ Parando animación');
        isRunning = false;
        clearAll();
        element.textContent = '';
        currentIndex = 0;
        
        if (myAnimation) {
            myAnimation.goToAndStop(0, true);
        }
    }
    
    if (window.Webflow) {
        Webflow.push(function() {
            initLottie();
        });
    } else {
        window.addEventListener('load', initLottie);
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
