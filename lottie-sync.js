document.addEventListener('DOMContentLoaded', function() {
  const circle = document.querySelector('.back_circle');
  const logoWraps = document.querySelectorAll('.back_logo-wrap');
  
  let targetRotation = 0;
  let autoRotateSpeed = 12; // 12 grados por segundo (360/30)
  let lastTime = Date.now();
  let draggableInstance;
  
  // Loop principal que SIEMPRE corre
  function animate() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    // Si el draggable NO está siendo presionado ni tiene throw activo
    if (draggableInstance && !draggableInstance.isDragging && !draggableInstance.isThrowing) {
      targetRotation += autoRotateSpeed * deltaTime;
    } else if (draggableInstance) {
      // Si está siendo arrastrado o con inercia, usar su rotación
      targetRotation = draggableInstance.rotation;
    }
    
    // Aplicar rotaciones
    gsap.set(circle, { rotation: targetRotation });
    gsap.set(logoWraps, { rotation: -targetRotation });
    
    requestAnimationFrame(animate);
  }
  
  // Crear draggable con alta sensibilidad
  draggableInstance = Draggable.create(circle, {
    type: "rotation",
    inertia: true,
    throwResistance: 5, // Muy baja resistencia
    maxDuration: 20, // Puede girar mucho tiempo
    minDuration: 2,
    overshootTolerance: 0,
    cursor: "grab",
    activeCursor: "grabbing",
    onPress: function() {
      circle.style.cursor = "grabbing";
    },
    onRelease: function() {
      circle.style.cursor = "grab";
    }
  })[0];
  
  // Iniciar animación
  circle.style.cursor = "grab";
  animate();
});
</script>


<script>
(function() {
    const strings = [
        'Score payment streams with ML models, enforce policies on anomalies.',
        'Embed documents, retrieve context, generate LLM responses.',
        'Orchestrate ML workflows from feature engineering to model deployment.',
        'Transform data with SQL, catalog assets, monitor pipeline health.'
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
