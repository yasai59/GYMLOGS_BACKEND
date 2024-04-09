const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

// SHOW SESSIONS BY ROUTINE
router.get("/:id", (req, res, next) => {
  conn
    .query("SELECT * FROM sessions WHERE fk_id_routine = ?", [req.params.id])
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//get the category of the session
router.get("/category/:id", (req, res, next) => {
  conn
    .query(
      "SELECT fk_category_1, fk_category_2 FROM sessions WHERE pk_id_sessio = ?",
      [req.params.id]
    )
    .then(([rows]) => {
      const category = rows[0].fk_category_1;
      const category2 = rows[0].fk_category_2;

      console.log("Category1: " + category);
      console.log("Category2: " + category2);
      conn
        .query("SELECT name FROM category WHERE pk_id_category = ?", [category])
        .then(([rows]) => {
          const category1 = rows[0].name;
          if (category2) {
            conn
              .query("SELECT name FROM category WHERE pk_id_category = ?", [
                category2,
              ])
              .then(([rows]) => {
                const category2 = rows[0].name;
                res.json({ category1, category2 });
              });
          } else {
            res.json({ category1 });
          }
        });
    });
});

//POST
router.post("/:id", async (req, res) => {
  const { nom_session, week_day, fk_category_1, fk_category_2 } = req.body;

  const fk_id_routine = req.params.id;

  conn
    .query("SELECT * FROM routines WHERE pk_id_routine = ?", [fk_id_routine])
    .then(([rows]) => {
      if (rows.length) {
        conn
          .query("SELECT * FROM sessions WHERE fk_id_routine = ?", [
            fk_id_routine,
          ])
          .then(([rows]) => {
            if (rows.length < 7) {
              conn
                .query(
                  "INSERT INTO sessions (nom_session, week_day, fk_category_1, fk_category_2, fk_id_routine) VALUES (?, ?, ?, ?, ?)",
                  [
                    nom_session,
                    week_day,
                    fk_category_1,
                    fk_category_2,
                    fk_id_routine,
                  ]
                )
                .then(([result]) => {
                  res.status(201).json({
                    pk_id_session: result.insertId,
                    nom_session,
                    week_day,
                    fk_category_1,
                    fk_category_2,
                    fk_id_routine,
                  });
                })
                .catch((err) => {
                  res.status(500).json({ error: err });
                });
            }
          });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
});

//UPDATE
// NAME SESSION
router.put("/name/:id", (req, res) => {
    const { nom_session } = req.body;
    conn
        .query("UPDATE sessions SET nom_session = ? WHERE pk_id_session = ?", [
        nom_session,
        req.params.id,
        ])
        .then(([result]) => {
        if (result.affectedRows) {
            res.json({ message: "Updated" });
        } else {
            res.status(404).json({ error: "Not found" });
        }
        })
        .catch((err) => {
        res.status(500).json({ error: err });
        });
});

module.exports = router;
