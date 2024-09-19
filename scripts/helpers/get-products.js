const API_URL = 'http://localhost:3000';

export default async function getProducts(category, sort = null) {

    const url = new URL(`${API_URL}/products`);

    if (sort) {
        url.searchParams.set('_sort', sort);
    }

    const response = await fetch(url);
    return response.json();
}