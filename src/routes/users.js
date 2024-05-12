const express = require("express");
const router = express.Router();
const conn = require("./../database/connection");

router.get("/", async (req, res) => {
  try {
    const rows = await conn.query("SELECT * FROM users");
    console.log(rows);
    return res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const rows = await conn.query("SELECT * FROM users WHERE pk_id_user = ?", [
      req.params.id,
    ]);

    // console.log(rows[0]);
    if (rows[0].length) {
      // console.log(rows[0]);
      return res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

router.post("/emailandpassword", async (req, res) => {
  try {
    const { email, pssd } = req.body;
    const [rows, fields] = await conn.query(
      "SELECT * FROM users WHERE email = ?",
      [req.body.email]
    );

    if (rows.length !== 0) {
      const isMatch = await Bun.password.verify(pssd, rows[0].pssd);
      if (isMatch) {
        return res.status(200).json({
          id: rows[0].pk_id_user,
          email,
          pssd,
        });
      } else {
        return res.status(404).json({ error: "Not found" });
      }
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email, pssd, urole, foto } = req.body;
    const rows = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const hashedPassword = await Bun.password.hash(pssd, {
      algorithm: "bcrypt",
    });

    // console.log("hash: " + hashedPassword);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (
      rows[0].length === 0 &&
      username !== "" &&
      email !== "" &&
      pssd !== "" &&
      urole !== "" &&
      emailRegex.test(email)
    ) {
      const [rowsInsert, fieldsInsert] = await conn.query(
        "INSERT INTO users (username, email, pssd, urole, foto) VALUES (?, ?, ?, ?, ?)",
        [username, email, hashedPassword, urole, foto]
      );
      console.log(rowsInsert.insertId);
      res.status(201).json({
        id: rowsInsert.insertId,
        username,
        email,
        hashedPassword,
        urole,
        foto,
      });
    } else {
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Invalid email format" });
      } else {
        res.status(409).json({ error: "Email already exists" });
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
  console.log("------------------------");
});

router.delete("/:id", async (req, res) => {
  try {
    const rows = await conn.query("DELETE FROM users WHERE pk_id_user = ?", [
      req.params.id,
    ]);
    if (rows[0].length === 0) {
      return res.status(404).json({ error: "Not found" });
    } else {
      return res.json("Deleted successfully");
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

// UPDATE USERS
// update email
router.put("/email/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (email === "") {
      return res.status(400).json({ error: "Email is required" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    } else {
      const [rowsInsert, fieldsInsert] = await conn.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rowsInsert.length !== 0) {
        return res.status(409).json({ error: "Email already exists" });
      } else {
        const rows = await conn.query(
          "UPDATE users SET email = ? WHERE pk_id_user = ?",
          [email, req.params.id]
        );
        if (rows[0].length === 0) {
          return res.status(404).json({ error: "Not found" });
        } else {
          return res.json("Updated successfully");
        }
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

// update username
router.put("/username/:id", async (req, res) => {
  try {
    const { username } = req.body;

    const rows = await conn.query(
      "UPDATE users SET username = ? WHERE pk_id_user = ?",
      [username, req.params.id]
    );

    if (rows[0].length === 0) {
      return res.status(404).json({ error: "Not found" });
    } else {
      return res.json("Updated successfully");
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// update password
router.put("/password/:id/:passwd", async (req, res) => {
  try {
    const { pssd } = req.body;
    const pastPssd = req.params.passwd;
    const hash = await Bun.password.hash(pssd, { algorithm: "bcrypt" });
    const hashPastPassword = await Bun.password.hash(pastPssd, {
      algorithm: "bcrypt",
    });

    const [rowsInsert, fieldsInsert] = await conn.query(
      "SELECT pssd FROM users WHERE pk_id_user = ?",
      [req.params.id]
    );

    if (rowsInsert.length === 0) {
      return res.status(404).json({ error: "Not found" });
    } else {
      const isMatch = await Bun.password.verify(pastPssd, rowsInsert[0].pssd);

      // console.log("hash:" + hash);
      // console.log("rowInsert:" + rowsInsert[0].pssd);
      // console.log("isMatch:" + isMatch);
      // console.log("pastPssd:" + pastPssd);
      // console.log("hashPastPassword:" + hashPastPassword);

      if (isMatch) {
        const [rowsInsert, fieldsInsert] = await conn.query(
          "UPDATE users SET pssd = ? WHERE pk_id_user = ?",
          [hash, req.params.id]
        );
        return res.status(200).json({ pk_id_user: req.params.id });
      } else {
        return res.status(404).json({ error: "Not found" });
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
