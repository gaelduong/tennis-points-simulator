const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("API running");
});

app.post("/simulate", (req, res) => {
  const { shots } = req.body;
  const framesData = [
    {
      currPlayerPos: [1, 1],
      currOponnentPos: [1, 1],
      landSpotPos: [1, 1],
      receivingContactPos: [1, 1],
    },
  ];

  res.json(framesData);
});

app.listen(5000, () => console.log("Server listening on port 5000"));
