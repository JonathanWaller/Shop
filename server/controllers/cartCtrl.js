const getCart = (req, res) => {
  let db = req.app.get("db");
  db.cart.getCart(req.sessionID).then(response => {
    res.status(200).json(response);
  });
};

const addToCart = (req, res) => {
  const { id, name, price, img, qty, size, category } = req.body;
  const { sessionID } = req;
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
  res.status(200).json(req.session.cart);
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
