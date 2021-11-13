import { useEffect, useRef } from 'react';

function ListItem(props) {
  const newItem = useRef(null);

  useEffect(() => {
    if (props.newest === props.id) {
      newItem.current.focus();
      props.onEditClick({target: {id: props.id, value: ''}});
    }
  }, [props])

  const classes = ['item'];
  if (props.checked) {
    classes.push('checked');
    if (!props.showAll) {
      classes.push('invisible')
    }
  }

  return (
      <div>
        <div className={classes.join(' ')} key={props.id} aria-label={'task item'}>
          <div
            className={"checkbox"}
            aria-label={props.checked? 'mark task incomplete': 'mark task complete'}
            id={props.id}
            onClick={props.onCheckedChange}
          >
            <input
              className={'ListCheckboxes'}
              checked={props.checked}
              key={'itemcheck-'+props.id}
              id={props.id}
              onChange={props.onCheckedChange}
              type='checkbox'
            />
          </div>
          <input
            aria-label={'task name' + props.task}
            autoComplete='off'
            className={'ListTextInputs'}
            id={props.id}
            key={'itemtext-' + props.id}
            onBlur={props.onEditBlur}
            onChange={props.onEditChange}
            onFocus={props.onEditClick}
            onClick={props.onEditClick}
            onKeyDown={props.onEditEnter}
            ref={newItem}
            type='text'
            value={
              props.isEditingId === props.id ?
              props.editingText :
              props.task
            }
          />
          <select
            className={'priority-select'}
            aria-label={'change task priority'}
            id={props.id}
            onChange={props.onPriorityChange}
            value={props.priority}>
              <option value={'1'} aria-label={'high priority'}>High</option>
              <option value={'2'} aria-label={'medium priority'}>Med</option>
              <option value={'3'} aria-label={'low priority'}>Low</option>
          </select>
        </div>
        <hr className={(props.checked && !props.showAll) && 'invisible'}/>
      </div>
  );
}

export default ListItem;
