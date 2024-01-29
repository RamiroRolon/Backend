const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, img, code, stock }) {
    //Validamos todos los campos
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Se necesitan todos los campos ");
      return;
    }

    //Validamos que el codigo sea unico
    if (this.products.some((item) => item.code === code)) {
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
      stock,
    };

    //Array:

    this.products.push(newProduct);

    await this.guardarArchivo(this.products);
  }

  async getProducts() {
    return await this.leerArchivo();
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      if ((item) => item.id === id) {
        const buscado = arrayProductos.find((item) => item.id === id);
        return buscado;
      } else {
        throw new Error("Product Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(productIdToUpdate, updateItems) {
    try {
      const productIndex = this.products.findIndex(
        (item) => item.id === productIdToUpdate
      );
      if (productIndex >= 0) {
        if (!Object.keys(updateItems).includes("productID")) {
          this.products[productIndex] = {
            ...this.products[productIndex],
            ...updateItems,
          };
          await this.guardarArchivo(this.products);
        } else {
          throw new Error("No se puede modificar productID");
        }
      }
    } catch (error) {
      console.log("error", error.message);
      return null;
    }
  }

  async deleteProduct(productIdToDelete) {
    try {
      if (this.products((item) => item.id == productIdToDelete)) {
        const productIndex = this.products.findIndex(
          (item) => item.id == productIdToDelete
        );
        this.products.splice(productIndex);
        this.guardarArchivo(this.products);
      } else {
        throw new Error("No existe el producto con el productID ingresado !!!");
      }
    } catch (error) {
      console.log("error", error.message);
      return null;
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("error al leer el archivo", error);
    }
  }

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("error al leer el archivo", error);
    }
  }
}

module.exports = ProductManager;
