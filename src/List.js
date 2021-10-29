import firebase from 'firebase/compat';
import { useState } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import AddItem from './AddItem';
import Alert from './Alert';
import CompletionButtons from './CompletionButtons';
import ListItem from './ListItem';
import SortSelect from './SortSelect';

function List(props) {
  const [editingText, setEditingText] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);
  const [newestItem, setNewestItem] = useState(null);

  async function anyChecked() {
    const statsRef = await props.statsDoc.get();
    console.log(statsRef.data().numChecked);
    return statsRef.data().numChecked !== 0;
  }

  function handleAdd() {
    const newId = generateUniqueID();
    const newTask = { id: newId,
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
    props.collection.doc(e.target.id).set({task: editingText}, { merge: true });
  }

  function handleEditComplete(e) {
    props.collection.doc(e.target.id).set({task: editingText}, { merge: true });
    setIsEditingId(null);
  }

  function handleEditEnter(e) {
    if (e.key === 'Enter') {
      handleEditComplete({target: {id: e.target.id}});
      e.target.blur();
    }
  }

  async function handleIsCheckedChange(e) {
    const docRef = props.collection.doc(e.target.id);
    const doc = await docRef.get();
    const newCheckedState = !doc.data().checked;
    await docRef.update({checked: newCheckedState});
    const statsRef = await props.statsDoc.get();
    const numChecked = statsRef.data().numChecked;
    newCheckedState
      ? await props.statsDoc.update({numChecked: numChecked+1})
      : await props.statsDoc.update({numChecked: numChecked-1});
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(e) {
    props.collection.doc(e.target.id).set({priority: e.target.value}, { merge: true });
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

    props.statsDoc.update({numChecked: 0});
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
        <br/>
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

        <AddItem onClick={handleAdd}/>

        {<CompletionButtons
          anyCompletedTasks={anyChecked()}
          onShowAllClick={handleShowAllClick}
          onRemoveAllClick={handleToggleAlert}
          showingAllTasks={showingAllTasks}
        /> }

        {showAlert && <Alert
            onCancel={handleToggleAlert}
            onConfirm={handleRemoveAllClick}>
          <div className='alert-text'>
            <h3 className='alert-header'>WARNING</h3>
            Your tasks will be permanently deleted, are you sure you want to delete all completed items?
          </div>
        </Alert>}

    </div>
  );
}

export default List;
