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
        onChange={props.onChange}
        type="checkbox"
      />
      <label htmlFor={props.id}>
        {props.task}
      </label>
    </div>
  );
}

export default ListItem;
