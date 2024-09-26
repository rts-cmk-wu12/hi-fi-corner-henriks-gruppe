import { searchProducts } from '../services/product-services.js';

const searchInput = document.querySelector('.product-search__input');
const dataList = document.querySelector('#product-search__results');

['blur', 'focus'].forEach(event => searchInput.addEventListener(event, () => dataList.innerHTML = ''));

searchInput.addEventListener('input', async () => {
    const products = await searchProducts(searchInput.value);

    console.log(products);
    

    dataList.innerHTML = '';

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.brand;
        dataList.appendChild(option);
    });
});