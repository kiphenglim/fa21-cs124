import next from './next.png'
import trashcan from './trashcan.png'
import { useEffect, useRef } from 'react';

function OwnedListMenuItem(props) {

    const newItem = useRef(null);

    useEffect(() => {
        if (props.newest === props.id) {
            newItem.current.focus();
            props.onEditClick({target: {id: props.id, value: ''}});
        }
    }, [props])

    return (
        <div>
            <div className={'ListMenuItem'}>
                <input
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
                <div className={'ListMenuButtons'}>
                    <button className={'ListMenuDelete'}
                            onClick={() => {
                                props.onSetDeletion(props.id);
                                props.onDeleteAlert();
                            }}>
                        <img className={'DeleteIcon'}
                            src={trashcan}
                            alt='delete list'
                            width={14}
                            height={14}
                        />
                    </button>
                    <button className={'ListMenuNext'}
                        onClick={(e) => props.onChangeDisplay(props.id)}>
                        <img className={'NextIcon'}
                            src={next}
                            alt='edit list'
                            width={14}
                            height={14}
                        />
                    </button>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default OwnedListMenuItem;
