import ListItem from "./ListItem";

function ListItemContainer(props) {
  return (
    <div>
      {props.listItems.map((item) => (
        <ListItem
          checked={props.checked.includes(item.id)}
          id={item.id}
          key={item.id}
          onChange={props.onChange}
          showAll={props.showAll}
          task={item.task}
        />
      ))}
    </div>
  );
}

export default ListItemContainer;
