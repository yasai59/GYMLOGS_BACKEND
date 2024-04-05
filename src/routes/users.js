const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

router.get("/", (req, res) => {
  conn
    .query("SELECT * FROM users")
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  conn
    .query("SELECT * FROM users WHERE pk_id_user = ?", [req.params.id])
    .then((rows) => {
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

router.post("/", (req, res) => {
  const { username, email, pssd, urole, foto } = req.body;

  conn.query("SELECT * FROM users WHERE email = ?"[email]).then(([result]) => {
    if (result.length === 0) {
        /*
      conn
        .query("INSERT INTO users (username, email, pssd, urole, foto) VALUES (?, ?, ?, ?, ?) ", [
          username,
          email,
          Bun.password.hash(pssd),
          urole,
          foto,
        ])
        .then(([result]) => {
          res.status(201).json({
            pk_id_user: result.insertId,
            username,
            email,
            pssd,
            urole,
            foto,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
          console.log(err);
        });
        */
    console.log("primera fase bien")
    }
  });
});

module.exports = router;
