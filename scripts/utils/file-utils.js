export function toFileName(name) {
    return name.toLowerCase().replace(/ /g, '-');
}

export function getImagePath(product, fileName) {
    return `images/products/${toFileName(product.category)}/${toFileName(product.brand)}-${toFileName(product.name)}/${fileName}`;
}