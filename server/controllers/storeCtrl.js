const getStore = (req, res) => {
  let db = req.app.get("db");
  db.store.getStore().then(response => {
    res.status(200).json(response);
  });
};

const getProduct = (req, res) => {
  let { id } = req.params;
  let db = req.app.get("db");
  db.store.getProduct(id).then(response => {
    res.status(200).json(response);
  });
};

getCategory = (req, res) => {
  let { id } = req.params;
  let db = req.app.get("db");
  db.store.getCategory(id).then(response => {
    res.status(200).json(response);
  });
};

getSaleItems = (req, res) => {
  let { id } = req.params;
  let db = req.app.get("db");
  db.store.getSale().then(response => {
    res.status(200).json(response);
  });
};

module.exports = {
  getStore,
  getProduct,
  getCategory,
  getSaleItems
};
