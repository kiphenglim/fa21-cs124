import './App.css';
import {useState} from 'react';

let id_counter = 2;
let data = [
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

function List(props) {
  const [isChecked, setIsChecked] = useState([]);

  function handleIsCheckedChange(e) {
    var newId = parseInt(e.target.id);
    console.log(newId);
    if (isChecked.includes(newId)) {
      setIsChecked(isChecked.filter(id => id !== newId));
    } else {
      setIsChecked([...isChecked, newId]);
    }
  }

  return <div>
    {props.listItems.map(item =>
      <ListItem
        key={item.id}
        id={item.id}
        task={item.task}
        onChange={handleIsCheckedChange}
        checked={isChecked.includes(item.id)}/>)}

    <input type="text"
      id="new-item-text"
      name="new-item-create"
      />
    <input type="button"
      value="Add Item"
    />
  </div>
}

function ListItem(props) {
  return <div className="item" id={props.id}>
    <input type="checkbox"
      id={props.id}
      name={props.id}
      onChange={props.onChange}/>
    <label htmlFor={props.id}
      className={props.checked ? "checked" : ""}>
      {props.task}
    </label>
  </div>
}

function App() {
  return (
    <div className="App">
      <h1>CS124 Lab 2</h1>
      <List listItems={data} />
    </div>
  );
}

export default App;
