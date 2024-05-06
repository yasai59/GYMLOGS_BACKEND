const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

router.get("/", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM exercise");
    if (rows.length) {
      console.log(rows);
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// to get only the exercises of a specific type
// http://localhost:3000/api/exercise/type/1
router.get("/type/:id", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM exercise WHERE fk_id_type = ?",
      [req.params.id]
    );
    if (rows.length) {
      console.log(rows);
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/", async (req, res, next) => {
  const { exercise_name, link_video, url_image, fk_category_1, fk_id_type } =
    req.body;

  try {
    if (
      !exercise_name ||
      !link_video ||
      !url_image ||
      !fk_category_1 ||
      !fk_id_type
    ) {
      return res.status(400).json({ error: "Bad request" });
    } else if (
      typeof exercise_name !== "string" ||
      typeof link_video !== "string" ||
      typeof url_image !== "string" ||
      typeof fk_category_1 !== "number" ||
      typeof fk_id_type !== "number"
    ) {
      return res.status(400).json({ error: "Bad request" });
    } else {
      const [rows, fields] = await conn.query(
        "SELECT * FROM category WHERE pk_id_category = ?",
        [fk_category_1]
      );
      if (!rows.length) {
        return res.status(400).json({ error: "Bad request" });
      } else {
        const [rows, fields] = await conn.query(
          "SELECT * FROM type_exercise WHERE pk_id_type = ?",
          [fk_id_type]
        );
        if (!rows.length) {
          return res.status(400).json({ error: "Bad request" });
        } else {
          const [rows, fields] = await conn.query(
            "INSERT INTO exercise (exercise_name, link_video, url_image, fk_category_1, fk_id_type) VALUES (?, ?, ?, ?, ?)",
            [exercise_name, link_video, url_image, fk_category_1, fk_id_type]
          );
          // console.log(rows.insertId);
          res.status(201).json({
            id: rows.insertId,
            exercise_name,
            link_video,
            url_image,
            fk_category_1,
            fk_id_type,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//api request example http://localhost:3000/api/exercise/2
router.put("/:id", async (req, res, next) => {
  try {
    const { exercise_name, link_video, url_image, fk_category_1, fk_id_type } =
      req.body;

    if (
      !exercise_name ||
      !link_video ||
      !url_image ||
      !fk_category_1 ||
      !fk_id_type
    ) {
      return res.status(400).json({ error: "Bad request" });
    } else {
      if (
        typeof exercise_name !== "string" ||
        typeof link_video !== "string" ||
        typeof url_image !== "string" ||
        typeof fk_category_1 !== "number" ||
        typeof fk_id_type !== "number"
      ) {
        return res.status(400).json({ error: "Bad request" });
      } else {
        const [rows, fields] = await conn.query(
          "SELECT * FROM category WHERE pk_id_category = ?",
          [fk_category_1]
        );
        if (!rows.length) {
          return res.status(400).json({ error: "Bad request" });
        } else {
          const [rowsTypeExercise, fieldsTypeExercise] = await conn.query(
            "SELECT * FROM type_exercise WHERE pk_id_type = ?",
            [fk_id_type]
          );
          if (!rowsTypeExercise.length) {
            return res.status(400).json({ error: "Bad request" });
          } else {
            const rowsExercise = await conn.query(
              "UPDATE exercise SET exercise_name = ?, link_video = ?, url_image = ?, fk_category_1 = ?, fk_id_type = ? WHERE pk_id_exercise = ?",
              [exercise_name, link_video, url_image, fk_category_1, fk_id_type, req.params.id]
            );
            // console.log(rows.insertId);
            res.status(201).json({
              id: rowsExercise.insertId,
              exercise_name,
              link_video,
              url_image,
              fk_category_1,
              fk_id_type,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await conn.query(
      "DELETE FROM exercise WHERE pk_id_exercise = ?",
      [req.params.id]
    );
    if (rows[0].length === 0) {
      return res.status(404).json({ error: "Not found" });
    } else {
      return res.status(200).json({ status: "succesfull" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
