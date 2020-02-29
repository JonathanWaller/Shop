const getCart = (req, res) => {
  let db = req.app.get("db");
  db.cart.getCart(req.sessionID).then(response => {
    res.status(200).json(response);
  });
};

const addToCart = (req, res) => {
  // console.log(req.body);
  // console.log(req.sessionID);
  const { id, name, price, img, qty, size, category } = req.body;
  const { sessionID } = req;
  // console.log("SESSIONID: ", sessionID);

  let db = req.app.get("db");
  db.cart
    .addToCart([id, sessionID, name, price, img, qty, size, category])
    .then(response => {
      res.status(200).json(response);
    });
};

const removeFromCart = (req, res) => {
  const { id } = req.params;
  let db = req.app.get("db");
  db.cart.removeFromCart(id).then(response => {
    res.status(200).json(response);
  });
};

const updateQty = (req, res) => {
  let { id } = req.params;
  let { product_quantity } = req.body;
  let db = req.app.get("db");
  db.cart.updateQty(id, product_quantity).then(response => {
    res.status(200).json(response);
  });
};

const updateSize = (req, res) => {
  let { id } = req.params;
  let { product_size } = req.body;
  let db = req.app.get("db");
  db.cart.updateSize(id, product_size).then(response => {
    res.status(200).json(response);
  });
};

const emptyCart = (req, res) => {
  let { id } = req.params;
  let db = req.app.get("db");
  db.cart.emptyCart(id);
};

const addSessionCart = (req, res) => {
  // console.log("TERM REQ.SESSION.CART: ", req.session.cart);
  res.status(200).json(req.session.cart);
  // console.log(req.session.cart);
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  addSessionCart,
  emptyCart,
  updateSize,
  updateQty
};
