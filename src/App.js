import './App.css';
import {useState} from 'react';

let id_counter = 2;
let data = [
  {
    id: 0,
    task: "Call Mom"
  },
  {
    id: 1,
    task: "Text John"
  }
]

function handleAdd(newItem) {
  console.log(newItem);
  data.push({
    id: id_counter,
    text: newItem
  });
  id_counter += 1;
}

function List(props) {
  // const [completed, setCompleted] = useState([]);
  // const [addingNewItem, setAddingNewItem] = useState([null]);
  const [isChecked, setIsChecked] = useState(null);

  function handleIsCheckedChange(e) {
    // conditionally add a class if list item checked
    // console.log("handleCheck", e.target.id, e.target.checked);
    e.target.checked ? setIsChecked(e.target.id) : setIsChecked(null);
  }

  return <>
    {props.listItems.map(item =>
      <ListItem
        key={item.id}
        id={item.id}
        task={item.task}
        onChange={handleIsCheckedChange}
        checked={"item-" + item.id == isChecked}/>)}

    <input type="text"
      id="new-item-text"
      name="new-item-create"
      // onChange={e => setAddingNewItem(e)}/>
      />
    <input type="button"
      value="Add Item"
      // onClick={handleAdd(addingNewItem) && setAddingNewItem(null)}
    />
  </>
}

function ListItem(props) {
  return <div className="item" id={props.id}>
    <input type="checkbox"
      id={"item-" + props.id}
      name={"item-" + props.id}
      onChange={props.onChange}/>
    <label htmlFor={"item-" + props.id}
    className={props.checked && "checked"}>
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
