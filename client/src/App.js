import "./App.css";
import axios from "axios";
import { useState } from "react";
import { filterAndBuildData } from "./Util.js";

const serverUrl = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shotsData = filterAndBuildData(text);
    // Need to check if shotsData contains valid attributes
    console.log(shotsData);
    try {
      const { data } = await axios.post(`${serverUrl}/simulate`, shotsData);
      // console.log(data);
    } catch (error) {
      return console.log(error);
    }
  };

  const style = {
    width: "700px",
    height: "700px",
    border: "1px solid black",
    background: "yellow",
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
      <div> Tennis court </div>
      <svg preserveAspectRatio="xMaxYMax none" style={style}>
        {/* <circle cx={50} cy={50} r={50} /> */}
        {/* <rect /> */}
        <path
          d="M 10 0 V 499 H 150 V 400"
          stroke="black"
          stroke-width="10"
          fill="transparent"
        />
      </svg>
      <div>
        <button> Back </button>
        <button> Next </button>
      </div>
    </div>
  );
}

export default App;
