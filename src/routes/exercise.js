const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

router.get("/", (req, res, next) => {
  conn
    .query("SELECT * FROM exercise")
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/post", (req, res, next) => {
  const { name, description, category_id, type_exercise_id } = req.body;
  conn
    .query(
      "INSERT INTO exercise (name, description, category_id, type_exercise_id) VALUES (?, ?, ?, ?)",
      [name, description, category_id, type_exercise_id]
    )
    .then(([result]) => {
      res.status(201).json({
        id: result.insertId,
        name,
        description,
        category_id,
        type_exercise_id,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/update:id", (req, res, next) => {
  const { name, description, category_id, type_exercise_id } = req.body;
  conn
    .query(
      "UPDATE exercise SET name = ?, description = ?, category_id = ?, type_exercise_id = ? WHERE id = ?",
      [name, description, category_id, type_exercise_id, req.params.id]
    )
    .then(() => {
      res.json({
        id: req.params.id,
        name,
        description,
        category_id,
        type_exercise_id,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/delete:id", (req, res, next) => {
    conn
        .query("DELETE FROM exercise WHERE id = ?", [req.params.id])
        .then(() => {
        res.json({ deleted: req.params.id });
        })
        .catch((err) => {
        res.status(500).json({ error: err });
        });
    });

module.exports = router;