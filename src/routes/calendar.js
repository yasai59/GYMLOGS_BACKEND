const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

//GET BY SESSION ID
router.get("/:id", (req, res) => {
  conn
    .query("SELECT * FROM calendar WHERE fk_id_session = ?", [req.params.id])
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//POST SESSION EXERCISE
router.post("/", async (req, res) => {
  const { datas, duration, fk_id_session } = req.body;

  conn
    .query(
      "INSERT INTO calendar (datas, duration, fk_id_session) VALUES (?, ?, ?)",
      [datas, duration, fk_id_session]
    )
    .then(([result]) => {
      res.status(201).json({
        pk_id_calendar: result.insertId,
        datas,
        duration,
        fk_id_session,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
