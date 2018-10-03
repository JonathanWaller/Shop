const checkForSession = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = { cart: [], total: 0 };
  }
  console.log(req.session);
  next();
};

const logger = (req, res, next) => {
  console.log("REQ.BODY: ", req.body);
  console.log("REQ.SESSION: ", req.session);
  console.log("REQ.SESSION.CART: ", req.session.cart);
  next();
};

module.exports = {
  checkForSession,
  logger
};
