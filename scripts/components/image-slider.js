const imageSliderElement = document.querySelector('.image-slider');
const imageSliderContainer = imageSliderElement.querySelector('.image-slider__slide-container');

const buttonNext = imageSliderElement.querySelector('.image-slider__button--right');
const buttonPrevious = imageSliderElement.querySelector('.image-slider__button--left');


const MINIMUM_STEP = 4;
const TOTAL_STEPS = 20;

let scrollAnimationFrame = null;

let scrolling = false;

buttonNext.addEventListener('click', moveToNextSlide);
buttonPrevious.addEventListener('click', moveToPreviousSlide);

function moveToNextSlide() {
    if (scrolling) return;

    const currentSlide = getCurrentSlide();
    const targetSlide = currentSlide.nextElementSibling ?? imageSliderContainer.firstElementChild;
    

    if (Array.from(imageSliderContainer.children).indexOf(targetSlide) === 0) {
        imageSliderContainer.appendChild(imageSliderContainer.firstElementChild);
        imageSliderContainer.scrollBy(-imageSliderContainer.firstElementChild.getBoundingClientRect().width, 0);
    }

    cancelAnimationFrame(scrollAnimationFrame);

    function step() {
        const targetLeft = targetSlide.getBoundingClientRect().left;
        const scrollStep = targetLeft / TOTAL_STEPS;

        if (targetLeft > 1) {
            imageSliderContainer.scrollBy(scrollStep > MINIMUM_STEP ? scrollStep : MINIMUM_STEP, 0);
            scrollAnimationFrame = requestAnimationFrame(step);
            scrolling = true;
            
        } else {
            imageSliderContainer.scrollBy(targetLeft, 0);
            cancelAnimationFrame(scrollAnimationFrame);

            scrolling = false;
        }
    }

    requestAnimationFrame(step);
}

function moveToPreviousSlide() {
    if (scrolling) return;

    const currentSlide = getCurrentSlide();
    const targetSlide = currentSlide.previousElementSibling ?? imageSliderContainer.lastElementChild;

    if (Array.from(imageSliderContainer.children).indexOf(targetSlide) === imageSliderContainer.childElementCount - 1) {
        imageSliderContainer.prepend(imageSliderContainer.lastElementChild);
        imageSliderContainer.scrollBy(imageSliderContainer.firstElementChild.getBoundingClientRect().width, 0);
    }

    cancelAnimationFrame(scrollAnimationFrame);

    function step() {
        const targetLeft = targetSlide.getBoundingClientRect().left;
        const scrollStep = targetLeft / 20;

        if (targetLeft < -1) {
            imageSliderContainer.scrollBy(scrollStep < -MINIMUM_STEP ? scrollStep : -MINIMUM_STEP, 0);
            scrollAnimationFrame = requestAnimationFrame(step);
            scrolling = true;

        } else {
                imageSliderContainer.scrollBy(targetLeft, 0);
                cancelAnimationFrame(scrollAnimationFrame);
    
                scrolling = false;
            }
    }

    requestAnimationFrame(step);
}

function getCurrentSlide() {
    const slides = Array.from(imageSliderElement.querySelectorAll('.image-slider__slide'));

    return slides.find(slide => slide.getBoundingClientRect().left === 0) ?? slides[0];
}

