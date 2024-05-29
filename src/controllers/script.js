import BST from "../models/bst/bst.js";
import Node from "../models/Node.js";

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id); //busca
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
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: 'Funko pop Gohan', price: 4.60, image: '/images/gohan.jpg', discount: '-13%' },
        { name: 'Funko pop Goku', price: 5.70, image: '/images/koku.jpg', discount: '-22%' },
        { name: 'Funko pop Foxy', price: 3.20, image: '/images/foxy.jpg', discount: '' },
        { name: 'Funko pop Superman', price: 5.60, image: '/images/superman.jpg', discount: '' },
        { name: 'Funko pop Bonnie', price: 4.60, image: '/images/bonnie.jpg', discount: '-13%' },
        { name: 'Funko pop hawkeye', price: 5.70, image: '/images/hawkeye.jpg', discount: '-22%' },
        { name: 'Funko pop pikachu', price: 3.85, image: '/images/pikachu.png', discount: '-30%' },
        { name: 'Funko pop Tortuga Ninja', price: 5.60, image: '/images/tortuganinja.png', discount: '' },
    ];

    const bst = new BST();
    products.forEach(product => bst.insert(product));

    const productsContainer = document.getElementById('products-container');

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productHTML = `
                <div class="card-product">
                    <div class="container-img">
                        <img src="${product.image}" alt="${product.name}" />
                        ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
                        <div class="button-group">
                            <span><i class="fa-regular fa-eye"></i></span>
                            <span><i class="fa-regular fa-heart"></i></span>
                            <span><i class="fa-solid fa-code-compare"></i></span>
                        </div>
                    </div>
                    <div class="content-card-product">
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <h3>${product.name}</h3>
                        <span class="add-cart"><i class="fa-solid fa-basket-shopping"></i></span>
                        <p class="price">$${product.price.toFixed(2)}</p>
                    </div>
                </div>`;
            productsContainer.innerHTML += productHTML;
        });
    }

    const sortOptions = document.querySelectorAll('.container-options span');
    sortOptions[1].addEventListener('click', () => {
        const sortedProducts = [];
        bst.inOrderTraverse(product => sortedProducts.push(product));
        displayProducts(sortedProducts);
    });

    sortOptions[2].addEventListener('click', () => {
        const sortedProductsDesc = [];
        bst.inOrderTraverseDesc(product => sortedProductsDesc.push(product));
        displayProducts(sortedProductsDesc);
    });
    
});

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: 'Funko pop Gohan', price: 4.60, image: '/images/gohan.jpg', discount: '-13%' },
        { name: 'Funko pop Goku', price: 5.70, image: '/images/koku.jpg', discount: '-22%' },
        { name: 'Funko pop Foxy', price: 3.20, image: '/images/foxy.jpg', discount: '' },
        { name: 'Funko pop Superman', price: 5.60, image: '/images/superman.jpg', discount: '' },
        { name: 'Funko pop Bonnie', price: 4.60, image: '/images/bonnie.jpg', discount: '-13%' },
        { name: 'Funko pop hawkeye', price: 5.70, image: '/images/hawkeye.jpg', discount: '-22%' },
        { name: 'Funko pop pikachu', price: 3.85, image: '/images/pikachu.png', discount: '-30%' },
        { name: 'Funko pop Tortuga Ninja', price: 5.60, image: '/images/tortuganinja.png', discount: '' },
    ];

    const bst = new BST();
    products.forEach(product => bst.insert(product));

    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResultContainer = document.getElementById('search-result');

    

    function displaySearchResult(product) {
        searchResultContainer.innerHTML = '';
        if (product) {
            const productHTML = `
                <div class="card-product">
                    <div class="container-img">
                        <img src="${product.image}" alt="${product.name}" />
                        ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
                        <div class="button-group">
                            <span><i class="fa-regular fa-eye"></i></span>
                            <span><i class="fa-regular fa-heart"></i></span>
                            <span><i class="fa-solid fa-code-compare"></i></span>
                        </div>
                    </div>
                    <div class="content-card-product">
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <h3>${product.name}</h3>
                        <span class="add-cart"><i class="fa-solid fa-basket-shopping"></i></span>
                        <p class="price">$${product.price.toFixed(2)}</p>
                    </div>
                </div>`;
            searchResultContainer.innerHTML += productHTML;
        } else {
            searchResultContainer.innerHTML = '<p>Producto no encontrado</p>';
        }
    }
    

    searchButton.addEventListener('click', () => {
        const productName = searchInput.value;
        const product = bst.search(productName);
        displaySearchResult(product);
    });

    // Initial display of products
    displayProducts(products);
});



