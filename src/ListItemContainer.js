import ListItem from "./ListItem";

function ListItemContainer(props) {
  return (
    <div className="ListItemContainer">
      {props.listItems.map((item) => (
        <ListItem
          checked={props.checked.includes(item.id)}
          id={item.id}
          key={item.id}
          isEditingId={props.isEditingId}
          editingText={props.editingText}
          onCheckedChange={props.onCheckedChange}
          onEditBlur={props.onEditBlur}
          onEditChange={props.onEditChange}
          onEditClick={props.onEditClick}
          onEditEnter={props.onEditEnter}
          showAll={props.showAll}
          task={item.task}
        />
      ))}
    </div>
  );
}

export default ListItemContainer;
