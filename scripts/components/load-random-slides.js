import { getProducts } from "../services/product-services.js";
import { getImagePath } from "../utils/file-utils.js";


const slideContainer = document.querySelector('.image-slider__slide-container');

const slides = await getProducts(null, { limit: 5 });

slides.forEach(slide => {
    const slideElement = document.createElement('a');
    const filePath = getImagePath(slide, slide.images[0]);

    console.log(filePath);
    

    slideElement.href = `details.html?category=${slide.category}&product=${slide.id}`;

    slideElement.classList.add('image-slider__slide');

    


    slideElement.innerHTML = `<p class="image-slider__label">${slide.name}</p>`;
    if (slide.images) slideElement.innerHTML += `<img class="image-slider__image" src="${filePath}" alt="${slide.name}">`;

    slideContainer.appendChild(slideElement);
});

