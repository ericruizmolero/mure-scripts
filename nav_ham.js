Webflow.push(function() {
  const body = document.body;
  const toggleBtn = document.querySelector('.nav_ham');
  const navMobileContent = document.querySelector('.nav_mobile-content');
  let menuOpen = false;
  let isNavOutClick = false;
  
  // Detectar si es mobile/tablet (Lenis desactivado)
  const isMobileOrTablet = window.innerWidth < 992;
  
  function toggleBodyScroll(freeze) {
    if (freeze) {
      body.classList.add('no-scroll');
      body.style.overflow = 'hidden';
      body.style.height = '100%';
      document.addEventListener('touchmove', preventBodyScroll, { passive: false });
      document.addEventListener('wheel', preventBodyScroll, { passive: false });
    } else {
      body.classList.remove('no-scroll');
      body.style.overflow = '';
      body.style.height = '';
      document.removeEventListener('touchmove', preventBodyScroll);
      document.removeEventListener('wheel', preventBodyScroll);
    }
  }
  
  function preventBodyScroll(e) {
    e.preventDefault();
  }
  
  toggleBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    toggleBodyScroll(menuOpen);
    
    if (menuOpen) {
      // Solo detener Lenis si existe (desktop)
      if (window.lenis && !isMobileOrTablet) {
        window.lenis.stop();
      }
    } else {
      // Solo reiniciar Lenis si existe y no es nav="out"
      if (window.lenis && !isMobileOrTablet && !isNavOutClick) {
        window.lenis.start();
      }
      isNavOutClick = false;
    }
  });
  
  // Cerrar menú al hacer click fuera de nav_mobile-content
  document.addEventListener('click', (e) => {
    if (menuOpen && navMobileContent && !navMobileContent.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.click();
    }
  });
  
  // nav="out" para anchors - NO activa lenis.start() inmediatamente
  const navOutElements = document.querySelectorAll('[nav="out"]');
  navOutElements.forEach(element => {
    element.addEventListener('click', () => {
      isNavOutClick = true;
      toggleBtn.click();
      
      // Reactiva lenis después de 3 segundos solo si existe (desktop)
      if (!isMobileOrTablet) {
        setTimeout(() => {
          if (window.lenis) {
            window.lenis.start();
          }
        }, 3000);
      }
    });
  });
  
  // nav="link-out" para links normales - SÍ activa lenis.start()
  const linkOutElements = document.querySelectorAll('[nav="link-out"]');
  linkOutElements.forEach(element => {
    element.addEventListener('click', () => {
      toggleBtn.click();
    });
  });
});
