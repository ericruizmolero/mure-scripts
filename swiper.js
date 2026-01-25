document.addEventListener('DOMContentLoaded', function () {
  const solutionSwiper = new Swiper('.swiper.is-work', {
    speed: 1000,
    spaceBetween: 0,
    grabCursor: true,
    allowTouchMove: true,
    navigation: {
      nextEl: ".work-next",
      prevEl: ".work-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2, // Mobile
        spaceBetween: 80,
      },
      768: {
        slidesPerView: 1.2, // Tablet
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 'auto', // Desktop
        spaceBetween: 0
      }
    }
  });
});
