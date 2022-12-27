import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import ProductsRouter from "./routes/Products/products.router.js";
import ProductManager from "./classes/Products/products.manager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(8080);
const socketServer = new Server(httpServer);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", ProductsRouter);

const manager = new ProductManager();

socketServer.on("connection", async (socket) => {
  const ProductsFromDB = await manager.getProducts();
  socket.emit("Socket-01", ProductsFromDB);
});

export default socketServer;
