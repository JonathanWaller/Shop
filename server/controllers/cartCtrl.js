const getCart = (req, res) => {
  let db = req.app.get("db");
  db.cart.getCart().then(response => {
    res.status(200).json(response);
  });
};

const addToCart = (req, res) => {
  console.log(req.body);
  const { id, name, price, img, qty } = req.body;
  let db = req.app.get("db");
  db.cart.addToCart([id, name, price, img, qty]).then(response => {
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

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};
