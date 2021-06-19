import "./App.css";
import axios from "axios";
import { useState } from "react";
import { filterAndBuildData } from "./Util.js";

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
      const { data } = await axios.post(`${serverUrl}/simulate`, shotsData);
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
  };

  const courtStyle = {
    fill: "#559adc",
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
          <rect x="100" y="75" width="300" height="500" style={courtStyle} />
          <circle cx={playerPosition[0]} cy={playerPosition[1]} r={10} />
          {/* <circle cx={opponentPosition[0]} cy={opponentPosition[1]} r={10} /> */}

          {/* <rect /> */}
          <g id="court-borders">
            <path
              d="M 100 75 V 575 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
            <path
              d="M 400 75 V 575 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />

            <path
              d="M 97.5 75 H 402.5 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />

            <path
              d="M 97.5 575 H 402.5 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
          </g>

          <g id="court-double-alley-lines">
            <path
              d="M 130 75 V 575 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
            <path
              d="M 370 75 V 575 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
          </g>
          <g id="court-center-mark">
            <path
              d="M 250 75 V 85 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
            <path
              d="M 250 575 V 565 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
          </g>

          <g id="court-net">
            <path
              d="M 100 325 H 400 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
          </g>

          <g id="court-service-lines">
            <path
              d="M 130 200 H 370 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
            <path
              d="M 130 450 H 370 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
          </g>

          <g id="court-center-service-lines">
            <path
              d="M 250 325 V 200 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
            <path
              d="M 250 325 V 450 "
              stroke="#fff"
              strokeWidth="5"
              fill="transparent"
            />
          </g>
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
