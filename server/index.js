require("dotenv").config();
const express = require("express"),
  { json } = require("body-parser"),
  massive = require("massive"),
  session = require("express-session");
PORT = 3001;

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

// middlewares
// const { checkForSession, logger } = require("./middlewares/checkForSession");

const app = express();

// const logger = (req, res, next) => {
//   console.log("REQ.BODY: ", req.body);
//   console.log("REQ.SESSION: ", req.session);
//   next();
// };

app.use(json());
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
// app.use(logger);
// app.use(checkForSession);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

// test
// app.get("/api/test", (req, res) => {
//   res.status(200).json(`Let's get it.`);
// });

// Store
app.get("/api/store", getStore);
app.get("/api/product/:id", getProduct);
app.get("/api/category/:id", getCategory);
app.get("/api/sale", getSaleItems);

// sessionCart
// app.post(
//   "/api/post",
//   checkForSession,
//   addSessionCart
// , (req, res, next) => {
//   res.send(200).json(req.session);
// console.log("howdy");
// }
// );

// app.post("/api/post", addSessionCart);

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  // res.status(200).json(req.session.cart);
});
app.get("/api/session", (req, res, next) => {
  // console.log("TOTAL: ", req.session.cart.total);
  res.status(200).json(req.session.cart);
});

// Cart
app.get("/api/cart", getCart);
app.post("/api/items", addToCart);
app.delete("/api/item/:id", removeFromCart);
app.delete("/api/emptyCart/:id", emptyCart);
app.put(`/api/quantity/:id`, updateQty);
app.put("/api/size/:id", updateSize);

app.listen(PORT, () => console.log(`Time to shop from ${PORT}`));
