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
        slidesPerView: 'auto', // Mobile
      },
      768: {
        slidesPerView: 'auto', // Tablet
        spaceBetween: 0
      },
      992: {
        slidesPerView: 'auto', // Desktop
        spaceBetween: 0
      }
    }
  });
});
