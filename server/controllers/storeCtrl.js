const getStore = (req, res) => {
  let db = req.app.get("db");
  db.store.getStore().then(response => {
    res.status(200).json(response);
  });
};

module.exports = {
  getStore
};
