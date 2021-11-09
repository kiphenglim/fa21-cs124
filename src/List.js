import firebase from 'firebase/compat';
import { useState } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import AddItem from './AddItem';
import Alert from './Alert';
import CompletionButtons from './CompletionButtons';
import ListItem from './ListItem';
import SortSelect from './SortSelect';

function List(props) {
  const [listItems, setListItems] = useState(props.listItems);
  const [editingText, setEditingText] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);
  const [newestItem, setNewestItem] = useState(null);

  function handleAdd() {
    const newId = generateUniqueID();
    const newTask = {
      id: newId,
      created: firebase.database.ServerValue.TIMESTAMP,
      task: '',
      priority: '3',
      checked: false
    };
    console.log(newId);
    props.currentList.doc(newId).set(newTask);
    setListItems({...listItems, newTask});
    setNewestItem(newId);
  }

  function handleEditClick(id, v) {
    setEditingText(v);
    setIsEditingId(id);
    setNewestItem(null);
  }

  function handleEditChange(id, v) {
    setEditingText(v);
    const docRef = props.currentList.doc(id);
    docRef.update({ task: editingText });
    setListItems(listItems.filter(t => t.id === id ? {...t, task: v} : t));
  }

  function handleEditComplete(id) {
    const docRef = props.currentList.doc(id);
    docRef.update({ task: editingText });
    setListItems(listItems.filter(t => t.id === id ? { ...t, task: editingText } : t));
    setIsEditingId(null);
  }

  function handleEditEnter(id, target, key) {
    if (key === 'Enter') {
      handleEditComplete(id);
      target.blur();
    }
  }

  async function handleIsCheckedChange(id) {
    const docRef = props.currentList.doc(id);
    const doc = await docRef.get();
    const newCheckedState = !doc.data().checked;
    docRef.update({ checked: newCheckedState });
    setListItems(listItems.filter(t => t.id === id ? { ...t, checked: !t.checked } : t));
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(id, v) {
    const docRef = props.currentList.doc(id);
    docRef.update({ priority: v });
    setListItems(listItems.filter(t => t.id === id ? { ...t, priority: v } : t));
  }

  function handleRemoveAllClick() {
    handleRemoveAllClickState();
    handleRemoveAllClickDb();
  }

  function handleRemoveAllClickState() {
    setListItems(listItems.filter(t => !t.checked));
  }

  async function handleRemoveAllClickDb() {
    const snapshot = await props.currentList.where('checked', '==', true).get();
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      return;
    }

    // Delete documents in a batch
    const batch = props.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      handleRemoveAllClick();
    });
  }

  function handleShowAllClick() {
    setShowingAllTasks(!showingAllTasks);
  }

  function numChecked() {
    const checkedItems = props.listItems.filter((item) => item.checked);
    return checkedItems.length;
  }

  return (
    <div className='ListItemContainer'>

      <h1 className='ListHeader'>Lab 3</h1>

      <SortSelect
        sortBy={props.sortBy}
        onChange={props.onChangeSort}
      />

      <div className={'ListItems'}>
        {console.log(props.listItems)}
        {console.log(listItems)}
        {/* {props.listItems.map((item) => (
          <ListItem
            checked={item.checked}
            id={item.id}
            key={item.id}
            isEditingId={isEditingId}
            editingText={editingText}
            newest={newestItem}
            onCheckedChange={e =>
              handleIsCheckedChange(e.target.id)}
            onEditBlur={e =>
              handleEditComplete(e.target.id)}
            onEditChange={e =>
              handleEditChange(e.target.id, e.target.value)}
            onEditClick={e =>
              handleEditClick(e.target.id, e.target.value)}
            onEditEnter={e =>
              handleEditEnter(e.target.id, e.target, e.key)}
            onPriorityChange={e =>
              handlePriorityChange(e.target.id, e.target.value)}
            priority={item.priority}
            showAll={showingAllTasks}
            task={item.task}
          />
        ))} */}
      </div>

      <AddItem onClick={handleAdd} />

      {<CompletionButtons
        anyCompletedTasks={numChecked() !== 0}
        onShowAllClick={handleShowAllClick}
        onRemoveAllClick={handleToggleAlert}
        showingAllTasks={showingAllTasks}
      />}

      {showAlert && <Alert
        onCancel={handleToggleAlert}
        onConfirm={handleRemoveAllClick}>
        <div className='alert-text'>
          <h3 className='alert-header'>WARNING</h3>
          Your tasks will be permanently deleted,
          are you sure you want to delete {numChecked()} of {props.listItems.length} items?
        </div>
      </Alert>}

    </div>
  );
}

export default List;
