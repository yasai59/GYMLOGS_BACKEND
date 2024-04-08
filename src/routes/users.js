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

router.post("/", async (req, res) => {
  const { username, email, pssd, urole, foto } = req.body;

  const hash = await Bun.password.hash(pssd, { algorithm: "bcrypt" });
  console.log(hash);

  conn
    .query("SELECT * FROM users WHERE email = ?", [email])
    .then(([result]) => {
      if (result.length === 0) {
        conn
          .query(
            "INSERT INTO users (username, email, pssd, urole, foto) VALUES (?, ?, ?, ?, ?)",
            [
              username,
              email,
              // pssd,
              hash,
              urole,
              foto,
            ]
          )
          .then(([result]) => {
            res.status(201).json({
              pk_id_user: result.insertId,
              username,
              email,
              hash,
              urole,
              foto,
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
          });
        // console.log("primera fase bien")
      }
    });
});

router.delete("/:id", (req, res) => {
  conn
    .query("DELETE FROM users WHERE pk_id_user = ?", [req.params.id])
    .then(() => {
      res.json({ deleted: req.params.id });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// UPDATE USERS
// update email
router.put("/email/:id", (req, res) => {
  const { email } = req.body;
  conn
    .query("UPDATE users SET email = ? WHERE pk_id_user = ?", [
      email,
      req.params.id,
    ])
    .then(() => {
      res.json({ pk_id_user: req.params.id, email });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// update username
router.put("/username/:id", (req, res) => {
  const { username } = req.body;
  conn
    .query("UPDATE users SET username = ? WHERE pk_id_user = ?", [
      username,
      req.params.id,
    ])
    .then(() => {
      res.json({ pk_id_user: req.params.id, username });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// update password
router.put("/password/:id/:passwd", async (req, res) => {
  const { pssd } = req.body;
  const pastPssd = req.params.passwd;
  const hash = await Bun.password.hash(pssd, { algorithm: "bcrypt" });

  conn
    .query("SELECT pssd FROM users WHERE pk_id_user = ?", [req.params.id])
    .then(([result]) => {
      if (result.length === 0) {
        res.status(404).json({ error: "Not found" });
      } else {
        if (Bun.password.verify(pastPssd, result[0].pssd)) {
          conn
            .query("UPDATE users SET pssd = ? WHERE pk_id_user = ?", [
              hash,
              req.params.id,
            ])
            .then(() => {
              res.json({ pk_id_user: req.params.id, hash });
            })
            .catch((err) => {
              res.status(500).json({ error: err });
            });
        }
      }
    });
});

module.exports = router;
