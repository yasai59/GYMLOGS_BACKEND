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

router.post("/", async (req, res, next) => {
  const { exercise_name, link_video, url_image, fk_category_1, fk_id_type} = req.body;
  conn.query(
      "INSERT INTO exercise (exercise_name, link_video, url_image, fk_category_1, fk_id_type) VALUES (?, ?, ?, ?, ?)",
      [exercise_name, link_video, url_image, fk_category_1, fk_id_type]
    )
    .then(([result]) => {
      res.status(201).json({
        id: result.insertId,
        exercise_name,
        link_video,
        url_image,
        fk_category_1,
        fk_id_type,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
    });
});

router.put("/:id", (req, res, next) => {
  const { exercise_name, link_video, url_image, fk_category_1, fk_id_type} = req.body;
  conn
    .query(
      "UPDATE exercise SET exercise_name = ?, link_video = ?, url_image = ?, fk_category_1 = ?, fk_id_type = ? WHERE pk_id_exercise = ?",
      [exercise_name, link_video, url_image, fk_category_1, fk_id_type, req.params.pk_id_exercise]
    )
    .then(() => {
      res.json({
        pk_id_exercise: req.params.pk_id_exercise,
        exercise_name,
        link_video,
        url_image,
        fk_category_1,
        fk_id_type,
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
