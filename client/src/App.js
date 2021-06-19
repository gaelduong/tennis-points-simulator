import "./App.css";
import axios from "axios";
import { useState } from "react";
import { filterAndBuildData } from "./Util.js";
import Court from "./Court.js";

const serverUrl = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [hittingPlayer, setHittingPlayer] = useState(-1);
  const [player1Pos, setPlayer1Pos] = useState([300, 590]);
  const [player2Pos, setPlayer2Pos] = useState([170, 50]);
  const [landSpotPos, setLandSpotPos] = useState([-10, -10]);
  const [receivingContactPos, setReceivingContactPos] = useState([]);
  const [framesData, setFramesData] = useState([]);
  const [currentFrameId, setCurrentFrameId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shotsData = filterAndBuildData(text);
    // Need to check if shotsData contains valid attributes
    console.log(shotsData);
    try {
      const { data } = await axios.post(`${serverUrl}/simulate`, {
        shots: shotsData,
      });
      console.log(data);
      setFramesData(data);
    } catch (error) {
      return console.log(error);
    }
  };

  const handleFrameChange = (e, isForward) => {
    if (framesData.length === 0) return;
    if (currentFrameId === 0 && !isForward) return;
    if (currentFrameId === framesData.length && isForward) {
      setCurrentFrameId(0);
      return;
    }
    const k = isForward ? 1 : -1;
    setCurrentFrameId((currentFrameId) => currentFrameId + k);
    setHittingPlayer(framesData[currentFrameId].hittingPlayer);
    setPlayer1Pos(framesData[currentFrameId].player1Pos);
    setPlayer2Pos(framesData[currentFrameId].player2Pos);
    setLandSpotPos(framesData[currentFrameId].landSpotPos);
    setReceivingContactPos(framesData[currentFrameId].receivingContactPos);
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
    fill: "orange",
  };

  const lineStyle = {
    stroke: "red",
    strokeWidth: 2,
  };

  const hittingPlayerPos = hittingPlayer === 0 ? player1Pos : player2Pos;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Follow this order: shot type, direction, depth, receiving position
        </label>
        <label>e.g: fh, far-left, somewhat-short, normal</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" value="Simulate" />
      </form>
      <div>
        <svg style={style}>
          <Court />

          {currentFrameId > 0 && (
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

          <circle
            cx={landSpotPos[0]}
            cy={landSpotPos[1]}
            r={5}
            style={landSpotStyle}
          />
        </svg>
        <div>
          <button onClick={(e) => handleFrameChange(e, 0)}> Back </button>
          <button onClick={(e) => handleFrameChange(e, 1)}> Next </button>
        </div>
      </div>
    </div>
  );
}

export default App;
