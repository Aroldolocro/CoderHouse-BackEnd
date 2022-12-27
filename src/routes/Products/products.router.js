import { Router } from "express";
import socketServer from "../../app.js";
import ProductManager from "../../classes/Products/products.manager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  res.render("home", {
    products: ProductsFromDB,
    style: "index.css",
    script: "index.js",
  });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    style: "index.css",
    script: "index.js",
  });
});

router.post("/realtimeproducts", (req, res) => {
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
      product.price / 1,
      product.status,
      product.stock / 1,
      product.category,
      product.thumbnails
    );
  }
  res.render("realTimeProducts", {
    style: "index.css",
    script: "index.js",
  });
});

setTimeout(() => {
  socketServer.on("connection", (socket) => {
    socket.on("Socket-02", async (data) => {
      const InputValue = await data;
      manager.deleteProduct(InputValue);
    });
  });
}, 1000);

export default router;
