import { useState } from "react";
import AddItem from "./AddItem";
import Alert from "./Alert";
import CompletionButtons from "./CompletionButtons";
import ListItem from "./ListItem";

function List(props) {
  const [data, setData] = useState(props.listItems);
  const [idCounter, setIdCounter] = useState(data.length);
  const [isChecked, setIsChecked] = useState([]);
  const [isEditingId, setIsEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);

  function handleAdd(e) {
    console.log("adding");
    setData([...data, {
      id: idCounter,
      task: ""
    }]);
    setIsEditingId(idCounter);
    setEditingText("");
    setIdCounter(idCounter + 1);
  }

  function handleEditClick(e) {
    setIsEditingId(e.target.id);
    setEditingText(e.target.value);
  }

  function handleEditChange(e) {
    setEditingText(e.target.value);
    let newData = data.map(item =>
      parseInt(item.id) === parseInt(isEditingId)
      ? { ...item, task: editingText }
      : item);
    setData(newData);
  }

  function handleEditComplete(e) {
    let newData = data.map((item) =>
      parseInt(item.id) === parseInt(isEditingId)
        ? { ...item, task: editingText }
        : item
    );
    setData(newData);
    setEditingText("");
    setIsEditingId(null);
  }

  function handleEditEnter (e) {
    if (e.key === "Enter") {
      e.target.blur();
      handleEditComplete(e);
    }
  }

  function handleIsCheckedChange(e) {
    let newId = parseInt(e.target.id);
    if (isChecked.includes(newId)) {
      setIsChecked(isChecked.filter((id) => id !== newId));
    } else {
      setIsChecked([...isChecked, newId]);
    }
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handleRemoveAllClick() {
    setData(data.filter(e => !isChecked.includes(e.id)));
    setIsChecked([]);
  }

  function handleShowAllClick() {
    setShowingAllTasks(!showingAllTasks);
  }

  return (
      <div className="ListItemContainer">
        {data.map((item) => (
          <ListItem
            checked={isChecked.includes(item.id)}
            id={item.id}
            key={item.id}
            isEditingId={isEditingId}
            editingText={editingText}
            onCheckedChange={handleIsCheckedChange}
            onEditBlur={handleEditComplete}
            onEditChange={handleEditChange}
            onEditClick={handleEditClick}
            onEditEnter={handleEditEnter}
            showAll={showingAllTasks}
            task={item.task}
          />
        ))}

        <AddItem onClick={handleAdd}/>

        <CompletionButtons
          anyCompletedTasks={isChecked.length !== 0}
          onShowAllClick={handleShowAllClick}
          onRemoveAllClick={handleToggleAlert}
          showingAllTasks={showingAllTasks}
        />

        {showAlert && <Alert
            onCancel={handleToggleAlert}
            onConfirm={handleRemoveAllClick}>
          <div className="alert-text">
            <h3 className="alert-header">WARNING</h3>
            Your tasks will be permanently deleted, are you sure you want to delete all completed items?
          </div>
        </Alert>}

    </div>
  );
}

export default List;
