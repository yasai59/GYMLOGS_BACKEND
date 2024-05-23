import { Router } from "express";
import conn from "../database/connection.js";

const router = Router();

// SHOW mainRoutine
router.get("/", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM mainRoutine");
    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// SHOW mainRoutine BY USER ID
router.get("/:id", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM mainRoutine WHERE fk_id_user = ?",
      [req.params.id]
    );
    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// SHOW mainRoutine BY ROUTINE ID AND USER ID
router.get("/:id/:id_user", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM mainRoutine WHERE fk_id_user = ? AND fk_id_routine = ?",
      [req.params.id_user, req.params.id]
    );
    if (rows.length) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// POST mainRoutine
router.post("/:id", async (req, res) => {
  const { fk_id_user } = req.body;

  try {
    const [rows, fields] = await conn.query(
      "INSERT INTO mainRoutine (fk_id_user, fk_id_routine) VALUES (?, ?)",
      [fk_id_user, req.params.id]
    );

    const [newRoutine] = await conn.query(
      "SELECT * FROM mainRoutine WHERE pk_id_mainroutine = ?",
      [rows.insertId]
    );

    return res.status(201).json(newRoutine[0]);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// DELETE mainRoutine BY USER ID
router.delete("/:id", async (req, res) => {
  try {
    const [rows, fields] = await conn.query(
      "DELETE FROM mainRoutine WHERE fk_id_user = ?",
      [req.params.id]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
});
export default router;
