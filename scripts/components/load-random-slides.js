import getProducts from "../helpers/get-products.js";

const slideContainer = document.querySelector('.image-slider__slide-container');

const slides = await getProducts('amplifiers');

slides.amplifiers.forEach(slide => {
    const slideElement = document.createElement('div');

    const filename = slide.name.toLowerCase().replace(/ /g, '-');
    slideElement.classList.add('image-slider__slide');


    slideElement.innerHTML = `
        <p class="image-slider__label">${slide.name}</p>
        <img class="image-slider__image" src="images/products/amplifiers/${filename}.jpg" alt="${slide.name}">
    `;

    slideContainer.appendChild(slideElement);
});

