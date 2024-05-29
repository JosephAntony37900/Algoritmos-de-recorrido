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
    search(name) {
        return this.searchNode(this.root, name);
    }

    searchNode(node, name) {
        if (node === null) {
            return null;
        }
        if (node.product.name === name) {
            return node.product;
        }
        const leftSearch = this.searchNode(node.left, name);
        if (leftSearch) {
            return leftSearch;
        }
        return this.searchNode(node.right, name);
    }

}




export default BST;