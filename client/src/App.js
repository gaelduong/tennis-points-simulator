import "./App.css";
import { useState, useEffect } from "react";
import Court from "./Court.js";
import ShotsInputForm from "./ShotsInputForm.js";

function App() {
  const [hittingPlayer, setHittingPlayer] = useState(-1);
  const [shotTypeData, setShotTypeData] = useState("");
  const [player1Pos, setPlayer1Pos] = useState([300, 590]);
  const [player2Pos, setPlayer2Pos] = useState([170, 50]);
  const [landSpotPos, setLandSpotPos] = useState([]);
  const [receivingContactPos, setReceivingContactPos] = useState([]);
  const [framesData, setFramesData] = useState([]);
  const [currentFrameId, setCurrentFrameId] = useState(-1);

  useEffect(() => {
    if (!framesData.length) return;
    const currentFrame = framesData[0];
    if (currentFrame) {
      setHittingPlayer(currentFrame.hittingPlayer);
      setShotTypeData(currentFrame.shotTypeData);
      setPlayer1Pos(currentFrame.player1Pos);
      setPlayer2Pos(currentFrame.player2Pos);
      setLandSpotPos(currentFrame.landSpotPos);
      setReceivingContactPos(currentFrame.receivingContactPos);
    }
    setCurrentFrameId(0);
  }, [framesData]);

  const resetFrame = () => {
    setFramesData([]);
    setCurrentFrameId(-1);
    setHittingPlayer(-1);
    setPlayer1Pos([300, 590]);
    setPlayer2Pos([170, 50]);
    setLandSpotPos([]);
    setReceivingContactPos([]);
  };

  const handleFrameChange = (e, k) => {
    if (!framesData.length) return;
    if (currentFrameId <= 0 && k === -1) return;
    // if (currentFrameId === framesData.length - 1 && k === 1) {
    //   return;
    // }
    setCurrentFrameId((currentFrameId) => {
      currentFrameId =
        currentFrameId + k >= framesData.length ? 0 : currentFrameId + k;
      const currentFrame = framesData[currentFrameId];
      if (currentFrame) {
        setHittingPlayer(currentFrame.hittingPlayer);
        setShotTypeData(currentFrame.shotTypeData);
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

  const hittingLineStyle = {
    stroke: hittingPlayer ? "red" : "blue",
    strokeWidth: 2,
  };

  const landSpotStyle = {
    fill: "black",
    opacity: "40%",
  };

  const ballStyle = {
    fill: "#f5fc8d",
    stroke: "black",
    strokeWidth: 2,
  };

  const hittingPlayerPos = hittingPlayer === 0 ? player1Pos : player2Pos;

  return (
    <div className="App">
      <ShotsInputForm setFramesData={setFramesData} resetFrame={resetFrame} />
      {/* Display dummy court with instructions */}
      {currentFrameId === -1 && (
        <svg style={style}>
          <Court />
          {/* 2 players */}
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
          <text x={280} y={620}>
            Player 1
          </text>
          <text x={140} y={30}>
            Player 2
          </text>
          <text x={10} y={330}>
            LEFT
          </text>
          <text x={440} y={330}>
            RIGHT
          </text>

          <text x={230} y={560}>
            DEEP
          </text>
          <text x={230} y={100}>
            DEEP
          </text>
        </svg>
      )}

      {/* Display actual court simulation */}
      {currentFrameId !== -1 && (
        <div>
          <svg style={style}>
            <Court />
            {/* 2 players */}
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
            {landSpotPos && (
              <g>
                {/* Hitting lines */}
                <line
                  x1={hittingPlayerPos[0]}
                  y1={hittingPlayerPos[1]}
                  x2={landSpotPos[0]}
                  y2={landSpotPos[1]}
                  style={hittingLineStyle}
                />
                <line
                  x1={landSpotPos[0]}
                  y1={landSpotPos[1]}
                  x2={receivingContactPos[0]}
                  y2={receivingContactPos[1]}
                  style={hittingLineStyle}
                />
                {/* Landing spot */}
                <circle
                  cx={landSpotPos[0]}
                  cy={landSpotPos[1]}
                  r={4}
                  style={landSpotStyle}
                />
                {/* The ball */}
                <circle
                  cx={receivingContactPos[0]}
                  cy={receivingContactPos[1]}
                  r={7}
                  style={ballStyle}
                />
                {shotTypeData.textPos && (
                  <text x={shotTypeData.textPos[0]} y={shotTypeData.textPos[1]}>
                    {shotTypeData.type}
                  </text>
                )}
              </g>
            )}
          </svg>

          <div>
            <div>
              <button
                className="action-btn control-btn"
                onClick={(e) => handleFrameChange(e, -1)}
              >
                Back
              </button>
              <button
                className="action-btn control-btn"
                onClick={(e) => handleFrameChange(e, 1)}
              >
                Next
              </button>
            </div>
            <div>
              {currentFrameId + 1} / {framesData.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
