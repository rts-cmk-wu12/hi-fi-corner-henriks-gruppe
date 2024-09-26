export function addItemToCart(name, quantity, price, options = null) {
    const cart = getCart();

    if (name in cart){
        cart[name].quantity = Number(cart[name].quantity) + Number(quantity);
        if (options) {
            cart[name].options = options;
        }
    } else {
        cart[name] = { quantity: Number(quantity), price: Number(price), options };
    } 
    localStorage.setItem('cart', JSON.stringify(cart));

    document.dispatchEvent(new Event('cartUpdated'));

    console.log(`${quantity}x ${name} added to cart.`);
}

export function removeItemFromCart(name, quantity = 1) {
    const cart = getCart();

    if (name in cart) {
        cart[name].quantity = Number(cart[name].quantity) - Number(quantity);

        if (cart[name].quantity <= 0) {
            delete cart[name];
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        document.dispatchEvent(new Event('cartUpdated'));
        
        console.log(`${quantity}x ${name} removed from cart.`);
    } else {
        console.log(`${name} not found in cart.`);
    }
}

export function clearCart() {
    localStorage.removeItem('cart');

    document.dispatchEvent(new Event('cartUpdated'));
    console.log('Cart cleared.');
}

export function getCartQuantity() {
    return Object.values(getCart()).reduce((acc, item) => acc + item.quantity, 0);
}

export function getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
}