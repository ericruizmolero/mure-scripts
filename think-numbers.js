// Espera a que Webflow cargue completamente
window.Webflow ||= [];
window.Webflow.push(() => {
  
  // Registra el plugin de ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Selecciona los elementos
  const items = gsap.utils.toArray(".think_item");
  const transforms = [0, -30, -60];
  
  // Crea un ScrollTrigger para cada item
  items.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // Anima el layout de números
        gsap.to(".think_num-layout", { 
          y: transforms[i], 
          duration: 0.6, 
          ease: "power2.out" 
        });
        
        // Si es el tercer elemento (is-3), oculta think_scape-layout
        if (i === 2) {
          gsap.to(".button_secondary.is-think", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(".button_secondary.is-think", { pointerEvents: "none" });
            }
          });
        } else {
          // Si no es el tercero, asegúrate de que esté visible
          gsap.set(".button_secondary.is-think", { pointerEvents: "auto" });
          gsap.to(".button_secondary.is-think", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      },
      onEnterBack: () => {
        // Anima el layout de números
        gsap.to(".think_num-layout", { 
          y: transforms[i], 
          duration: 0.6, 
          ease: "power2.out" 
        });
        
        // Si es el tercer elemento (is-3), oculta think_scape-layout
        if (i === 2) {
          gsap.to(".button_secondary.is-think", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(".button_secondary.is-think", { pointerEvents: "none" });
            }
          });
        } else {
          // Si no es el tercero, asegúrate de que esté visible
          gsap.set(".button_secondary.is-think", { pointerEvents: "auto" });
          gsap.to(".button_secondary.is-think", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      },
      markers: false // Cambia a true para debuggear
    });
  });
 
  
});
