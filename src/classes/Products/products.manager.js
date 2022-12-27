import FileSystem from "fs";

class ProductManager {
  constructor() {
    this.Path = "./src/classes/Products/ProductsJsonDataBase.json";
    this.Products = [];
  }

  addProduct = (
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) => {
    const ProductID = !FileSystem.existsSync(this.Path)
      ? 0
      : JSON.parse(FileSystem.readFileSync(this.Path, "utf-8")).length;

    const product = {
      id: ProductID,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    if (!FileSystem.existsSync(this.Path)) {
      this.Products.push(product);
      const WriteJson = JSON.stringify(this.Products);
      FileSystem.writeFileSync(this.Path, WriteJson);
    } else {
      const ReadJson = JSON.parse(FileSystem.readFileSync(this.Path, "utf-8"));
      ReadJson.push(product);
      const WriteJson = JSON.stringify(ReadJson);
      FileSystem.writeFileSync(this.Path, WriteJson);
    }
  };

  getProducts = () => {
    if (!FileSystem.existsSync(this.Path)) {
      return {
        status: "error",
        message: "There are no products on the list, please add at least one.",
      };
    } else {
      const Data = JSON.parse(FileSystem.readFileSync(this.Path, "utf-8"));
      return Data;
    }
  };

  deleteProduct = async (id) => {
    const ProductsFromDB = await this.getProducts();
    const NewProductsFromDB = ProductsFromDB.filter((x) => x.id != id);
    const WriteJson = JSON.stringify(NewProductsFromDB);
    FileSystem.writeFileSync(this.Path, WriteJson);
  };
}

export default ProductManager;
