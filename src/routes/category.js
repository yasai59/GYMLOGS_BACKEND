const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

router.get("/", (req, res, next) => {
  conn
    .query("SELECT * FROM category")
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;