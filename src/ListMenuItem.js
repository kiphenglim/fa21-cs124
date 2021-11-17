import next from './next.png'
import trashcan from './trashcan.png'
import { useEffect, useRef } from 'react';

function ListMenuItem(props) {

    const newItem = useRef(null);

    useEffect(() => {
        if (props.newest === props.id) {
            newItem.current.focus();
            props.onEditClick({target: {id: props.id, value: ''}});
        }
    }, [props])

    return (
        <div>
            <div className={'ListMenuItem'} aria-label={'list'}>
                <input
                    aria-label={props.listName}
                    autoComplete='off'
                    className={'ListMenuTextInputs'}
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
                            props.listName
                    }
                />
                <div className={'ListMenuButtons'} aria-label={'list options'}>
                    <button className={'ListMenuDelete'}
                            aria-label={props.listName + 'delete list'}
                            onClick={() => {
                                props.onSetDeletion(props.id);
                                props.onDeleteAlert();
                            }}>
                        <img className={'DeleteIcon'}
                            src={trashcan}
                            alt='delete list icon'
                            width={14}
                            height={14}
                        />
                    </button>
                    <button className={'ListMenuNext'}
                            aria-label={'edit list'}
                        onClick={(e) => props.onChangeDisplay(props.id)}>
                        <img className={'NextIcon'}
                            src={next}
                            alt='edit list icon'
                            width={14}
                            height={14}
                        />
                    </button>
                </div>
            </div>
            <hr className={(props.checked && !props.showAll) && 'invisible'}/>
        </div>
    );
}

export default ListMenuItem;
