import { useState } from "react";
import CompletionButtons from "./CompletionButtons";
import ListItemContainer from "./ListItemContainer";

function List(props) {
  const [data, setData] = useState(props.listItems);
  const [idCounter, setIdCounter] = useState(data.length);
  const [isChecked, setIsChecked] = useState([]);
  const [isEditingId, setIsEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showingAllTasks, setShowingAllTasks] = useState(true);

  function handleAdd() {
    setData([...data, {
      id: idCounter,
      task: ""
    }]);
    setIdCounter(idCounter + 1);
  }

  function handleEditClick(e) {
    setIsEditingId(e.target.id);
    setEditingText(e.target.value);
    console.log(editingText);
  }

  function handleEditChange(e) {
    setEditingText(e.target.value);
    console.log(editingText);

    let newData = data.map(item => parseInt(item.id) === parseInt(isEditingId) ? { ...item, task: editingText } : item);
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

  function handleRemoveAllClick() {
    setData(data.filter(e => !isChecked.includes(e.id)))
  }

  function handleShowAllClick() {
    setShowingAllTasks(!showingAllTasks);
  }

  return (
    <div>
      <ListItemContainer
        checked={isChecked}
        isEditingId={isEditingId}
        editingText={editingText}
        listItems={data}
        onAddClick={handleAdd}
        onCheckedChange={handleIsCheckedChange}
        onEditBlur={handleEditComplete}
        onEditChange={handleEditChange}
        onEditClick={handleEditClick}
        onEditEnter={handleEditEnter}
        showAll={showingAllTasks}
      />
      <CompletionButtons
        anyCompletedTasks={isChecked.length !== 0}
        onShowAllClick={handleShowAllClick}
        onRemoveAllClick={handleRemoveAllClick}
        showingAllTasks={showingAllTasks}
      />
    </div>
  );
}

export default List;
