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

  function anyChecked() {
    props.collection.get()

    docRef.map((doc) =>
    {
      console.log(doc.checked);
      if (doc.checked) return true;
    });
    return false;
  }

  function handleAdd() {
    const newId = generateUniqueID();
    let newTask = { id: newId,
        created: firebase.database.ServerValue.TIMESTAMP,
        task: '',
        priority: '3',
        checked: false
      };
    props.collection.doc(newId).set(newTask);
    setIsEditingId(newId);
    setEditingText('');
  }

  function handleEditClick(e) {
    setEditingText(e.target.value);
    setIsEditingId(e.target.id);
  }

  function handleEditChange(e) {
    setEditingText(e.target.value);
    setIsEditingId(e.target.id);
    props.collection.doc(e.target.id).set({task: editingText}, { merge: true });
  }

  function handleEditComplete(e) {
    props.collection.doc(e.target.id).set({task: editingText}, { merge: true });
    setEditingText('');
    setIsEditingId(null);
  }

  function handleEditEnter (e) {
    if (e.key === 'Enter') {
      e.target.blur();
      handleEditComplete(e);
    }
  }

  async function handleIsCheckedChange(e) {
    const docRef = await props.collection.doc(e.target.id).get();
    props.collection.doc(e.target.id).set({checked: !docRef.data().checked}, {merge: true});
    console.log(anyChecked());
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(e) {
    props.collection.doc(e.target.id).set({priority: e.target.value}, { merge: true });
  }

  function handleRemoveAllClick() {
    props.collection.map(e => e.checked? e.delete(): {});
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

        {props.listItems.map((item) => (
          <ListItem
            checked={item.checked}
            id={item.id}
            key={item.id}
            isEditingId={isEditingId}
            editingText={editingText}
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

        <AddItem onClick={handleAdd}/>

        <CompletionButtons
          anyCompletedTasks={anyChecked()}
          onShowAllClick={handleShowAllClick}
          onRemoveAllClick={handleToggleAlert}
          showingAllTasks={showingAllTasks}
        />

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
