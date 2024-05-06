const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

//GET ALL SESSIONS EXERCISE
//ADMIN
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM sessions_exercise");
    return res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//GET BY SESSION ID
//CLIENTS
router.get("/:id", async (req, res) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM sessions_exercise WHERE fk_id_sessio = ?",
      [req.params.id]
    );

    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//POST SESSION EXERCISE
router.post("/", async (req, res) => {
  const { fk_id_exercise, fk_id_sessio } = req.body;

  try {
    const rows = await conn.query(
      "SELECT * FROM exercise WHERE pk_id_exercise = ?",
      [fk_id_exercise]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Exercise not found" });
    } else {
      const rows1 = await conn.query(
        "SELECT * FROM sessions WHERE pk_id_sessio = ?",
        [fk_id_sessio]
      );
      if (!rows1.length) {
        // Changed 'rows' to 'rows1'
        return res.status(404).json({ error: "Session not found" });
      } else {
        const [rows2, fields2] = await conn.query(
          "INSERT INTO sessions_exercise (fk_id_sessio, fk_id_exercise) VALUES (?, ?)",
          [fk_id_sessio, fk_id_exercise]
        );
        if (rows2.affectedRows) {
          // Changed 'rows2.length' to 'rows2.affectedRows'
          return res.status(201).json({
            id: rows2.insertId,
            fk_id_sessio,
            fk_id_exercise,
          });
        } else {
          return res.status(404).json({ error: "Not found" });
        }
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
    const [rows, fields] = await conn.query(
      "DELETE FROM sessions_exercise WHERE pk_id_sessio_ex = ?",
      [req.params.id]
    );
    if (rows.affectedRows) {
      return res.json({ message: "Deleted" });
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
