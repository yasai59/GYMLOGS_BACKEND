const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

//GET BY SESSION ID
router.get("/:id", (req, res) => {
  conn
    .query("SELECT * FROM sessions_exercise WHERE fk_id_sessio = ?", [req.params.id])
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//POST SESSION EXERCISE
router.post("/", async (req, res) => {
  const { fk_id_exercise, fk_id_sessio } = req.body;

  conn
    .query(
      "INSERT INTO sessions_exercise (fk_id_exercise, fk_id_sessio) VALUES (?, ?)",
      [fk_id_exercise, fk_id_sessio]
    )
    .then(([result]) => {
      res.status(201).json({
        pk_id_sessio_ex: result.insertId,
        fk_id_exercise,
        fk_id_sessio,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//DELETE SESSION EXERCISE
router.delete("/:id", (req, res) => {
  conn
    .query("DELETE FROM sessions_exercise WHERE pk_id_sessio_ex = ?", [req.params.id])
    .then(() => {
      res.sendStatus(204).json({ message: "Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


module.exports = router;