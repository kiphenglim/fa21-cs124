import plus from './plus.png';

function AddItem(props) {
  return <div onClick={props.onClick}>
    <button className={'AddItemButton'}>
      <img className={'AddIcon'}
        src={plus}
        alt='add new item'
        width={14}
        height={14}/>
      Add Item
    </button>
  </div>
}

export default AddItem;
