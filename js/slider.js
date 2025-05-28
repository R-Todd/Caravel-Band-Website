// js/slider.js
document.addEventListener("DOMContentLoaded", () => {
  const inner   = document.querySelector(".carousel-inner");
  const slides  = document.querySelectorAll(".carousel-inner .slide");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");
  let   current = 0;
  const total   = slides.length;
  let   timer   = setInterval(nextSlide, 5000);

  function update() {
    inner.style.transform = `translateX(-${current * 100}%)`;
  }

  function nextSlide() {
    current = (current + 1) % total;
    update();
  }

  function prevSlide() {
    current = (current - 1 + total) % total;
    update();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
  }
});
