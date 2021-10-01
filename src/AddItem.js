function AddItem(props) {
  return (
    <div>
      <input
        type="text"
        id="new-item-text"
        name="new-item-create"
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        value={props.textValue}
      />
      <button onClick={props.onClick}>Add Item</button>
    </div>
  );
}

export default AddItem;
