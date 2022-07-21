const trackContainer = document.querySelector('.carousel-track-container');
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : null;
const prevBtn = document.querySelector('.carousel-btn-left');
const nextBtn = document.querySelector('.carousel-btn-right');
const dotsNav = document.querySelector('.dots');
const dots = dotsNav ? Array.from(dotsNav.children) : null;
const flagClassName = 'currentSlide';

let currentIndex = 0;

const moveIndex = offset => {
  const targetIndex = currentIndex + offset;
  if (targetIndex < 0) {
    currentIndex = slides.length - 1;
  } else if (targetIndex > slides.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex = targetIndex;
  }
}
let slideWidth;
let slideHeight;
const adjustWidthAndHeight = () => {
  const sizeInfo = slides[0].getBoundingClientRect();
  slideWidth = sizeInfo.width;
  slideHeight = sizeInfo.height;

  slides.forEach((slide, i) => {
    slide.style.left = `${slideWidth * i}px`;
  });
  trackContainer.style.height = `${slideHeight}px`
}

window.addEventListener('load', e => {
  adjustWidthAndHeight();
})
window.addEventListener('resize', e => {
  adjustWidthAndHeight();
});

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
  const prevDot = dots[currentIndex];

  moveToSide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});

nextBtn.addEventListener('click', (e) => {
  const currentSlide = track.querySelector(`.${flagClassName}`);
  moveIndex(1);
  const nextSlide = slides[currentIndex];
  const currentDot = dotsNav.querySelector(`.currentDot`);
  const nextDot = dots[currentIndex];
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