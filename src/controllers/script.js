import BST from "../models/bst/bst.js";
import Node from "../models/Node.js";

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
}

//escucha los clicks en los botones de agregar al carrito
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productCard = event.target.closest('.card-product');
        const product = {
            id: productCard.querySelector('h3').innerText,
            name: productCard.querySelector('h3').innerText,
            price: parseFloat(productCard.querySelector('.price').innerText.replace('$', '')),
            image: productCard.querySelector('img').src
        };
        addToCart(product);
    });
});
