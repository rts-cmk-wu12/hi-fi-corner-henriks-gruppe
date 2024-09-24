const API_URL = 'http://localhost:3000';

export async function getProducts(category = null, options = {}) {

    const url = new URL(`${API_URL}/products`);

    if (category) url.searchParams.set('category', category);
    if (options.sort) url.searchParams.set('_sort', options.sort);
    if (options.limit) url.searchParams.set('_limit', options.limit);

    const response = await fetch(url);
    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
}

export async function searchProducts(query) {
    const response = await fetch(`${API_URL}/products?q=${query}`);
    return response.json();
}