import "./App.css";
import { useState } from "react";
import CompletionButtons from "./CompletionButtons";

let id_counter = 4;
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

function List(props) {
  const [addingNewItem, setAddingNewItem] = useState("");
  const [data, setData] = useState(props.listItems);
  const [isChecked, setIsChecked] = useState([]);
  const [showingAllTasks, setShowingAllTasks] = useState(true);

  function handleAdd() {
    setData([...data, {
      id: id_counter,
      task: addingNewItem
    }]);
    setAddingNewItem("");
    id_counter += 1;
  }

  function handleAddChange(e) {
    setAddingNewItem(e.target.value);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  function handleIsCheckedChange(e) {
    var newId = parseInt(e.target.id);
    if (isChecked.includes(newId)) {
      setIsChecked(isChecked.filter((id) => id !== newId));
    } else {
      setIsChecked([...isChecked, newId]);
    }
  }

  function handleRemoveClick() {
    setData(data.filter(e => !isChecked.includes(e.id)))
  }

  function handleShowAllClick() {
    setShowingAllTasks(!showingAllTasks);
  }

  return (
    <div>
      <ListItemContainer
        checked={isChecked}
        listItems={data}
        onChange={handleIsCheckedChange}
        showAll={showingAllTasks}
        />
      <AddItem
        onChange={handleAddChange}
        onClick={handleAdd}
        onKeyUp={handleEnter}
        textValue={addingNewItem}
      />
      <CompletionButtons
        onShowAllClick={handleShowAllClick}
        onRemoveClick={handleRemoveClick}
        showingAllTasks={showingAllTasks}
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
          showAll={props.showAll}
          task={item.task}
        />
      ))}
    </div>
  );
}

function ListItem(props) {
  const classes = ["item"];
  if (props.checked) {
    classes.push("checked");
    if (!props.showAll) {
      classes.push("invisible")
    }
  }

  return (
    <div className={classes.join(" ")} id={props.id}>
      <input
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        type="checkbox"
      />
      <label htmlFor={props.id}>
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
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        value={props.textValue}
        />
      <button onClick={props.onClick}>Add Item</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>CS124 Lab 2</h1>
      <List listItems={initialData} />
    </div>
  );
}

export default App;
