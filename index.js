


/*
import conn from "./src/database/dbConfig.js";
const express = require("express");
const app = express();
const mysql = require("mysql2");
const PORT = process.env.PORT || 3000;

let notes = [
  {
    "id": 1,
    "name": "Test",
  },
  {
    "id": 2,
    "name": "Test2",
  }
]

// app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/api/notes', (req, res) =>{
   res.json(notes);
});

app.get('/api/notes:id', (req, res) =>{
  const id = req.params.id;
  console.log(id);
  res.send(id);
});

// res = respuestas
// status(500) = numero del error
*/