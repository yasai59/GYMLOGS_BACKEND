const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

// SHOW SESSIONS BY ROUTINE
router.get("/routine/:id", async (req, res, next) => {
  try {
    const rows = await conn.query(
      "SELECT * FROM sessions WHERE fk_id_routine = ?",
      [req.params.id]
    );
    console.log(rows);
    if (rows.length) {
      return res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM sessions WHERE pk_id_sessio = ?",
      [req.params.id]
    );
    if (rows.length) {
      return res.status(200).json(rows);
    }
    return res.status(404).json({ error: "Not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//get the category of the session
router.get("/category/:id", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT fk_category_1, fk_category_2 FROM sessions WHERE pk_id_sessio = ?",
      [req.params.id]
    );
    console.log(rows);
    if (rows.length) {
      const fk_category_1 = rows.fk_category_1;
      const fk_category_2 = rows.fk_category_2;

      const [rows1, fields1] = await conn.query(
        "SELECT name FROM category WHERE pk_id_category = ?",
        [fk_category_1]
      );
      const category1 = rows1.name;

      if (fk_category_2) {
        const [rows2, fields2] = await conn.query(
          "SELECT name FROM category WHERE pk_id_category = ?",
          [fk_category_2]
        );
        const category2 = rows2.name;
        res.json({ category1, category2 });
      } else {
        res.json({ category1 });
      }
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//POST
router.post("/:id", async (req, res) => {
  const { nom_session, week_day, fk_category_1, fk_category_2 } = req.body;

  const fk_id_routine = req.params.id;

  try {
    const rows = await conn.query(
      "SELECT * FROM routines WHERE pk_id_routine = ?",
      [fk_id_routine]
    );
    console.log(rows);
    if (rows.length) {
      const rows = await conn.query(
        "SELECT * FROM sessions WHERE fk_id_routine = ?",
        [fk_id_routine]
      );
      if (rows.length < 7) {
        const [result, field] = await conn.query(
          "INSERT INTO sessions (nom_session, week_day, fk_category_1, fk_category_2, fk_id_routine) VALUES (?, ?, ?, ?, ?)",
          [nom_session, week_day, fk_category_1, fk_category_2, fk_id_routine]
        );
        res.status(201).json({
          pk_id_sessio: result.insertId,
          nom_session,
          week_day,
          fk_category_1,
          fk_category_2,
          fk_id_routine,
        });
      }
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//UPDATE
// NAME SESSION
router.put("/name/:id", async (req, res) => {
  const { nom_session } = req.body;

  try {
    if (nom_session === "") {
      return res.status(400).json({ error: "Session name is required" });
    } else if (typeof nom_session !== "string") {
      return res.status(400).json({ error: "Incorrect type of the values" });
    } else {
      const [rows, fields] = await conn.query(
        "UPDATE sessions SET nom_session = ? WHERE pk_id_sessio = ?",
        [nom_session, req.params.id]
      );

      if (rows.affectedRows) {
        return res.status(200).json({ message: "Updated" });
      } else {
        return res.status(404).json({ error: "Not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//DELETE BY ID
router.delete("/:id", async (req, res) => {
  try {
    const rows = await conn.query(
      "DELETE FROM sessions WHERE pk_id_sessio = ?",
      [req.params.id]
    );

    if (rows[0].affectedRows === 0) {
      return res.status(404).json({ error: "Not found" });
    } else {
      return res.json("Deleted successfully");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
