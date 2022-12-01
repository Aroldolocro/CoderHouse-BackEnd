const express = require("express");
const ProductManager = require("./productmanager");

const app = express();
const manager = new ProductManager();

// Instructions:
// Install dependencies: nodemon and express.
// Type "npm start" to run the project.
// Go to 127.0.0.1 to generate the products.

app.get("/", (req, res) => {
  manager.addProduct(
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
  manager.addProduct(
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
  manager.addProduct(
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
  manager.addProduct(
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

  res.send("Products generated successfully.");
});

app.get("/products", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  const Limit = req.query.limit;

  if (!Limit) {
    res.send({ Products: ProductsFromDB });
  } else if (Limit <= ProductsFromDB.length) {
    return res.send({ ProductsSolicited: ProductsFromDB.slice(0, Limit) });
  } else {
    res.send("Products can not be displayed. Please check your query param.");
  }
});

app.get("/products/:pid", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  const IdParam = req.params.pid;

  const FindProductByParam = ProductsFromDB[IdParam];

  if (!FindProductByParam) {
    res.send(
      "Product not found. Please check if the product id you are looking for is included on the product list."
    );
  } else {
    res.send(FindProductByParam);
  }
});

app.listen(8080, () => console.log("Express server is running."));
