const getCart = (req, res) => {
  let db = req.app.get("db");
  db.cart.getCart(req.sessionID).then(response => {
    res.status(200).json(response);
  });
};

// Using Session on Cart
// const addToCart = (req, res, next) => {
//   console.log(req.body);
//   console.log("SESSION ID: ", req.sessionID);
//   let { cart, total } = req.session.cart;
//   const { id, name, price, img, qty } = req.body;
//   cart.push({ id, name, price, img, qty });
//   req.session.cart.total += req.body.price;
//   res.status(200).send(req.session.cart);
//   // console.log(req.session.cart);
// };

const addToCart = (req, res) => {
  console.log(req.body);
  // console.log(req.sessionID);
  const { id, name, price, img, qty } = req.body;
  const { sessionID } = req;
  console.log("SESSIONID: ", sessionID);

  let db = req.app.get("db");
  db.cart.addToCart([id, sessionID, name, price, img, qty]).then(response => {
    res.status(200).json(response);
  });
};

const removeFromCart = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  let db = req.app.get("db");
  db.cart.removeFromCart(id).then(response => {
    res.status(200).json(response);
  });
};

const deleteFromCart = (req, res) => {
  console.log(req.params);
  let db = req.app.get("db");
  db.cart.deleteFromCart(req.sessionID);
};

const addSessionCart = (req, res) => {
  console.log("TERM REQ.SESSION.CART: ", req.session.cart);
  res.status(200).json(req.session.cart);
  console.log(req.session.cart);
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  addSessionCart,
  deleteFromCart
};
