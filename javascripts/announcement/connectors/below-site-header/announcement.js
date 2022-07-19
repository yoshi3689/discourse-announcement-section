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
        const flagClassName = 'currentSlide';

        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, i) => {
          slide.style.left = `${slideWidth * i}px`;
        });

        const moveToSide = (track, currentSlide, targetSlide) => {
          track.style.transform = `translateX(-${targetSlide.style.left})`;
          currentSlide.classList.remove(flagClassName);
          targetSlide.classList.add(flagClassName);
        }

        prevBtn.addEventListener('click', (e) => {
          const currentSlide = track.querySelector(`.${flagClassName}`);
          const prevSlide = currentSlide.previousElementSibling;
          moveToSide(track, currentSlide, prevSlide);
        });

        nextBtn.addEventListener('click', (e) => {
          const currentSlide = track.querySelector(`.${flagClassName}`);
          const nextSlide = currentSlide.nextElementSibling;
          moveToSide(track, currentSlide, nextSlide);
        });

        // dotsNav.

      });
    });
  },
};