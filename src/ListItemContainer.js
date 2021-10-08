import { useRef } from "react";
import AddItem from "./AddItem";
import ListItem from "./ListItem";

function ListItemContainer(props) {
  const newItem = useRef(null);

  function handleAdd() {
    props.onAddClick();
    handleFocus();
  }

  function handleFocus() {
    console.log(newItem.current);
    newItem.current.focus();
  }
  return (
    <div className="ListItemContainer">
      {props.listItems.map((item) => (
        <ListItem
          checked={props.checked.includes(item.id)}
          id={item.id}
          key={item.id}
          isEditingId={props.isEditingId}
          editingText={props.editingText}
          newItem={newItem}
          onCheckedChange={props.onCheckedChange}
          onEditBlur={props.onEditBlur}
          onEditChange={props.onEditChange}
          onEditClick={props.onEditClick}
          onEditEnter={props.onEditEnter}
          showAll={props.showAll}
          task={item.task}
        />
      ))}

      <AddItem
        onClick={handleAdd}
      />
    </div>
  );
}

export default ListItemContainer;
