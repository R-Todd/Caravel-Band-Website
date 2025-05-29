// slider.js

document.addEventListener('DOMContentLoaded', () => {
  // Grab elements
  const carousel       = document.querySelector('.carousel');
  const carouselInner  = carousel.querySelector('.carousel-inner');
  const slides         = Array.from(carouselInner.children);
  const prevButton     = carousel.querySelector('.carousel-control.prev');
  const nextButton     = carousel.querySelector('.carousel-control.next');

  // State & settings
  let currentIndex     = 0;
  const slideCount     = slides.length;
  const intervalTime   = 8000; // ms between auto-rotations
  let slideInterval;

  // Shift carouselInner to show the current slide
  function updateSlide() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Advance to next slide (with wrap)
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide();
  }

  // Go back to previous slide (with wrap)
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlide();
  }

  // Clear and restart the auto-rotate timer
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // Button handlers
  prevButton.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  nextButton.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  // Auto-rotate start
  slideInterval = setInterval(nextSlide, intervalTime);

  // Optional: pause on hover, resume on leave
  carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
  carousel.addEventListener('mouseleave', resetInterval);
});
