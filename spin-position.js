(() => {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }
  ready(() => {
    const tasteSpan = document.getElementById('taste-word');
    const blink = document.getElementById('blink-icon');
    const container = document.getElementById('hero-container');
    if (!tasteSpan || !blink || !container) return;
    // Asegura contexto de posicionamiento
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }
    let rafId = null;
    function compute() {
      rafId = null;
      const spanRect = tasteSpan.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // Evita cálculos basura si algo está oculto / sin layout
      if (!spanRect.width || !containerRect.width) return;
      // Usa visualViewport si existe (mejor en móviles/zoom)
      const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      
      // Debug: descomentar para ver el ancho detectado
      // console.log('Viewport width:', vw);
      
      blink.style.position = 'absolute';
      blink.style.left = (spanRect.right - containerRect.left + 5) + 'px';
      blink.style.top = 'auto';
      blink.style.transform = 'none';
      // Control del bottom según ancho (ajustado a breakpoints Webflow)
      if (vw < 768) {
        // Mobile & Tablet portrait
        blink.style.bottom = '0.7rem';
      } else if (vw >= 768 && vw < 992) {
        // Tablet landscape
        blink.style.bottom = '1.1rem';
      } else if (vw >= 992 && vw <= 1550) {
        // Desktop pequeño
        blink.style.bottom = '1.1rem';
      } else {
        // Desktop grande
        blink.style.bottom = '1.4rem';
      }
    }
    function scheduleCompute() {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    }
    // 1) Primera ejecución + reintento en siguientes frames
    scheduleCompute();
    requestAnimationFrame(scheduleCompute);
    // 2) Cuando termina de cargar todo (imágenes, etc.)
    window.addEventListener('load', scheduleCompute);
    // 3) Cuando cargan fuentes (muy importante para ancho de texto)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleCompute).catch(() => {});
    }
    // 4) Resize (throttleado por RAF)
    window.addEventListener('resize', scheduleCompute);
    // 5) Cambios de viewport "real" (mobile, zoom)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleCompute);
      window.visualViewport.addEventListener('scroll', scheduleCompute);
    }
    // 6) Si cambia el tamaño del span o del container (responsive/CMS)
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(scheduleCompute);
      ro.observe(tasteSpan);
      ro.observe(container);
    }
  });
})();
