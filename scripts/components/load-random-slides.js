import { getProducts } from "../services/product-services.js";

const slideContainer = document.querySelector('.image-slider__slide-container');

const slides = await getProducts(null, { limit: 5 });

slides.forEach(slide => {
    const slideElement = document.createElement('a');

    slideElement.href = `details.html?category=${slide.category}&product=${slide.id}`;

    const filename = slide.name.toLowerCase().replace(/ /g, '-');
    slideElement.classList.add('image-slider__slide');


    slideElement.innerHTML = `<p class="image-slider__label">${slide.name}</p>`;
    if (slide.images) slideElement.innerHTML += `<img class="image-slider__image" src="images/products/${slide.category}/${filename}/${slide.images[0]}" alt="${slide.name}">`;

    slideContainer.appendChild(slideElement);
});

