import { getProductById } from '../services/product-services.js';
import { addItemToCart } from '../utils/cart-utils.js';

const formElement = document.querySelector('.order-form');

const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get('product');
const productData = await getProductById(productId);

if ('options' in productData) {
    const optionsContainer = document.createElement('div');
    

    optionsContainer.classList.add('order-form__options');

    formElement.prepend(optionsContainer);

    let firstOption = true;

    for (const [key, value] of Object.entries(productData.options)) {
        const optionTitle = document.createElement('h3');

        optionTitle.classList.add('order-form__option-title');

        optionTitle.innerHTML = `${key} <span class="order-form__required">*</span>`;

        if (firstOption) {
            optionTitle.innerHTML += '<span class="order-form__required">* Required Fields</span>';
            firstOption = false;
        }

        optionsContainer.append(optionTitle);

        value.forEach(option => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');

            optionLabel.classList.add('order-form__option-label');


            optionInput.type = 'radio';
            optionInput.name = key;
            optionInput.value = option;
            optionInput.required = true;

            optionLabel.textContent = option;
            optionLabel.prepend(optionInput);

            optionsContainer.append(optionLabel);
        });
    }
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    const data = {};
    data.productId = productId;
    data.name = productData.name;
    data.price = productData.price;
    data.quantity = formData.get('quantity');

    formData.delete('quantity');
    
    data.options = Object.fromEntries(formData.entries()); 

    addItemToCart(data.name, data.quantity, data.price, data.options ?? null);
});