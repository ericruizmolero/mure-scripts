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
      gsap.set(navEl, { 
        backgroundColor: NAV_BG_COLOR,
        visibility: "visible"
      });
    },
    onStart: () => {
      if (navMove.reversed()) {
        gsap.set(navEl, { visibility: "visible" });
      }
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
        // ✅ Aparición más rápida al hacer scroll up
        lettersTween.reverse().duration(0.3);
        navMove.reverse().duration(0.35);
        gsap.set(navEl, { backgroundColor: NAV_BG_COLOR });
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
        // ✅ Mostrar nav más rápido
        gsap.set(navEl, { visibility: "visible" });
        lettersTween.reverse().duration(0.3);
        navMove.reverse().duration(0.35);
        gsap.set(navEl, { backgroundColor: NAV_BG_COLOR });
        navHidden = false;
      } else {
        // Ocultar nav (velocidad normal)
        lettersTween.play().duration(0.5);
        navMove.play().duration(0.6);
        navHidden = true;
      }
      
      // Liberar override
      setTimeout(releaseManualOverride, 100);
      window.addEventListener("wheel", releaseManualOverride, { once: true, passive: true });
      window.addEventListener("touchstart", releaseManualOverride, { once: true, passive: true });
    });
  }
});
