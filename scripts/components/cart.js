import { getCartQuantity } from '../utils/cart-utils.js';

const cartElement = document.querySelector('.cart');


document.addEventListener('cartUpdated', updateCartIcon);

function updateCartIcon() {
    cartElement.dataset.items = getCartQuantity();
}

updateCartIcon();