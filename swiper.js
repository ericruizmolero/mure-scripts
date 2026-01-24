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
  });
});
