const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

// SHOW RUTINES BY USER
router.get("/:id", (req, res, next) => {
  conn
    .query("SELECT * FROM rutine WHERE fk_id_username = ?", [req.params.id])
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/:id", async (req, res) => {
  const { rutina_name, type_rutine, day_rutine, num_rutine } = req.body;
  const fk_id_username = req.params.id;

  conn
    .query(
      "INSERT INTO rutine (rutina_name, type_rutine, day_rutine, num_rutine, fk_id_username) VALUES (?, ?, ?, ?, ?)",
      [rutina_name, type_rutine, day_rutine, num_rutine, fk_id_username]
    )
    .then(([result]) => {
      res.status(201).json({
        pk_id_rutine: result.insertId,
        rutina_name,
        type_rutine,
        day_rutine,
        num_rutine,
        fk_id_username,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
