const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

//GET BY SESSION ID
router.get("/:id", async (req, res) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM sessions WHERE pk_id_sessio = ?",
      [req.params.id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Session not found" });
    } else {
      const [rows2, fields2] = await conn.query(
        "SELECT * FROM calendar WHERE fk_id_session = ?",
        [req.params.id]
      );
      return res.status(200).json({
        pk_id_calendar: rows2[0].pk_id_calendar,
        datas: rows2[0].datas,
        duration: rows2[0].duration,
        fk_id_session: rows2[0].fk_id_session,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//POST SESSION EXERCISE
router.post("/", async (req, res) => {
  const { datas, duration, fk_id_session } = req.body;

  try {
    const rows = await conn.query(
      "SELECT * FROM sessions WHERE pk_id_sessio = ?",
      [fk_id_session]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Session not found" });
    } else {
      const [rows2, fields2] = await conn.query(
        "INSERT INTO calendar (datas, duration, fk_id_session) VALUES (?, ?, ?)",
        [datas, duration, fk_id_session]
      );
      if (rows2.affectedRows) {
        res.status(201).json({
          id: rows2.insertId,
          datas,
          duration,
          fk_id_session,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//DELETE SESSION EXERCISE
router.delete("/:id", async (req, res) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM calendar WHERE pk_id_calendar = ?",
      [req.params.id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Calendar not found" });
    } else {
      const [rows2, fields2] = await conn.query(
        "DELETE FROM calendar WHERE pk_id_calendar = ?",
        [req.params.id]
      );
      res.status(200).json({ message: "Calendar deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
