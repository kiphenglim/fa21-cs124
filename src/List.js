import { useState } from "react";
import AddItem from "./AddItem";
import CompletionButtons from "./CompletionButtons";
import ListItemContainer from "./ListItemContainer";

function List(props) {
  const [addingNewItem, setAddingNewItem] = useState("");
  const [data, setData] = useState(props.listItems);
  const [idCounter, setIdCounter] = useState(data.length);
  const [isChecked, setIsChecked] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [showingAllTasks, setShowingAllTasks] = useState(true);

  function handleAdd() {
    setData([...data, {
      id: idCounter,
      task: ""
    }]);
    setIdCounter(idCounter + 1);
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
        listItems={data}
        onChange={handleIsCheckedChange}
        onClick={handleEditItemChange}
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
