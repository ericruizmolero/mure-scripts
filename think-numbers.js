// Espera a que Webflow cargue completamente
window.Webflow ||= [];
window.Webflow.push(() => {

  gsap.registerPlugin(ScrollTrigger);

  const items = gsap.utils.toArray(".think_item");

  // Media queries GSAP
  const mm = gsap.matchMedia();

  mm.add(
    {
      // Desktop
      desktop: "(min-width: 992px)",
      // Tablet y abajo
      tabletDown: "(max-width: 991px)",
    },
    (context) => {
      const { desktop, tabletDown } = context.conditions;

      // Transforms según breakpoint
      const transforms = tabletDown ? [0, -24, -48] : [0, -30, -60];

      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(".think_num-layout", {
              y: transforms[i],
              duration: 0.6,
              ease: "power2.out"
            });

            if (i === 2) {
              gsap.to(".button_secondary.is-think", {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => gsap.set(".button_secondary.is-think", { pointerEvents: "none" })
              });
            } else {
              gsap.set(".button_secondary.is-think", { pointerEvents: "auto" });
              gsap.to(".button_secondary.is-think", {
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
              });
            }
          },
          onEnterBack: () => {
            gsap.to(".think_num-layout", {
              y: transforms[i],
              duration: 0.6,
              ease: "power2.out"
            });

            if (i === 2) {
              gsap.to(".button_secondary.is-think", {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => gsap.set(".button_secondary.is-think", { pointerEvents: "none" })
              });
            } else {
              gsap.set(".button_secondary.is-think", { pointerEvents: "auto" });
              gsap.to(".button_secondary.is-think", {
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
              });
            }
          },
          markers: false
        });
      });

      // Cleanup automático al cambiar de breakpoint (GSAP lo hace al salir del contexto)
      return () => ScrollTrigger.getAll().forEach(st => st.kill());
    }
  );
});
