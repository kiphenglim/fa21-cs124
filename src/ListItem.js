function ListItem(props) {
  const classes = ["item"];
  if (props.checked) {
    classes.push("checked");
    if (!props.showAll) {
      classes.push("invisible")
    }
  }

  return (
    <div className={classes.join(" ")} key={props.id}>
      <input
        className={"listCheckboxes"}
        key={"itemcheck-"+props.id}
        id={props.id}
        onChange={props.onCheckedChange}
        type="checkbox"
      />
      <input
        autoComplete="off"
        className={"listTextInputs"}
        id={props.id}
        key={"itemtext-" + props.id}
        ref={props.newItem}
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
