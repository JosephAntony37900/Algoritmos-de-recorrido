import Node from "../Node.js";
class BST {
    constructor() {
        this.root = null;
    }

    insert(product) {
        const newNode = new Node(product);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
      //recursividad
    insertNode(node, newNode) { //se llama a si mismo recursivamente para encontrar la posicion correcta para insertar un nuevo nodo en el arbol
        if (newNode.product.price < node.product.price) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    //callbaks
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback); // llama a inOrderTraverseNode con un callback para procesar cada nodo en el recorrido en orden
    }
    //recursividad 2
    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.product);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    //callbacks 2
    inOrderTraverseDesc(callback) {
        this.inOrderTraverseNodeDesc(this.root, callback);
    }
     //recursividad 3
    inOrderTraverseNodeDesc(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNodeDesc(node.right, callback);
            callback(node.product);
            this.inOrderTraverseNodeDesc(node.left, callback);
        }
    }
}

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

export default BST;