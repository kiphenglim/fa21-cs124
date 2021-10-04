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
        onChange={props.onCheckedChange}
        type="checkbox"
      />
      <input
        id={props.id}
        onBlur={props.onEditBlur}
        onChange={props.onEditChange}
        onClick={props.onEditClick}
        onKeyDown={props.onEditEnter}
        type="text"
        value={
          parseInt(props.id) === parseInt(props.isEditingId)
            ? props.editingText
            : props.task
        }
      />
    </div>
  );
}

export default ListItem;
