document.addEventListener("DOMContentLoaded", () => {
  // ✅ Evita dobles inicializaciones
  if (window.__NAV_TOGGLE_INIT__) return;
  window.__NAV_TOGGLE_INIT__ = true;
  
  gsap.registerPlugin(ScrollTrigger);
  
  const NAV_BG_COLOR = "#f7f7f5";
  let manualOverride = false;
  
  const navEl = document.querySelector(".nav");
  const navIcon = document.querySelector(".nav_icon");
  const letterPaths = document.querySelectorAll(".nav_letters path");
  
  if (!navEl || !navIcon) return;
  
  // Estado real (fuente de verdad)
  let isNavVisible = true; // asumimos visible al cargar
  
  // Tweens (uno para nav, otro para letras)
  const navMove = gsap.to(navEl, {
    yPercent: -120,
    duration: 0.6,
    ease: "expo.inOut",
    paused: true,
    onStart: () => {
      if (navMove.progress() === 0) {
        // Empezando a ocultar
        isNavVisible = false;
      }
    },
    onComplete: () => {
      gsap.set(navEl, { backgroundColor: "transparent" });
    },
    onReverseComplete: () => {
      isNavVisible = true;
      gsap.set(navEl, { backgroundColor: NAV_BG_COLOR });
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
  
  // ScrollTrigger del nav (autohide)
  const navST = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (manualOverride) return;
      
      if (self.direction === 1) {
        // scroll down → hide
        if (isNavVisible) {
          lettersTween.play();
          navMove.play();
        }
      } else {
        // scroll up → show
        if (!isNavVisible) {
          lettersTween.reverse();
          navMove.reverse();
          gsap.set(navEl, { backgroundColor: NAV_BG_COLOR });
        }
      }
    }
  });
  
  function showNav() {
    // ✅ Fuerza estado visible
    gsap.killTweensOf(navEl);
    gsap.killTweensOf(letterPaths);
    
    lettersTween.reverse();
    navMove.reverse();
    
    gsap.set(navEl, { backgroundColor: NAV_BG_COLOR });
    isNavVisible = true;
  }
  
  function hideNav() {
    // ✅ Fuerza estado oculto
    gsap.killTweensOf(navEl);
    gsap.killTweensOf(letterPaths);
    
    lettersTween.play();
    navMove.play();
    
    isNavVisible = false;
  }
  
  function releaseManualOverride() {
    manualOverride = false;
    navST.enable();
    ScrollTrigger.update();
    
    window.removeEventListener("wheel", releaseManualOverride);
    window.removeEventListener("touchstart", releaseManualOverride);
    window.removeEventListener("touchmove", releaseManualOverride);
    window.removeEventListener("keydown", releaseManualOverride);
  }
  
  navIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    manualOverride = true;
    navST.disable();
    
    // ✅ Toggle basado en estado real
    if (isNavVisible) {
      hideNav();
    } else {
      showNav();
    }
    
    // Liberar override con scroll/gesto/tecla
    window.addEventListener("wheel", releaseManualOverride, { once: true, passive: true });
    window.addEventListener("touchstart", releaseManualOverride, { once: true, passive: true });
    window.addEventListener("touchmove", releaseManualOverride, { once: true, passive: true });
    window.addEventListener("keydown", releaseManualOverride, { once: true });
  }, { passive: false });
});
