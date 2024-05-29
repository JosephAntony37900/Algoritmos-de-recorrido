// Inicializacion al Cargar la Pagina
document.addEventListener('DOMContentLoaded', () => {
    const cartProductsContainer = document.getElementById('cart-products');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkout-form');
    const paymentForm = document.getElementById('payment-form');

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartProductsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'cart-product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                    <p>Cantidad: ${product.quantity}</p>
                </div>
            `;
            cartProductsContainer.appendChild(productElement);
            total += product.price * product.quantity;
        });
        cartTotalElement.innerText = total.toFixed(2);
    }

    checkoutButton.addEventListener('click', () => {
        checkoutForm.style.display = 'block';
    });

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Compra realizada con éxito');
        localStorage.removeItem('cart');
        updateCartDisplay();
        checkoutForm.style.display = 'none';
    });

    updateCartDisplay();
});