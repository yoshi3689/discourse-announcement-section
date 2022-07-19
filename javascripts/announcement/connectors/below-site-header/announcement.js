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
            const prevSlide = currentSlide.previousElementSibling;
            moveToSide(track, currentSlide, prevSlide);
            updateDots(currentDot, targetDot);
          });
  
          nextBtn.addEventListener('click', (e) => {
            const currentSlide = track.querySelector(`.${flagClassName}`);
            const nextSlide = currentSlide.nextElementSibling;
            moveToSide(track, currentSlide, nextSlide);
            updateDots(currentDot, targetDot);
          });
  
          dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('li');
            if (!targetDot) return;
  
            const currentSlide = track.querySelector(`.${flagClassName}`);
            const currentDot = dotsNav.querySelector(`.currentDot`);
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];
  
            moveToSide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
          });
        
      });
    });
  },
};