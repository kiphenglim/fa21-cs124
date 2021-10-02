import ListItem from "./ListItem";

function ListItemContainer(props) {
  return (
    <div>
      {props.listItems.map((item) => (
        <ListItem
          checked={props.checked.includes(item.id)}
          id={item.id}
          key={item.id}
          onCheckedChange={props.onCheckedChange}
          onEditChange={props.onEditChange}
          showAll={props.showAll}
          // task={item.id === props.isEditing ? props.editingText : item.task}
          task={item.task}
        />
      ))}
    </div>
  );
}

export default ListItemContainer;
