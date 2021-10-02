import { useState } from "react";
import AddItem from "./AddItem";
import CompletionButtons from "./CompletionButtons";
import ListItemContainer from "./ListItemContainer";

function List(props) {
  const [data, setData] = useState(props.listItems);
  const [idCounter, setIdCounter] = useState(data.length);
  const [isChecked, setIsChecked] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showingAllTasks, setShowingAllTasks] = useState(true);

  function handleAdd() {
    setData([...data, {
      id: idCounter,
      task: ""
    }]);
    setIdCounter(idCounter + 1);
  }

  function handleFinishEdit(e) {
    var newData = data.map(item => item.id === parseInt(editingId) ? { ...item, task: [editingText] } : item);
    setData(newData);
    setEditingId(null);
    setEditingText("");
  }

  function handleEditChange(e) {
    console.log(e.target.id, " editing", e.target.value);
    setEditingId(e.target.id);
    setEditingText(e.target.value);
    
    var newData = data.map(item => item.id === parseInt(editingId) ? { ...item, task: [editingText] } : item);
    setData(newData);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleFinishEdit();
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
        isEditing={editingId}
        editingText={editingText}
        listItems={data}
        onCheckedChange={handleIsCheckedChange}
        onEditChange={handleEditChange}
        showAll={showingAllTasks}
      />
      <AddItem
        onClick={handleAdd}
      />
      <CompletionButtons
        onShowAllClick={handleShowAllClick}
        onRemoveAllClick={handleRemoveAllClick}
        showingAllTasks={showingAllTasks}
      />
    </div>
  );
}

export default List;
