import { useEffect, useRef } from 'react';

function ListItem(props) {
  const newItem = useRef(null);

  const classes = ['item'];
  if (props.checked) {
    classes.push('checked');
    if (!props.showAll) {
      classes.push('invisible')
    }
  }

  // useEffect(() => {
  //   newItem.current.focus();
  // }, [newItem.current])

  return (
    <div className={classes.join(' ')} key={props.id}>
      <input
        className={'listCheckboxes'}
        key={'itemcheck-'+props.id}
        id={props.id}
        onChange={props.onCheckedChange}
        type='checkbox'
      />
      <input
        autoComplete='off'
        className={'listTextInputs'}
        id={props.id}
        key={'itemtext-' + props.id}
        ref={newItem}
        onBlur={props.onEditBlur}
        onChange={props.onEditChange}
        onClick={props.onEditClick}
        onKeyDown={props.onEditEnter}
        type='text'
        value={
          props.id === props.isEditingId
            ? props.editingText
            : props.task
        }
      />
      <select className={'priority-select'}
        id={props.id}
        onChange={props.onPriorityChange}
        value={props.priority}>
          <option value={'1'}>High</option>
          <option value={'2'}>Med</option>
          <option value={'3'}>Low</option>
      </select>
      <hr/>
    </div>
  );
}

export default ListItem;
