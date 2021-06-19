import "./App.css";
import axios from "axios";

const serverUrl = "http://localhost:5000";

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shotsData = {
      shots: [
        {
          player: 1,
          direction: "right",
          depth: "short",
          opn_contact_dist: "normal",
        },
        {
          player: 2,
          direction: "right",
          depth: "long",
          opn_contact_dist: "far",
        },
      ],
    };
    const { data } = await axios.post(`${serverUrl}/simulate`, shotsData);

    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Simulate" />
      </form>
      <div> Tennis court </div>
    </div>
  );
}

export default App;
