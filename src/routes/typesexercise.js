const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

router.get("/", (req, res, next) => {
  conn
    .query("SELECT * FROM type_exercise")
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res, next) => {
  conn
    .query("SELECT name FROM type_exercise WHERE pk_id_type = ?", [
      req.params.id,
    ])
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
