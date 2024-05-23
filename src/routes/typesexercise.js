import { Router } from "express";
import conn from "../database/connection.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM type_exercise");
    if (rows.length) {
      console.log(rows);
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM type_exercise WHERE pk_id_type = ?",
      [req.params.id]
    );
    if (rows.length) {
      console.log(rows);
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

export default router;
