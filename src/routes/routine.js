const express = require("express");
const router = express.Router();
const conn = require("../database/connection");

// SHOW RUTINES BY USER
router.get("/:id", async (req, res, next) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM routines WHERE fk_id_username = ?",
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

router.post("/:id", async (req, res) => {
  const { routine_name, type_routine, day_routine, num_routine } = req.body;
  const fk_id_username = parseInt(req.params.id);
  // console.log("day_routine type: " + typeof day_routine);s

  try {
    if (!routine_name || !type_routine || !num_routine || !fk_id_username) {
      return res.status(401).json({ error: "Bad request: Variable not null" });
    } else if (
      typeof routine_name !== "string" ||
      typeof type_routine !== "string" ||
      (typeof day_routine !== "string" && typeof day_routine !== "object") ||
      typeof num_routine !== "number" ||
      typeof fk_id_username !== "number"
    ) {
      return res
        .status(400)
        .json({ error: "Bad request: Incorrect type of the values" });
    } else if (type_routine !== "libre" && type_routine !== "semanal") {
      return res
        .status(400)
        .json({ error: "Bad request: Incorrect type_routine" });
    } else {
      const [rowsUser, fieldsUser] = await conn.query(
        "SELECT * FROM users WHERE pk_id_user = ?",
        [req.params.id]
      );
      if (rowsUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
        // FREE USERS
      } else if (rowsUser[0].urole === 2) {
        const [rows, fields] = await conn.query(
          "SELECT * FROM routines WHERE fk_id_username = ?",
          [req.params.id]
        );

        if (rows.length >= 5) {
          return res
            .status(403)
            .json({ error: "No se pueden tener más de 5 rutinas" });
        } else {
          const [rows, fields] = await conn.query(
            "INSERT INTO routines (routine_name, type_routine, day_routine, num_routine, fk_id_username) VALUES (?, ?, ?, ?, ?)",
            [
              routine_name,
              type_routine,
              day_routine,
              num_routine,
              fk_id_username,
            ]
          );
          return res.status(201).json({
            id: rows.insertId,
            routine_name,
            type_routine,
            day_routine,
            num_routine,
            fk_id_username,
          });
        }
        // ADMINS AND PREMIUM USERS
      } else if (rowsUser[0].urole === 3 || rowsUser[0].urole === 1) {
        const [rows, fields] = await conn.query(
          "INSERT INTO routines (routine_name, type_routine, day_routine, num_routine, fk_id_username) VALUES (?, ?, ?, ?, ?)",
          [routine_name, type_routine, day_routine, num_routine, fk_id_username]
        );
        return res.status(201).json({
          id: rows.insertId,
          routine_name,
          type_routine,
          day_routine,
          num_routine,
          fk_id_username,
        });
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

// UPDATE RUTINE
// NAME RºOUTINE
router.put("/name/:id", async (req, res) => {
  const { routine_name } = req.body;
  try {
    if (!routine_name) {
      return res.status(400).json({ error: "Bad request: Variable not null" });
    } else if (typeof routine_name !== "string") {
      return res
        .status(400)
        .json({ error: "Bad request: Incorrect type of the values" });
    } else {
      const [rows, fields] = await conn.query(
        "UPDATE routines SET routine_name = ? WHERE pk_id_routine = ?",
        [routine_name, req.params.id]
      );
      if (rows.affectedRows) {
        return res.status(200).json({ message: "Updated" });
      } else {
        return res.status(404).json({ error: "Not found" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

// DAYS ROUTINE
router.put("/day/:id", async (req, res) => {
  const { day_routine, num_routine } = req.body;
  try {
    const [rowsUser, fieldsUser] = await conn.query(
      "SELECT * FROM routines WHERE pk_id_routine = ?",
      [req.params.id]
    );

    if (rowsUser.length === 0) {
      return res.status(404).json({ error: "Routine not found" });
    } else {
      const [rows, fields] = await conn.query(
        "UPDATE routines SET day_routine = ?, num_routine = ? WHERE pk_id_routine = ?",
        [day_routine, num_routine, req.params.id]
      );
      if (rows.affectedRows) {
        return res.status(200).json({ message: "Updated" });
      } else {
        return res.status(404).json({ error: "Not found" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

//DELETE BY ID
router.delete("/:id", async (req, res) => {
  try {
    const [rows, fields] = await conn.query(
      "DELETE FROM routines WHERE pk_id_routine = ?",
      [req.params.id]
    );
    if (rows.affectedRows) {
      return res.status(200).json({ message: "Deleted" });
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
