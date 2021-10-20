import plus from './plus.png';

function AddItem(props) {
  return <div onClick={props.onClick}>
    <button className={'AddItemButton'}>
      <img className={'AddIcon'}
        src={plus}
        alt='a plus icon'
        width={14}
        height={14}/>
      Add Item
    </button>
  </div>
}

export default AddItem;
