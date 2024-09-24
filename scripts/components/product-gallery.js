import { getProductById } from '../services/product-services.js';

const imageContainer = document.querySelector('.product-gallery__image-container');
const thumbnailContainer = document.querySelector('.product-gallery__thumbnails');

const productId = new URLSearchParams(window.location.search).get('product');

const product = await getProductById(productId);

const images = product.images || [];

imageContainer.style.backgroundImage = `url(images/products/${product.category}/${product.name.toLowerCase().replace(/ /g, '-')}/${images[0]})`;

images.forEach(image => {
    const thumbnail = document.createElement('img');
    thumbnail.src = `images/products/${product.category}/${product.name.toLowerCase().replace(/ /g, '-')}/${image}`;
    thumbnail.alt = product.name;
    thumbnail.classList.add('product-gallery__thumbnail');
    thumbnailContainer.appendChild(thumbnail);

    thumbnail.addEventListener('click', () => {
        imageContainer.style.backgroundImage = `url(images/products/${product.category}/${product.name.toLowerCase().replace(/ /g, '-')}/${image})`;
    });
});