import { getProductById } from '../services/product-services.js';

const productId = new URLSearchParams(window.location.search).get('product');

const product = await getProductById(productId);

const titleElement = document.querySelector('.product-details__title');
const priceElement = document.querySelector('.product-details__price');
const descriptionElement = document.querySelector('.product-details__description');

titleElement.textContent = product.name;
priceElement.textContent = `$${product.price}`;
descriptionElement.textContent = product.description;