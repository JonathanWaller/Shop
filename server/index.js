require("dotenv").config();
const express = require("express"),
  { json } = require("body-parser"),
  massive = require("massive"),
  PORT = 3001;

//   controllers
const { getStore } = require("./controllers/storeCtrl");

const app = express();

app.use(json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

// test
// app.get("/api/test", (req, res) => {
//   res.status(200).json(`Let's get it.`);
// });

app.get("/api/store", getStore);

app.listen(PORT, () => console.log(`Time to shop from ${PORT}`));
