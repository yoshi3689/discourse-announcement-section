import {
  withPluginApi
} from "discourse/lib/plugin-api";
import { ajaxSettings } from "jquery";

export default {
  setupComponent(attrs, component) {

    withPluginApi("0.11", (api) => {
      api.onPageChange(() => {
        
          const track = document.querySelector('.carousel-track');
          const slides = track? Array.from(track.children) : null;
          const prevBtn = document.querySelector('.carousel-btn-left');
          const nextBtn = document.querySelector('.carousel-btn-right');
          const dotsNav = document.querySelector('.dots');
          const dots = dotsNav? Array.from(dotsNav.children) : null;
          const flagClassName = 'currentSlide';

          let currentIndex = 0;

          const moveIndex = offset => {
            const targetIndex = currentIndex + offset;
            console.log(targetIndex);
            if (targetIndex < 0) {
              currentIndex = slides.length - 1;
            } else if (currentIndex > slides.length - 1) {
              currentIndex = 0;
            } else {
              currentIndex = targetIndex;
            }
          }
  
          const slideWidth = slides? slides[0].getBoundingClientRect().width : null;
          if (slides) {
            slides.forEach((slide, i) => {
              slide.style.left = `${slideWidth * i}px`;
            });
          }
  
          const moveToSide = (track, currentSlide, targetSlide) => {
              track.style.transform = `translateX(-${targetSlide.style.left})`;
              currentSlide.classList.remove(flagClassName);
              targetSlide.classList.add(flagClassName);
          }
  
          const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove('currentDot');
            targetDot.classList.add('currentDot');
          }
  
          prevBtn.addEventListener('click', (e) => {
            const currentSlide = track.querySelector(`.${flagClassName}`);
            moveIndex(-1);
            const prevSlide = slides[currentIndex];
            const currentDot = dotsNav.querySelector(`.currentDot`);
            const prevDot = dotsNav[currentIndex];

            moveToSide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
          });
  
          nextBtn.addEventListener('click', (e) => {
            const currentSlide = track.querySelector(`.${flagClassName}`);
            moveIndex(1);
            const nextSlide = slides[currentIndex];
            const currentDot = dotsNav.querySelector(`.currentDot`);
            const nextDot = dotsNav[currentIndex];
            moveToSide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
          });
  
          dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('li');
            if (!targetDot) return;
  
            const currentSlide = track.querySelector(`.${flagClassName}`);
            const currentDot = dotsNav.querySelector(`.currentDot`);
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            currentIndex = targetIndex;
            const targetSlide = slides[targetIndex];
  
            moveToSide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
          });
        
      });
    });
  },
};