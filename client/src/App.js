import "./App.css";
import axios from "axios";
import { useState } from "react";
import { filterAndBuildData } from "./Util.js";
import Court from "./Court.js";

const serverUrl = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [playerPosition, setPlayerPosition] = useState([-10, -10]);
  const [opponentPosition, setOpponentPosition] = useState([100, 10]);
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
      // console.log(data);
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
    setPlayerPosition(framesData[currentFrameId].currPlayerPos);
  };

  const style = {
    width: "500px",
    height: "650px",
    border: "1px solid black",
    background: "#a8d76c",
    // transform: "matrix(1,0, 0, -1 300/2 500/2)",
  };

  const lineStyle = {
    stroke: "red",
    strokeWidth: 2,
  };

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
          {/* <circle cx={playerPosition[0]} cy={playerPosition[1]} r={10} /> */}
          {/* <circle cx={opponentPosition[0]} cy={opponentPosition[1]} r={10} /> */}
          <Court />
          <circle cx={170} cy={50} r={10} />
          <circle cx={300} cy={590} r={10} />

          {/* <line x1="0" y1="0" x2="200" y2="200" style={lineStyle} /> */}
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
