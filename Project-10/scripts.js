// Debounce utility to limit how often scroll handler runs
function debounce(fn, wait = 20, immediate = false) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach(img => {
    const imgHeight = img.height || img.clientHeight;
    const imgTop = img.offsetTop;
    const imgBottom = imgTop + imgHeight;

    // point at which image should slide in: middle of the image shown
    const slideInAt = window.scrollY + window.innerHeight - imgHeight / 2;

    const isHalfShown = slideInAt > imgTop;
    const notScrolledPast = window.scrollY < imgBottom;

    if (isHalfShown && notScrolledPast) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
window.addEventListener('resize', debounce(checkSlide));
document.addEventListener('DOMContentLoaded', checkSlide);
