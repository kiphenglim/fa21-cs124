import firebase from 'firebase/compat';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { useState } from 'react';

import Alert from './Alert'
import ListMenuItem from './ListMenuItem';
import plus from './plus.png';


function ListMenu(props) {

    const [showAlert, setShowAlert] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);

    function handleAddList() {
        const newId = generateUniqueID();
        const newList = {
            id: newId,
            created: firebase.database.ServerValue.TIMESTAMP,
            name: 'New List',
            sort: 'date',
            data: []
        };
        console.log(newList.name);
        props.collection.doc(newId).set(newList);
    }

    function handleDeleteList() {
        props.collection.doc(listToDelete).delete();
    }

    function handleToggleAlert() {
        setShowAlert(!showAlert);
    }

    function handleSetDeletion(id) {
        setListToDelete(id);
    }

    function getListName(id) {
        const list = props.listItems.find(e => e.id == id);
        return list.name;
    }

    return (
        <div className={'ListMenu'}>
            <h1 className={'list-menu-title'}>Lab 4</h1>

            {props.listItems.map((item) => (
                <ListMenuItem
                    id={item.id}
                    listName={item.name}
                    listSort={item.sort}
                    onChangeDisplay={props.onChangeDisplay}
                    onDeleteAlert={handleToggleAlert}
                    onSetDeletion={handleSetDeletion}
                />
            ))}

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
                        are you sure you want to delete {getListName(listToDelete)}?
                    </div>
                </div>
            </Alert>}
        </div>
    )
}

export default ListMenu;