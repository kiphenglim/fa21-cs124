import "./App.css";
import { useState } from "react";

let id_counter = 4;
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
  const [addingNewItem, setAddingNewItem] = useState("");
  const [isChecked, setIsChecked] = useState([]);

  function handleIsCheckedChange(e) {
    var newId = parseInt(e.target.id);
    if (isChecked.includes(newId)) {
      setIsChecked(isChecked.filter((id) => id !== newId));
    } else {
      setIsChecked([...isChecked, newId]);
    }
  }

  function handleAdd() {
    data.push({
      id: id_counter,
      text: addingNewItem,
    });
    setAddingNewItem("");
    id_counter += 1;
    console.log(id_counter);
    console.log(data);
  }

  return (
    <div>
      <ListItemContainer
        checked={isChecked}
        listItems={props.listItems}
        onChange={handleIsCheckedChange}
      />
      <AddItem
        onClick={handleAdd}
      />
    </div>
  );
}

function ListItemContainer(props) {
  return (
    <div>
      {props.listItems.map((item) => (
        <ListItem
          checked={props.checked.includes(item.id)}
          id={item.id}
          key={item.id}
          onChange={props.onChange}
          task={item.task}
        />
      ))}
    </div>
  );
}

function ListItem(props) {
  return (
    <div className="item" id={props.id}>
      <input
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        type="checkbox"
      />
      <label className={props.checked ? "checked" : ""} htmlFor={props.id}>
        {props.task}
      </label>
    </div>
  );
}

function AddItem(props) {
  return (
    <div>
      <input
        type="text"
        id="new-item-text"
        name="new-item-create"
      />
      <input
        type="button"
        value="Add Item"
        onClick={props.onClick}
      />
    </div>
  );
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
