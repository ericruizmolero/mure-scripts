document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  // Exponer lenis globalmente
  window.lenis = lenis;

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  const scrollControl = (section) => {
    animating = true;
    lenis.scrollTo(section, {
      lock: true,
      force: true,
      onComplete: () => {
        animating = false;
      },
    });
  };

  const sections = document.querySelectorAll('[lenis="scroll"]');
  let animating = false;
  let lastScrollY = window.scrollY;
  let anchorClickActive = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      
      lastScrollY = currentScrollY;

      if (entry.isIntersecting && !animating && !anchorClickActive && isScrollingDown && entry.boundingClientRect.top > 0) {
        scrollControl(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  sections.forEach((section) => observer.observe(section));

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        anchorClickActive = true;
        lenis.stop();
        
        targetSection.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          lenis.start();
          anchorClickActive = false;
        }, 2000);
      }
    });
  });
});
