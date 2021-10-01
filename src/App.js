import "./App.css";
import List from "./List";

let initialData = [
  {
    id: 0,
    task: "Call Mom",
  },
  {
    id: 1,
    task: "Text John",
  },
  {
    id: 2,
    task: "test task 1",
  },
  {
    id: 3,
    task: "test task 2",
  },
];

function App() {
  return (
    <div className="App">
      <h1>CS124 Lab 2</h1>
      <List listItems={initialData} />
    </div>
  );
}

export default App;
