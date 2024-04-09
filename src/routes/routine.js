const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

// SHOW RUTINES BY USER
router.get("/:id", (req, res, next) => {
  conn
    .query("SELECT * FROM routines WHERE fk_id_username = ?", [req.params.id])
    .then(([rows]) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/:id", async (req, res) => {
  const { routine_name, type_routine, day_routine, num_routine } = req.body;
  const fk_id_username = req.params.id;

  conn
    .query(
      "INSERT INTO routines (routine_name, type_routine, day_routine, num_routine, fk_id_username) VALUES (?, ?, ?, ?, ?)",
      [routine_name, type_routine, day_routine, num_routine, fk_id_username]
    )
    .then(([result]) => {
      res.status(201).json({
        pk_id_rutine: result.insertId,
        routine_name,
        type_routine,
        day_routine,
        num_routine,
        fk_id_username,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// UPDATE RUTINE
// NAME ROUTINE
router.put("/name/:id", (req, res) => {
  const { routine_name } = req.body;
  conn
    .query("UPDATE routines SET routine_name = ? WHERE pk_id_routine = ?", [
      routine_name,
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

// DAYS ROUTINE
router.put("/day/:id", (req, res) => {
  const { day_routine, num_routine } = req.body;
  conn
    .query("SELECT type_routine FROM routines WHERE pk_id_routine = ?", [
      req.params.id,
    ])
    .then(([rows]) => {
      if (rows[0].type_routine === "semanal") {
        conn
          .query("UPDATE routines SET day_routine = ?, num_routine = ? WHERE pk_id_routine = ?", [
            day_routine,
            num_routine,
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
      }
      else{
        res.json({message: "No se puede modificar el día de una rutina diaria"})
        console.log("No se puede modificar el día de una rutina diaria");
      }
    });
});

//DELETE BY ID
router.delete("/:id", (req, res) => {
  conn
    .query("DELETE FROM routines WHERE pk_id_routine = ?", [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) {
        res.json({ message: "Deleted" });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
