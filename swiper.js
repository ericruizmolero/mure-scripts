document.addEventListener('DOMContentLoaded', function () {
  const solutionSwiper = new Swiper('.swiper.is-work', {
    slidesPerView: 'auto',
    speed: 1000,         
    spaceBetween: 0,
    grabCursor: true,
    allowTouchMove: true,
    navigation: {
      nextEl: ".work-next",
      prevEl: ".work-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1250: {
        slidesPerView: 'auto', // o el número que necesites
      }
    }
  });
});
