import { Router } from "express";
import ProductManager from "./products.manager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  const Limit = req.query.limit;
  if (!Limit) {
    res.send({ ProductsFromDB });
  } else if (Limit <= ProductsFromDB.length) {
    res.send({ ProductsSolicited: ProductsFromDB.slice(0, Limit) });
  } else {
    res.send({
      status: "error",
      message: "Products can not be displayed. Please check your query param.",
    });
  }
});

router.get("/:pid", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  const IdParam = req.params.pid;

  const FindProductByParam = ProductsFromDB[IdParam];

  if (!FindProductByParam) {
    res.send({
      status: "error",
      message:
        "Product not found. Please check if the product id you are looking for is included on the product list.",
    });
  } else {
    res.send(FindProductByParam);
  }
});

router.post("/", (req, res) => {
  const product = req.body;
  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.status ||
    !product.stock ||
    !product.category
  ) {
    res.send({
      status: "error",
      message: "Some of the required fields have not been setted.",
    });
  } else {
    manager.addProduct(
      product.title,
      product.description,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbnails
    );
    res.send({ status: "success", message: "Product added successfully." });
  }
});

router.put("/:pid", async (req, res) => {
  const IdParam = req.params.pid;
  const ProductUpdated = req.body;
  if (IdParam > manager.getProducts().length - 1 || isNaN(IdParam)) {
    res.send({
      status: "error",
      message:
        "The product you are looking for has not been found, please check the id written.",
    });
  } else if (
    !ProductUpdated.title ||
    !ProductUpdated.description ||
    !ProductUpdated.code ||
    !ProductUpdated.price ||
    !ProductUpdated.status ||
    !ProductUpdated.stock ||
    !ProductUpdated.category
  ) {
    res.send({
      status: "error",
      message: "Some of the required fields have not been setted.",
    });
  } else {
    manager.updateProduct(
      IdParam,
      ProductUpdated.title,
      ProductUpdated.description,
      ProductUpdated.code,
      ProductUpdated.price,
      ProductUpdated.status,
      ProductUpdated.stock,
      ProductUpdated.category,
      ProductUpdated.thumbnails
    );
    res.send({ status: "success", message: "Product updated successfully." });
  }
});

router.delete("/:pid", (req, res) => {
  const IdParam = req.params.pid;
  if (IdParam > manager.getProducts().length - 1 || isNaN(IdParam)) {
    res.send({
      status: "error",
      message:
        "The product you are looking for has not been found, please check the id written.",
    });
  } else {
    manager.deleteProduct(IdParam);
    res.send({ status: "success", message: "Product deleted successfully." });
  }
});

export default router;
