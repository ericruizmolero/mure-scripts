document.addEventListener("DOMContentLoaded", () => {
  // ✅ Evita dobles inicializaciones
  if (window.__NAV_TOGGLE_INIT__) return;
  window.__NAV_TOGGLE_INIT__ = true;
  
  gsap.registerPlugin(ScrollTrigger);
  
  const NAV_BG_COLOR = "#f7f7f5";
  const navEl = document.querySelector(".nav");
  const navIcon = document.querySelector(".nav_icon");
  const letterPaths = document.querySelectorAll(".nav_letters path");
  
  if (!navEl) return;
  
  let manualOverride = false;
  let navHidden = false;
  
  // ✅ Función para mostrar el nav con el ritmo perfecto
  function showNav() {
    gsap.set(navEl, { visibility: "visible" });
    
    // Background rápido
    gsap.fromTo(navEl,
      { backgroundColor: "transparent" },
      { 
        backgroundColor: NAV_BG_COLOR,
        duration: 0.1,
        ease: "power2.out"
      }
    );
    
    // Letras y movimiento
    lettersTween.reverse();
    navMove.reverse();
  }
  
  // Tweens
  const navMove = gsap.to(navEl, {
    yPercent: -120,
    duration: 0.6,
    ease: "expo.inOut",
    paused: true,
    onComplete: () => {
      navHidden = true;
      gsap.set(navEl, { 
        backgroundColor: "transparent",
        visibility: "hidden"
      });
    },
    onReverseComplete: () => {
      navHidden = false;
      gsap.set(navEl, { visibility: "visible" });
    }
  });
  
  const lettersTween = gsap.to(letterPaths, {
    x: -20,
    opacity: 0,
    stagger: 0.02,
    duration: 0.5,
    ease: "power3.out",
    paused: true
  });
  
  // ScrollTrigger - TODOS LOS DISPOSITIVOS
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (manualOverride) return;
      
      if (self.direction === 1) {
        lettersTween.play();
        navMove.play();
      } else {
        // ✅ Mismo ritmo que el toggle
        showNav();
      }
    }
  });
  
  // Toggle manual - TODOS LOS DISPOSITIVOS
  if (navIcon) {
    function releaseManualOverride() {
      manualOverride = false;
      ScrollTrigger.refresh();
    }
    
    navIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      manualOverride = true;
      
      gsap.killTweensOf([navEl, letterPaths]);
      
      if (navHidden) {
        // ✅ Usar la misma función
        showNav();
        navHidden = false;
      } else {
        // Ocultar nav
        lettersTween.play();
        navMove.play();
        navHidden = true;
      }
      
      // Liberar override
      setTimeout(releaseManualOverride, 100);
      window.addEventListener("wheel", releaseManualOverride, { once: true, passive: true });
      window.addEventListener("touchstart", releaseManualOverride, { once: true, passive: true });
    });
  }
});
