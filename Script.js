class ProductManager {
    constructor() {
      this.Products = [];
      this.ProblemController = "Nothing to care about...";
      this.ProductFound = undefined;
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
  
      if (this.Products.find((x) => x.code === code)) {
        this.ProblemController =
          "Oops, it seems that one of the products code is already in the catalog";
      } else if (
        product.title === undefined ||
        product.description === undefined ||
        product.price === undefined ||
        product.thumbnail === undefined ||
        product.code === undefined ||
        product.stock === undefined
      ) {
        this.ProblemController =
          "Oops, it seems that one of products field is empty";
      } else {
        this.Products.push(product);
      }
    };
  
    getProducts = () => {
      return this.Products;
    };
  
    getProductById = (id) => {
      const AllProductsId = this.Products.map((x) => x.id);
      if (AllProductsId.includes(id)) {
        return (this.ProductFound = this.Products.filter((x) => x.id === id));
      } else {
        return (this.ProductFound = "Id not specified or product not found");
      }
    };
  }
  
  const Program = new ProductManager();
  
  /*Add products here: */
  
  Program.addProduct("Tomate", "Tomate rico", 50, "Imagen", 10, 3);
  Program.addProduct("Lechuga", "Lechuga fresca", 75, "Imagen", 11, 1);
  Program.addProduct("Zanahoria", "Super Zanahoria", 20, "Imagen", 12, 7);
  
  /*Search product by Id - Insert Id here: */
  
  Program.getProductById(1);
  
  /*Run program*/
  
  console.log(Program);