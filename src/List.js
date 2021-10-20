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
  const [isChecked, setIsChecked] = useState([]);
  const [isEditingId, setIsEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);

  function handleAdd() {
    const newId = generateUniqueID();
    let newTask = { id: newId,
        created: firebase.database.ServerValue.TIMESTAMP,
        task: '',
        priority: '3'
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

  function handleIsCheckedChange(e) {
    let newId = e.target.id;
    if (isChecked.includes(newId)) {
      setIsChecked(isChecked.filter((id) => id !== newId));
    } else {
      setIsChecked([...isChecked, newId]);
    }
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(e) {
    props.collection.doc(e.target.id).set({priority: e.target.value}, { merge: true });
  }

  function handleRemoveOneClick(id) {
    props.collection.doc(id).delete();
  }

  function handleRemoveAllClick() {
    isChecked.map(e => props.collection.doc(e).delete());
    setIsChecked([]);
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
            checked={isChecked.includes(item.id)}
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
          anyCompletedTasks={isChecked.length !== 0}
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
