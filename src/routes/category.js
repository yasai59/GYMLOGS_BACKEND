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

router.get("/:id", (req, res, next) => {
  conn
    .query("SELECT name FROM category WHERE pk_id_category = ?", [req.params.id])
    .then(([rows]) => {
      if (rows.length) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
