import { getProductById } from "../services/product-services.js";

const searchParams = new URLSearchParams(window.location.search);

const breadcrumb = document.querySelector('.breadcrumb');

if (breadcrumb) {
    const category = searchParams.get('category');
    const productId = searchParams.get('product');

    const homeLink = document.createElement('a');
    const categoryLink = document.createElement('a');
    const productLink = document.createElement('a');
    const separator = () => document.createTextNode(' / ');


    [homeLink, categoryLink, productLink].forEach(link => link?.classList.add('breadcrumb__link'));

    homeLink.href = '/';
    homeLink.textContent = 'Home';

    if (category) {
        categoryLink.href = `/store?category=${category}`;
        categoryLink.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }


    if (productId) {
        const product = await getProductById(productId);

        productLink.textContent = product.name;
        productLink.classList.add('breadcrumb__link--active');

        productLink.href = `/details.html?category=${category}&product=${productId}`;
        breadcrumb.append(homeLink, separator(), categoryLink, separator(), productLink);
    } else if (category) {
        breadcrumb.append(homeLink, separator(), categoryLink);
    } else {
        breadcrumb.append(homeLink);
    }
}
