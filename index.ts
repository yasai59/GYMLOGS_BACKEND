const express = require("express");
const mysql = require("mysql2");

const app = express();

// app.listen('3000', () => {
//     console.log('Server started on port 3000');
// });
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
  console.log("Pinged");
  console.log(new Date().toLocaleDateString());
  req.body.name = "Juan";
  res.send("pong" + req.body.name);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// res = respuestas
// status(500) = numero del error
