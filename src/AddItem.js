import plus from './plus.png';

function AddItem(props) {
  return <div onClick={props.onClick} aria-label={'add new item'}>
    <button className={'AddItemButton'}
            tabIndex={props.showAlert? -1 : 0}>
      <img className={'AddIcon'}
        src={plus}
        alt='add item icon'
        width={14}
        height={14}/>
      Add Item
    </button>
  </div>
}

export default AddItem;
