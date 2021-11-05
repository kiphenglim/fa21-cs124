import firebase from 'firebase/compat';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import ListMenuItem from './ListMenuItem';
import plus from './plus.png';


function ListMenu(props) {

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

    function handleDeleteList(id) {
        props.collection.doc(id).delete();
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
        </div>
    )
}

export default ListMenu;