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
        onChange={props.onEditChange}
        type="text"
        value={props.task}
      />
    </div>
  );
}

export default ListItem;
