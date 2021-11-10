import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import AddItem from './AddItem';
import Alert from './Alert';
import CompletionButtons from './CompletionButtons';
import ListItem from './ListItem';
import SortSelect from './SortSelect';

function List(props) {
  const [value, loading, error] = useCollection(props.listCollection);

  const [currentTasks, setCurrentTasks] = useState([]);
  const [editingText, setEditingText] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);
  const [newestItem, setNewestItem] = useState(null);

  useEffect( () => {generateListData()}, [loading] )

  function generateListData() {
    if (!error && value) {
      const data = value.docs.map(e => { return e.data() });
      console.log(data);
      return setCurrentTasks(data);
    }
  }

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
    props.listCollection.doc(newId).set(newTask);
    setCurrentTasks([...currentTasks, newTask]);
    setNewestItem(newId);
  }

  function handleEditClick(id, v) {
    setEditingText(v);
    setIsEditingId(id);
    setNewestItem(null);
  }

  function handleEditChange(id, v) {
    setEditingText(v);
    const docRef = props.listCollection.doc(id);
    docRef.update({ task: editingText });
    setCurrentTasks(currentTasks.map(t => t.id === id ? { ...t, task: editingText } : t));
  }

  function handleEditComplete(id) {
    const docRef = props.listCollection.doc(id);
    docRef.update({ task: editingText });
    setCurrentTasks(currentTasks.map(t => t.id === id ? {...t, task: editingText} : t));
    setIsEditingId(null);
  }

  function handleEditEnter(id, target, key) {
    if (key === 'Enter') {
      handleEditComplete(id);
      target.blur();
    }
  }

  async function handleIsCheckedChange(id) {
    const docRef = props.listCollection.doc(id);
    const doc = await docRef.get();
    const newCheckedState = !doc.data().checked;
    docRef.update({ checked: newCheckedState });
    setCurrentTasks(currentTasks.map(t => t.id === id ? { ...t, checked: newCheckedState } : t));
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(id, v) {
    const docRef = props.listCollection.doc(id);
    docRef.update({ priority: v });
    setCurrentTasks(currentTasks.map(t => t.id === id ? { ...t, priority: v } : t));
  }

  async function handleRemoveAllClick() {
    const snapshot = await props.listCollection.where('checked', '==', true).get();
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
    const checkedItems = currentTasks.filter((item) => item.checked);
    return checkedItems.length;
  }

  return (
    <div className='ListItemContainer'>

      <h1 className='ListHeader'>List Name</h1>

      <SortSelect
        sortBy={props.sortBy}
        onChange={props.onChangeSort}
      />

      <div className={'ListItems'}>
        {loading || currentTasks === []
          ? <></>
          : currentTasks.map((item) => (
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
        ))}
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
