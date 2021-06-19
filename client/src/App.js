import "./App.css";
import { useState } from "react";
import Court from "./Court.js";
import ShotsInputForm from "./ShotsInputForm.js";

function App() {
  const [hittingPlayer, setHittingPlayer] = useState(-1);
  const [player1Pos, setPlayer1Pos] = useState([300, 590]);
  const [player2Pos, setPlayer2Pos] = useState([170, 50]);
  const [landSpotPos, setLandSpotPos] = useState([]);
  const [receivingContactPos, setReceivingContactPos] = useState([]);
  const [framesData, setFramesData] = useState([]);
  const [currentFrameId, setCurrentFrameId] = useState(0);

  const resetFrame = () => {
    setCurrentFrameId(0);
    setHittingPlayer(-1);
    setPlayer1Pos([300, 590]);
    setPlayer2Pos([170, 50]);
    setLandSpotPos([]);
    setReceivingContactPos([]);
  };

  const handleFrameChange = (e, k) => {
    console.log(k);
    if (!framesData.length) return;
    if (currentFrameId === 0 && k === -1) return resetFrame();
    if (currentFrameId === framesData.length - 1 && k === 1) {
      return resetFrame();
    }
    setCurrentFrameId((currentFrameId) => {
      currentFrameId += k;
      const currentFrame = framesData[currentFrameId];
      if (currentFrame) {
        setHittingPlayer(currentFrame.hittingPlayer);
        setPlayer1Pos(currentFrame.player1Pos);
        setPlayer2Pos(currentFrame.player2Pos);
        setLandSpotPos(currentFrame.landSpotPos);
        setReceivingContactPos(currentFrame.receivingContactPos);
      }
      return currentFrameId;
    });
  };

  const style = {
    width: "500px",
    height: "650px",
    background: "#a8d76c",
    // transform: "matrix(1,0, 0, -1 300/2 500/2)",
  };

  const playerStyle = {
    fill: "black",
  };

  const landSpotStyle = {
    fill: "yellow",
  };

  const hittingPlayerPos = hittingPlayer === 0 ? player1Pos : player2Pos;

  return (
    <div className="App">
      <ShotsInputForm setFramesData={setFramesData} resetFrame={resetFrame} />
      <div>
        <svg style={style}>
          <Court />

          {hittingPlayer !== -1 && (
            <g>
              <line
                x1={hittingPlayerPos[0]}
                y1={hittingPlayerPos[1]}
                x2={landSpotPos[0]}
                y2={landSpotPos[1]}
                style={{
                  stroke: hittingPlayer ? "red" : "blue",
                  strokeWidth: 2,
                }}
              />

              <line
                x1={landSpotPos[0]}
                y1={landSpotPos[1]}
                x2={receivingContactPos[0]}
                y2={receivingContactPos[1]}
                style={{
                  stroke: hittingPlayer ? "red" : "blue",
                  strokeWidth: 2,
                }}
              />
            </g>
          )}

          <circle
            cx={player1Pos[0]}
            cy={player1Pos[1]}
            r={10}
            style={playerStyle}
          />
          <circle
            cx={player2Pos[0]}
            cy={player2Pos[1]}
            r={10}
            style={playerStyle}
          />

          {hittingPlayer !== -1 && (
            <circle
              cx={landSpotPos[0]}
              cy={landSpotPos[1]}
              r={3}
              style={landSpotStyle}
            />
          )}
        </svg>
        <div>
          <button onClick={(e) => handleFrameChange(e, -1)}> Back </button>
          <button onClick={(e) => handleFrameChange(e, 1)}> Next </button>
          {currentFrameId}
        </div>
      </div>
    </div>
  );
}

export default App;
