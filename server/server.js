const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const spotPositions = require("./spotPositions");
const app = express();

const sendEmail = (info) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tennisrallysimulator@gmail.com",
      pass: "tennisrallysimulator123",
    },
  });

  const mailOptions = {
    from: "tennisrallysimulator@gmail.com",
    to: "simple.ecommerce.1@gmail.com",
    subject: "Sending Email using Node.js",
    text: `IP: ${info}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

app.use(express.json());
app.use(cors());

app.post("/simulate", (req, res) => {
  const { shots } = req.body;

  sendEmail(req.connection.remoteAddress);

  let p1Pos = spotPositions.player1StartPosition;
  let p2Pos = spotPositions.player2StartPosition;
  let currentPlayer = 0;

  const framesData = [
    {
      hittingPlayer: -1,
      shotTypeData: {
        type: null,
        textPos: null,
      },
      player1Pos: p1Pos,
      player2Pos: p2Pos,
      landSpotPos: null,
      receivingContactPos: null,
    },
  ];

  shots.forEach((shot, idx) => {
    // Compute relevant data
    const direction = shot.direction;
    const depth = shot.depth;
    const landSpotPos = [
      spotPositions.directionX[direction],
      currentPlayer === 0
        ? spotPositions.depthY.upSide[depth]
        : spotPositions.depthY.downSide[depth],
    ];

    const isLastShot = idx === shots.length - 1;

    const receivingContactPos = getReceivingContactPos(
      currentPlayer === 0 ? p1Pos : p2Pos,
      landSpotPos,
      isLastShot ? 150 : depth === "deep" ? 70 : 100
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

    if (!isLastShot) {
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
    }

    // Switch player turn
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  });

  console.log(framesData);

  res.json(framesData);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.json("API running");
  });
}

app.listen(process.env.PORT || 5000, () =>
  console.log("Server listening on port 5000")
);

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
