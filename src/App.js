import "./App.css";
import List from "./List";

let initialData = [];

function App() {
  return (
    <div className="App">
      <h1>CS124 Lab 2</h1>
      <List listItems={initialData} />
    </div>
  );
}

export default App;
