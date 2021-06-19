const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json("API running");
});

app.post("/simulate", (req, res) => {
  res.json("data");
});

app.listen(5000, () => console.log("Server listening on port 5000"));
