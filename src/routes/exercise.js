const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

// router.get("/", (req, res, next) => {
//   const startIndex = req.startIndex;
//   const limit = req.limit;

// });

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

// to get only the exercises of a specific type
// http://localhost:3000/api/exercise/type/1
router.get("/type/:id", (req, res, next) => {
  conn
    .query("SELECT * FROM exercise WHERE fk_id_type = ?", [req.params.id])
    .then(([rows]) => {
      if (rows.length) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
);

router.post("/", async (req, res, next) => {
  const { exercise_name, link_video, url_image, fk_category_1, fk_id_type } =
    req.body;
  conn
    .query(
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

//api request example http://localhost:3000/api/exercise/2
router.put("/:id", (req, res, next) => {

  const { exercise_name, link_video, url_image, fk_category_1, fk_id_type } =
    req.body;
  conn
    .query(
      "UPDATE exercise SET exercise_name = ?, link_video = ?, url_image = ?, fk_category_1 = ?, fk_id_type = ? WHERE pk_id_exercise = ?",
      [
        exercise_name,
        link_video,
        url_image,
        fk_category_1,
        fk_id_type,
        req.params.id,
      ]
    )
    .then(() => {
      res.json({
        pk_id_exercise: req.params.id,
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

router.delete("/:id", (req, res, next) => {
  conn
    .query("DELETE FROM exercise WHERE pk_id_exercise = ?", [req.params.id])
    .then(() => {
      res.json({ deleted: req.params.id });
    })
    .catch((err) => {
      res.status(200).json({ status: "succesfull" });
      res.status(500).json({ error: err });
    });
});

module.exports = router;
