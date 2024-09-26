import { getProductById } from '../services/product-services.js';
import { toFileName } from '../utils/file-utils.js';

const imageContainer = document.querySelector('.product-gallery__image-container');
const thumbnailContainer = document.querySelector('.product-gallery__thumbnails');

const productId = new URLSearchParams(window.location.search).get('product');

const product = await getProductById(productId);

const images = product.images || [];

const imagePaths = images.map(fileName => `images/products/${product.category}/${toFileName(product.brand)}-${toFileName(product.name)}/${fileName}`);

imageContainer.style.backgroundImage = `url(${imagePaths[0]})`;

images.forEach((image, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = imagePaths[index];
    thumbnail.alt = product.name;
    thumbnail.classList.add('product-gallery__thumbnail');
    thumbnailContainer.appendChild(thumbnail);

    thumbnail.addEventListener('click', () => {
        imageContainer.style.backgroundImage = `url(${imagePaths[index]})`;
    });
});