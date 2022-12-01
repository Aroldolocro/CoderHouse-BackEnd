const fs = require("fs");

class ProductManager {
  constructor() {
    this.Path = "./JsonDataBase.json";
    this.Products = [];
    this.ProductFound = undefined;
    this.ProblemController = "Nothing to care about...";
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.Products.length,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.Products.push(product);
    const WriteJson = JSON.stringify(this.Products);
    fs.writeFileSync(this.Path, WriteJson);
  };

  getProducts = () => {
    const Data = JSON.parse(fs.readFileSync(this.Path, "utf-8"));
    return Data;
  };

  getProductById = (id) => {
    const AllProductsId = this.getProducts().map((x) => x.id);
    if (AllProductsId.includes(id)) {
      return (this.ProductFound = this.getProducts()[id]);
    } else if (id === undefined) {
      return (this.ProductFound =
        "Oops, it seems that the product id was not specified.");
    } else {
      return (this.ProductFound =
        "Oops, it seems that the product id was not found");
    }
  };

  updateProduct = ({
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    const AllProducts = this.getProducts();

    if (
      !id ||
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      return (this.ProblemController =
        "Oops, it seems that one or multiple field of the product updater have not been defined. Please define it.");
    } else {
      AllProducts[id] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      const WriteJson = JSON.stringify(AllProducts);
      fs.writeFileSync(this.Path, WriteJson);
    }
  };

  deleteProduct = (id) => {
    if (!id) {
      return (this.ProblemController =
        "Oops, the product id you are trying to delete has not been defined. Please define it.");
    } else {
      const AllProducts = this.getProducts();
      const NewAllProducts = AllProducts.filter((obj) => obj.id !== id);
      const WriteJson = JSON.stringify(NewAllProducts);
      fs.writeFileSync(this.Path, WriteJson);
    }
  };
}

const Program = new ProductManager();

/*Add products here: */

Program.addProduct(
  "Bitcoin",
  "Bitcoin BEP-20",
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(15000),
  "Imagen-url",
  73,
  3
);
Program.addProduct(
  "Ethereum",
  "Ethereum ERC-20",
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(1500),
  "Imagen-url",
  146,
  7
);
Program.addProduct(
  "Litecoin",
  "Litecoin LTC",
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(80),
  "Imagen-url",
  292,
  15
);
Program.addProduct(
  "BNB",
  "BNB ERC-20",
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(300),
  "Imagen-url",
  584,
  9
);

/*Search product by Id */

Program.getProductById(3);

/* Update product by Id */

Program.updateProduct({
  id: 1 /* Product Id to replace */,
  title: "Ethereum",
  description: "Ethereum ERC-20",
  price: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(950),
  thumbnail: "Imagen-url",
  code: 146,
  stock: 5,
});

/* Delete Product by Id */

Program.deleteProduct(2);

/*Run program*/

console.log(Program);
console.log(
  "\n------------------\n\nProducts list (After all changes):\n\n",
  Program.getProducts()
);
