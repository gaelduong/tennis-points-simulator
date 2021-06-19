import React, { useState } from "react";
import axios from "axios";
import { filterAndBuildData } from "./Util.js";

const serverUrl = "http://localhost:5000";

const ShotsInputForm = ({ setFramesData, resetFrame }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shotsData = filterAndBuildData(text);
    // Need to check if shotsData contains valid attributes
    console.log(shotsData);
    try {
      const { data } = await axios.post(`${serverUrl}/simulate`, {
        shots: shotsData,
      });
      setFramesData(data);
      resetFrame();
    } catch (error) {
      return console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Follow this order: shot type, direction, depth, receiving position
      </label>
      <label>e.g: fh, farLeft, somewhatShort, normal</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input type="submit" value="Simulate" />
    </form>
  );
};

export default ShotsInputForm;
