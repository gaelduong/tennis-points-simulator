import React, { useState } from "react";
import axios from "axios";
import { filterAndBuildData } from "./Util.js";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShotsInputForm = ({ setFramesData, resetFrame }) => {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const codeSnippet = `  slice, farRight, deep
  topspin, left, normal
  slice, farRight, deep
  slice, farLeft, veryShort
  neutral, farRight, veryShort
  slice, farRight, deep`;

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shotsData = filterAndBuildData(text);
    // Need to check if shotsData contains valid attributes
    if (!shotsData) return setSubmitMessage("Wrong input! Check again.");
    try {
      const { data } = await axios.post("/simulate", {
        shots: shotsData,
      });
      setFramesData(data);
      setSubmitMessage("");
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Tennis Rally Simulator</h2>
        <label>
          🌍 Input multiple lines where each line represents a single shot hit
          by either player 1 or player 2.
        </label>
        <label>
          🌍 Each shot is described by 3 propreties: shot type, direction and
          depth.
        </label>
        <label>
          ⭐️
          <b>
            <i>
              For now player on the bottom (player 1) always starts hitting
              first.
            </i>
          </b>
        </label>
        <label>
          ⭐️
          <b>
            <i>For now last shot is assumed to be a winner shot.</i>
          </b>
        </label>
        <pre id="input-instructions">
          <label>
            <b>Shot type: </b> slice | topspin | neutral
          </label>
          <label>
            <b>Direction:</b> farLeft | left | somewhatLeft | middle |
            somewhatRight | right | farRight
          </label>
          <label>
            <b>Depth:</b> deep | somewhatDeep | normal | somewhatShort | short |
            veryShort
          </label>
          <br></br>
          <label>
            <b>Input order (for each line):</b> [shot type], [direction],
            [depth]
          </label>
        </pre>
        <label>
          👉 Input rally here:{" "}
          <span style={{ fontSize: "12px" }}>
            (line 1=shot hit by player 1, line 2=shot hit by player 2, line
            3=shot hit by player 1,...)
          </span>
        </label>
        <textarea
          spellCheck="false"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {submitMessage && <div id="submit-message"> {submitMessage} </div>}
        <button className="action-btn" id="simulate-btn" onClick={handleSubmit}>
          Simulate rally!
        </button>
        <button
          className="action-btn"
          id="reset-btn"
          type="button"
          onClick={() => {
            resetFrame();
            setText("");
          }}
        >
          Reset
        </button>
        <label>Example of a rally:</label>
        <div className="container">
          <div className="code-snippet">
            <div className="code-section">
              <pre>{codeSnippet}</pre>
              <CopyToClipboard text={codeSnippet} onCopy={onCopyText}>
                <span>
                  {isCopied ? "Copied!" : <pre id="copy-btn"> Copy</pre>}
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShotsInputForm;
