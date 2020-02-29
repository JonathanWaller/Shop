require("dotenv").config();
const express = require("express"),
  { json } = require("body-parser"),
  massive = require("massive"),
  session = require("express-session");
PORT = 3005;
const path = require("path");

//   controllers
const {
  getStore,
  getProduct,
  getCategory,
  getSaleItems
} = require("./controllers/storeCtrl");
const {
  getCart,
  addToCart,
  removeFromCart,
  addSessionCart,
  emptyCart,
  updateSize,
  updateQty
} = require("./controllers/cartCtrl");

const app = express();

app.use(json());
app.use(express.static(`${__dirname}/../build`));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
  })
);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

// Session
app.post("/api/logout", (req, res) => {
  req.session.destroy();
  // res.status(200).json(req.session.cart);
});
app.get("/api/session", (req, res, next) => {
  // console.log("TOTAL: ", req.session.cart.total);
  res.status(200).json(req.session.cart);
});

// Store
app.get("/api/store", getStore);
app.get("/api/product/:id", getProduct);
app.get("/api/category/:id", getCategory);
app.get("/api/sale", getSaleItems);

// Cart
app.get("/api/cart", getCart);
app.post("/api/items", addToCart);
app.delete("/api/item/:id", removeFromCart);
app.delete("/api/emptyCart/:id", emptyCart);
app.put(`/api/quantity/:id`, updateQty);
app.put("/api/size/:id", updateSize);

// for build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => console.log(`Time to shop from ${PORT}`));
