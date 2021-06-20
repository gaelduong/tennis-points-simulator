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

  const framesData = [];

  shots.forEach((shot) => {
    // Compute relevant data
    const direction = shot.direction;
    const depth = shot.depth;
    const landSpotPos = [
      spotPositions.directionX[direction],
      currentPlayer === 0
        ? spotPositions.depthY.upSide[depth]
        : spotPositions.depthY.downSide[depth],
    ];
    const receivingContactPos = getReceivingContactPos(
      currentPlayer === 0 ? p1Pos : p2Pos,
      landSpotPos,
      depth === "deep" ? 70 : 100
    );

    // Generate 2 frames data
    const textPos = getReceivingContactPos(
      currentPlayer === 0 ? p1Pos : p2Pos,
      landSpotPos,
      -100
    );
    framesData.push({
      hittingPlayer: currentPlayer,
      shotTypeData: {
        type: shot.shotType,
        textPos,
      },
      player1Pos: p1Pos,
      player2Pos: p2Pos,
      landSpotPos,
      receivingContactPos,
    });

    const playerReceivePosition = getReceivingContactPos(
      landSpotPos,
      receivingContactPos,
      15
    );

    // Update opponent position
    p1Pos = currentPlayer === 0 ? p1Pos : playerReceivePosition;
    p2Pos = currentPlayer === 1 ? p2Pos : playerReceivePosition;

    framesData.push({
      hittingPlayer: currentPlayer,
      shotTypeData: {
        type: shot.shotType,
        textPos,
      },
      player1Pos: p1Pos,
      player2Pos: p2Pos,
      landSpotPos,
      receivingContactPos,
    });

    // Switch player turn
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  });

  console.log(framesData);

  res.json(framesData);
});

app.listen(5000, () => console.log("Server listening on port 5000"));

// t=dt/d
// (xt,yt)=(((1−t)x0+tx1),((1−t)y0+ty1))
function getReceivingContactPos(currPlayerPos, landSpotPos, dk) {
  const [x0, y0] = currPlayerPos;
  const [x1, y1] = landSpotPos;
  const d = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
  const dt = dk + d;
  const t = dt / d;

  return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1];
}
