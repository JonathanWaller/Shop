require("dotenv").config();
const express = require("express"),
  { json } = require("body-parser"),
  massive = require("massive"),
  PORT = 3001;

//   controllers
const { getStore } = require("./controllers/storeCtrl");
const { getCart, addToCart } = require("./controllers/cartCtrl");

const app = express();

app.use(json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

// test
// app.get("/api/test", (req, res) => {
//   res.status(200).json(`Let's get it.`);
// });

// Store
app.get("/api/store", getStore);

// Cart
app.get("/api/cart", getCart);
app.post("/api/items", addToCart);

app.listen(PORT, () => console.log(`Time to shop from ${PORT}`));
