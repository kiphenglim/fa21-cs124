import firebase from 'firebase/compat';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import AddItem from './AddItem';
import Alert from './Alert';
import CompletionButtons from './CompletionButtons';
import ListItem from './ListItem';
import SortSelect from './SortSelect';

import back from './back.png';

function List(props) {
  // props.list  => includes id, name, sortBy
  const [value, loading, error] = useCollection(props.listCollection.orderBy(getListSort()));

  // const [currentTasks, setCurrentTasks] = useState([]);
  const [editingText, setEditingText] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showingAllTasks, setShowingAllTasks] = useState(true);
  const [newestItem, setNewestItem] = useState(null);

  let data = [];
  if (value) {
    data = value.docs.map(e => { return e.data() });
  }

  function getListName() {
    return props.listData.name;
  }

  function getListSort() {
    return props.listData.sort;
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
    props.listCollection.doc(newId).set(newTask);
    setNewestItem(newId);
  }

  function handleChangeSort(v) {
    props.listDocRef.update({'sort': v});
    console.log(v);
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
  }

  function handleEditComplete(id) {
    const docRef = props.listCollection.doc(id);
    docRef.update({ task: editingText });
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
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  function handlePriorityChange(id, v) {
    const docRef = props.listCollection.doc(id);
    docRef.update({ priority: v });
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
    const checkedItems = data.filter((item) => item.checked);
    return checkedItems.length;
  }

  return (
    <div className={'ListItemContainer'}>

      <div className={'ListHeader'}>
        <button className={'ListHeaderBack'}
                aria-label={'return to list menu'}
                onClick={() => {props.onChangeDisplay('menu')}}>
          <img className={'BackIcon'}
               src={back}
               alt='back arrow icon'
               width={24}
               height={24}/>
        </button>

        <h1 className={'ListHeaderName'}
            aria-label={getListName()}>{getListName()}</h1>
      </div>

      <SortSelect
          sortBy={getListSort()}
          onChange={e => handleChangeSort(e.target.value)}
      />

      <div className={'ListItems'} aria-label={'checklist of tasks'}>
        {loading || data === []
          ? <></>
          : data.map((item) => (
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
        <div className='alert-text' aria-label={'task deletion alert'}>
          <h3 className='alert-header'>WARNING</h3>
          Your tasks will be permanently deleted,
          are you sure you want to delete {numChecked()} of {data.length} items?
        </div>
      </Alert>}

    </div>
  );
}

export default List;
