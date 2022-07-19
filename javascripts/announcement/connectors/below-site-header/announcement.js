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
  
          const slideWidth = slides? slides[0].getBoundingClientRect().width : null;
          if (slides) {
            slides.forEach((slide, i) => {
              slide.style.left = `${slideWidth * i}px`;
            });
          }
  
          const moveToSide = (track, currentSlide, targetSlide) => {
            if (currentIndex < 0) {
              track.style.transform = `translateX(-${slides[slides.length - 1].style.left})`;
              currentSlide.classList.remove(flagClassName);
              slides[slides.length - 1].classList.add(flagClassName);
              currentIndex = slides.length - 1;
            } else if (currentIndex > slides.length - 1) {
              track.style.transform = `translateX(-${slides[0].style.left})`;
              currentSlide.classList.remove(flagClassName);
              slides[0].classList.add(flagClassName);
              currentIndex = 0;
            } else {
              track.style.transform = `translateX(-${targetSlide.style.left})`;
              currentSlide.classList.remove(flagClassName);
              targetSlide.classList.add(flagClassName);
            }
          }
  
          const updateDots = (currentDot, targetDot) => {
            // if (currentIndex < 0) {

            // } else if (currentIndex > slides.length - 1) {

            // } else {
            
            // }
            currentDot.classList.remove('currentDot');
            dotsNav[currentIndex].classList.add('currentDot');
          }
  
          prevBtn.addEventListener('click', (e) => {
            const currentSlide = track.querySelector(`.${flagClassName}`);
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector(`.currentDot`);
            const prevDot = currentDot.previousElementSibling;

            moveToSide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
          });
  
          nextBtn.addEventListener('click', (e) => {
            const currentSlide = track.querySelector(`.${flagClassName}`);
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector(`.currentDot`);
            const nextDot = currentDot.nextElementSibling;
            currentIndex++;
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