import express from "express";
import cors from "cors";

import routers from "./src/routes/routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routers);
// app.use("/typesexercise", routers);
