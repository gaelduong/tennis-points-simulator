const express = require("express");
const cors = require("cors");
const spotPositions = require("./spotPositions");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("API running");
});

app.post("/simulate", (req, res) => {
  const { shots } = req.body;
  console.log(shots);

  let p1Pos = spotPositions.player1StartPosition;
  let p2Pos = spotPositions.player2StartPosition;
  let currentPlayer = 0;
  const playerPosMap = {
    0: p1Pos,
    1: p2Pos,
  };

  const framesData = [];

  shots.forEach((shot) => {
    // Get players
    let currPlayerPos = playerPosMap[currentPlayer];
    let currOponnentPos = playerPosMap[currentPlayer === 0 ? 1 : 0];

    // Compute relevant data
    const direction = shot.direction;
    const depth = shot.depth;
    const landSpotPos = [
      spotPositions.depthY.upSide[depth],
      spotPositions.directionX[direction],
    ];
    const receivingContactPos = getReceivingContactPos(
      currPlayerPos,
      landSpotPos
    );

    // Generate 2 frames data
    framesData.push({
      currPlayerPos,
      currOponnentPos,
      landSpotPos,
      receivingContactPos,
    });
    framesData.push({
      currPlayerPos,
      currOponnentPos: receivingContactPos,
      landSpotPos,
      receivingContactPos,
    });

    // Update opponent position
    currOponnentPos = receivingContactPos; // (update p1Pos or p2Pos)
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  });

  console.log(framesData);

  res.json(framesData);
});

app.listen(5000, () => console.log("Server listening on port 5000"));

// t=dt/d
// (xt,yt)=(((1−t)x0+tx1),((1−t)y0+ty1))
function getReceivingContactPos(currPlayerPos, landSpotPos) {
  const [x0, y0] = currPlayerPos;
  const [x1, y1] = landSpotPos;
  const d = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
  const dt = 50;
  const t = dt / d;

  return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1];
}
