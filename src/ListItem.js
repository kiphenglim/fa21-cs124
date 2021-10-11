import { useEffect, useRef } from "react";

function ListItem(props) {
  const newItem = useRef(null);

  const classes = ["item"];
  if (props.checked) {
    classes.push("checked");
    if (!props.showAll) {
      classes.push("invisible")
    }
  }

  useEffect(() => {
    newItem.current.focus();
  }, [])

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
        ref={newItem}
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
      <hr/>
    </div>
  );
}

export default ListItem;
