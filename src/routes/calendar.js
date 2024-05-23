import { Router } from "express";
import conn from "../database/connection.js";

const router = Router();

//GET ALL SESSIONS
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM calendar");
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//GET BY SESSION EXERCISE AND DAY
router.get("/exercise/:id/:day", async (req, res) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM calendar WHERE fk_id_session_ex = ? AND day = ?",
      [req.params.id, req.params.day]
    );
    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Calendar not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//GET BY SESSION EXERCISE
router.get("/exercise/:id", async (req, res) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM calendar WHERE fk_id_session_ex = ?",
      [req.params.id]
    );
    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Calendar not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//GET BY SESSION ID
router.get("/:id", async (req, res) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM sessions WHERE pk_id_sessio = ?",
      [req.params.id]
    );
    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Session not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//POST SESSION EXERCISE
router.post("/", async (req, res) => {
  const { serie, weight, repetitions, duration, day, fk_id_session_ex } =
    req.body;

  try {
    const rows = await conn.query(
      "SELECT * FROM sessions_exercise WHERE pk_id_sessio_ex = ?",
      [fk_id_session_ex]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Session not found" });
    } else {
      const [rows2, fields2] = await conn.query(
        "INSERT INTO calendar (serie, weight, repetitions, duration, day, fk_id_session_ex) VALUES (?, ?, ?, ?, ?, ?)",
        [serie, weight, repetitions, duration, day, fk_id_session_ex]
      );
      return res.status(201).json({
        pk_id_calendar: rows2.insertId,
        serie: serie,
        weight: weight,
        repetitions: repetitions,
        duration: duration,
        day: day,
        fk_id_session_ex: fk_id_session_ex,
      });
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

export default router;
