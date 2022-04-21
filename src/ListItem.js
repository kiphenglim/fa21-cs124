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
            id={props.id}
            onClick={props.onCheckedChange}
          >
            <input
            aria-label={props.task + (props.checked
                ? 'mark incomplete'
                : 'mark complete')}
              className={'ListCheckboxes'}
              checked={props.checked}
              key={'itemcheck-'+props.id}
              id={props.id}
              onChange={props.onCheckedChange}
              tabIndex={props.showAlert? -1 : 0}
              type='checkbox'
            />
          </div>
          <input
            aria-label={props.task}
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
            tabIndex={props.showAlert? -1 : 0}
            type='text'
            value={
              props.isEditingId === props.id ?
              props.editingText :
              props.task
            }
          />
          <select
            className={'priority-select'}
            aria-label={props.task + 'change priority'}
            id={props.id}
            onChange={props.onPriorityChange}
            tabIndex={props.showAlert? -1 : 0}
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
