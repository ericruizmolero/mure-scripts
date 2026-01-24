document.addEventListener("DOMContentLoaded", () => {
  // ✅ Evita dobles inicializaciones (muy común en Webflow)
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
  let navHidden = false; // asumimos visible al cargar

  // Tweens (uno para nav, otro para letras)
  const navMove = gsap.to(navEl, {
    yPercent: -100,
    duration: 0.6,
    ease: "expo.inOut",
    paused: true,
    onComplete: () => {
      navHidden = true;
      gsap.set(navEl, { backgroundColor: "transparent" });
    },
    onReverseComplete: () => {
      navHidden = false;
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
        lettersTween.play();
        navMove.play();
      } else {
        // scroll up → show
        lettersTween.reverse();
        navMove.reverse();
        gsap.set(navEl, { backgroundColor: NAV_BG_COLOR });
      }
    }
  });

  function openNav() {
    // ✅ limpia conflictos
    gsap.killTweensOf(navEl);
    lettersTween.pause().reverse();
    navMove.pause().reverse();

    gsap.to(navEl, {
      backgroundColor: NAV_BG_COLOR,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto"
    });
  }

  function closeNav() {
    gsap.killTweensOf(navEl);
    lettersTween.pause().play();
    navMove.pause().play();
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
    // evita dobles clicks “fantasma” por overlays/links
    e.preventDefault();
    e.stopPropagation();

    manualOverride = true;
    navST.disable();

    // ✅ Toggle 100% determinista por estado real
    if (navHidden) openNav();
    else closeNav();

    // liberar override con intención real de scroll/gesto/tecla
    window.addEventListener("wheel", releaseManualOverride, { once: true, passive: true });
    window.addEventListener("touchstart", releaseManualOverride, { once: true, passive: true });
    window.addEventListener("touchmove", releaseManualOverride, { once: true, passive: true });
    window.addEventListener("keydown", releaseManualOverride, { once: true });
  }, { passive: false });
});
