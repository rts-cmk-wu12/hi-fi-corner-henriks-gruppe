import { getProductById } from '../services/product-services.js';
import { toFileName } from '../utils/file-utils.js';

const productId = new URLSearchParams(window.location.search).get('product');

const product = await getProductById(productId);

const titleElement = document.querySelector('.product-details__title');
const priceElement = document.querySelector('.product-details__price');
const otherProductsElement = document.querySelector('.product-details__other-products');
const descriptionElement = document.querySelector('.product-details__description');
const manufacturerElement = document.querySelector('.product-details__manufacturer');
const specificationsElement = document.querySelector('specifications__table-body');

document.title = `${product.brand} ${product.name} | Hi-Fi Corner`;

titleElement.textContent = `${product.brand} ${product.name}`;
priceElement.textContent = `£${product.price}`;
otherProductsElement.textContent = `See other ${product.brand} products`;
otherProductsElement.href = `shop.html?brand=${product.brand.toLowerCase()}`;
descriptionElement.textContent = product.description;

manufacturerElement.innerHTML = `<a href="shop.html?manufacturer=${toFileName(product.manufacturer)}">${product.manufacturer}</a>`;