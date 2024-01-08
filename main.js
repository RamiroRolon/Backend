// 1 Desafio Backend.

class ProductManager {

    static ultId = 0;

    constructor() {
    this.products= [];
}

addProduct(title, description, price, img, code, stock){

    //Validamos todos los campos
    if(!title || !description || !price || !img || !code || !stock){
        console.log ("Se necesitan todos los campos ") ;
        return;
    }

    //Validamos que el codigo sea unico
    if(this.products.some(item => item.code === code)) {
        console.log("El codigo debe ser unico");
        return;
    }

    //Nuevo objeto

    const newProduct = {
        id: ++ProductManager.ultId,
        title,
        description,
        price,
        img,
        code,
        stock
    }

    //Array:

this.products.push(newProduct);


}

getProducts() {
    return this.products;
}

getProductById(id) {
        const product = this.products.find(item => item.id === id) ;

        if(!product) {
            console.error("Not Found!")
        } else {
            console.log(product);
        }

}
}

// 1
const manager = new ProductManager();

//2
console.log(manager.getProducts());


// 3

manager.addProduct("Producto prueba" , "esto es un producto prueba" , 200, "sin imagen" , "abc123" , 25)

//4
console.log(manager.getProducts());

//6 

manager.addProduct("Producto prueba" , "esto es un producto prueba" , 200, "sin imagen" , "abc123" , 25)
