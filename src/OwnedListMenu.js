import firebase from 'firebase/compat';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { useState } from 'react';

import Alert from './Alert'
import OwnedListMenuItem from './OwnedListMenuItem';
import plus from './plus.png';


function OwnedListMenu(props) {

    const [editingText, setEditingText] = useState('');
    const [isEditingId, setIsEditingId] = useState(null);
    const [listToDelete, setListToDelete] = useState(null);
    const [newestItem, setNewestItem] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    function handleAddList() {
        const newId = generateUniqueID();
        const newList = {
            id: newId,
            created: firebase.database.ServerValue.TIMESTAMP,
            name: '',
            sort: 'date',
        };
        setNewestItem(newId);
        props.collection.doc(newId).set(newList);
    }

    function handleDeleteList() {
        props.collection.doc(listToDelete).delete();
    }

    function handleEditClick(id, v) {
        setEditingText(v);
        setIsEditingId(id);
        setNewestItem(null);
    }

    function handleEditChange(id, v) {
        setEditingText(v);
        const docRef = props.collection.doc(id);
        docRef.update({ task: editingText });
    }

    function handleEditComplete(id) {
        const docRef = props.collection.doc(id);
        docRef.update({ name: editingText });
        setIsEditingId(null);
    }

    function handleEditEnter(id, target, key) {
        if (key === 'Enter') {
            handleEditComplete(id);
            target.blur();
        }
    }

    function handleToggleAlert() {
        setShowAlert(!showAlert);
    }

    function handleSetDeletion(id) {
        setListToDelete(id);
    }

    function getListName(id) {
        const list = props.listItems.find(e => e.id === id);
        return list.name;
    }

    return (
        <div className={'ListMenuContainer'}>
            <h1 className={'ListMenuTitle'}>Lab 4</h1>

            <div className={'ListMenuItems'}>
                {props.listItems.map((item) => (
                    <OwnedListMenuItem
                        id={item.id}
                        key={item.id}
                        listName={item.name}
                        listSort={item.sort}
                        onChangeDisplay={props.onChangeDisplay}
                        onDeleteAlert={handleToggleAlert}
                        onSetDeletion={handleSetDeletion}

                        isEditingId={isEditingId}
                        editingText={editingText}
                        newest={newestItem}
                        onEditBlur={e =>
                            handleEditComplete(e.target.id)}
                        onEditChange={e =>
                            handleEditChange(e.target.id, e.target.value)}
                        onEditClick={e =>
                            handleEditClick(e.target.id, e.target.value)}
                        onEditEnter={e =>
                            handleEditEnter(e.target.id, e.target, e.key)}
                    />
                ))}

            </div>

            <button className={'AddItemButton'}
                    onClick={handleAddList}>
                <img className={'AddIcon'}
                     src={plus}
                     alt='add new item'
                     width={14}
                     height={14}/>
                Add List</button>

            {showAlert && <Alert
                onCancel={handleToggleAlert}
                onConfirm={() => {
                    handleDeleteList();
                    handleSetDeletion(null);
                }}>
                <div className='alert-info'>
                    <h3 className='alert-header'>WARNING</h3>
                    <div className='alert-text'>
                        Your list will be permanently deleted,
                        are you sure you want to delete <strong>{getListName(listToDelete)}</strong>?
                    </div>
                </div>
            </Alert>}
        </div>
    )
}

export default OwnedListMenu;
