import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import AddItem from './AddItem';
import Alert from './Alert';
import CompletionButtons from './CompletionButtons';
import ListItem from './ListItem';
import SortSelect from './SortSelect';

function List(props) {
  const [numChecked, setNumChecked] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [editingText, setEditingText] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);
  const [newestItem, setNewestItem] = useState(null);

  useEffect(() => {
    const allSnap = props.collection.get();
    allSnap.then(snap => setTotalTasks(snap.size));
    const checkedSnap = props.collection.where('checked', '==', true).get();
    checkedSnap.then(snap => setNumChecked(snap.size));
  }, [props.collection]);

  function handleAdd() {
    const newId = generateUniqueID();
    const newTask = {
      id: newId,
      created: firebase.database.ServerValue.TIMESTAMP,
      task: '',
      priority: '3',
      checked: false
    };
    props.collection.doc(newId).set(newTask);
    setNewestItem(newId);
  }

  function handleEditClick(e) {
    console.log('handleeditclick');
    setEditingText(e.target.value);
    setIsEditingId(e.target.id);
    setNewestItem(null);
  }

  function handleEditChange(e) {
    console.log('handleeditchange');
    setEditingText(e.target.value);
    const docRef = props.collection.doc(e.target.id);
    docRef.update({ task: editingText });
  }

  function handleEditComplete(e) {
    const docRef = props.collection.doc(e.target.id);
    docRef.update({ task: editingText });
    setIsEditingId(null);
  }

  function handleEditEnter(e) {
    if (e.key === 'Enter') {
      handleEditComplete({ target: { id: e.target.id } });
      e.target.blur();
    }
  }

  async function handleIsCheckedChange(e) {
    const docRef = props.collection.doc(e.target.id);
    const doc = await docRef.get();
    const newCheckedState = !doc.data().checked;
    docRef.update({ checked: newCheckedState });
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(e) {
    const docRef = props.collection.doc(e.target.id);
    docRef.update({ priority: e.target.value });
  }

  async function handleRemoveAllClick(e) {
    const snapshot = await props.collection.where('checked', '==', true).get();
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
      handleRemoveAllClick(e);
    });
  }

  function handleShowAllClick() {
    setShowingAllTasks(!showingAllTasks);
  }

  return (
    <div className='ListItemContainer'>
      <SortSelect
        sortBy={props.sortBy}
        onChange={props.onChangeSort}
      />

      <div className={'ListItems'}>
        {props.listItems.map((item) => (
          <ListItem
            checked={item.checked}
            id={item.id}
            key={item.id}
            isEditingId={isEditingId}
            editingText={editingText}
            newest={newestItem}
            onCheckedChange={handleIsCheckedChange}
            onEditBlur={handleEditComplete}
            onEditChange={handleEditChange}
            onEditClick={handleEditClick}
            onEditEnter={handleEditEnter}
            onPriorityChange={handlePriorityChange}
            priority={item.priority}
            showAll={showingAllTasks}
            task={item.task}
          />
        ))}
      </div>

      <AddItem onClick={handleAdd} />

      {<CompletionButtons
        anyCompletedTasks={numChecked !== 0}
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
          are you sure you want to delete {numChecked} of {totalTasks} items?
        </div>
      </Alert>}

    </div>
  );
}

export default List;
