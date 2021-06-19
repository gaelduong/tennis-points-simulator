import "./App.css";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
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
