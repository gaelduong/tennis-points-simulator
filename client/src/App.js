import "./App.css";
import axios from "axios";
import { useState } from "react";

const serverUrl = "http://localhost:5000";

const filterAndBuildData = (text) => {
  const data = [];
  // Filter
  let lines = text.split("\n");
  lines = lines.map((line) => {
    line = line.split(",");
    line.forEach((attr, idx) => {
      line[idx] = attr.replace(/\s/g, "");
    });
    // Build data
    const [shotType, direction, depth, opn_contact_dist] = line;
    data.push({
      shotType,
      direction,
      depth,
      opn_contact_dist,
    });
  });
  return data;
};

function App() {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shotsData = filterAndBuildData(text);
    // console.log(shotsData);
    const { data } = await axios.post(`${serverUrl}/simulate`, shotsData);
    // console.log(data);
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
    </div>
  );
}

export default App;
