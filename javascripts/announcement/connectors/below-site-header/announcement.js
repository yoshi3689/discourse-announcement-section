import {
  withPluginApi
} from "discourse/lib/plugin-api";

export default {
  setupComponent(attrs, component) {

    withPluginApi("0.11", (api) => {
      api.onPageChange(() => {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = document.querySelector('.carousel-btn-left');
        const nextBtn = document.querySelector('.carousel-btn-right');
        const dotsNav = document.querySelector('.dots');
        const dots = Array.from(dotsNav.children);

        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, i) => {
          slide.style.left = `${slideWidth * i}px`;
        });
        nextBtn.addEventListener('click', (e) => {
          const currentSlide = track.querySelector('.currentSlide');
          const nextSlide = currentSlide.nextElementSibling;
          // move to the next slide
          const amountToMove = nextSlide.style.left;
          track.style.transform = `translateX(-${amountToMove})`;
        })

      });
    });
  },
};