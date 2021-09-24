import logo from './logo.svg';
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
  const [completed, setCompleted] = useState([]);

  return <form className="list" action={handleAdd("yes")}>
    {props.listItems.map(item =>
      <ListItem key={item.id} id={item.id} task={item.task}/>)}
    <input type="text" id="new-item-text" name="new-item-create" />
    <input type="submit" value="Add Item"/>
  </form>
}

function ListItem(props) {
  return <div className="item" id={props.id}>
    <input type="checkbox" id={"item-" + props.id} name={"item-" + props.id}/>
    <label htmlFor={"item-" + props.id}>{props.task}</label>
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
