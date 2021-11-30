import firebase from "firebase/compat";
import { arrayUnion } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

import Alert from "./Alert";
import ListMenuItem from "./ListMenuItem";
import ShareList from "./ShareList";
import plus from "./plus.png";

function ListMenu(props) {
  const [editingText, setEditingText] = useState("");
  const [isEditingId, setIsEditingId] = useState(null);
  const [listToDelete, setListToDelete] = useState(null);
  const [newestItem, setNewestItem] = useState(null);
  const [shareInputText, setShareInputText] = useState('');
  const [sharedWithIds, setSharedWithIds] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showShare, setShowShare] = useState(null);
  const disableTab = showAlert || (showShare !== null);

  function handleAddEditor(listId, email) {
    // IDEALLY
    // validate email for existing user
    // convert email to uid
    // add uid to current list's sharedId
    // getAuth()
    //   .getUserByEmail(email)
    //   .then(userRecord => {
    //     console.log(userRecord.getUid());
    //     // props.collection.doc(listId).update({
    //     //   sharedId: arrayUnion(userRecord.getUid())
    //     // });
    //   })
    //   .catch(error => {
    //     console.log("Error fetching user data:", error);
    //   });

    props.collection.doc(listId).update({
      sharedId: arrayUnion(email)
    });
    setShareInputText('');
  }

  function handleAddList() {
    const newId = generateUniqueID();
    const newList = {
      id: newId,
      created: firebase.database.ServerValue.TIMESTAMP,
      name: "",
      sort: "created",
      ownerId: props.user,
      sharedId: [],
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
    if (key === "Enter") {
      handleEditComplete(id);
      target.blur();
    }
  }

  function handleToggleAlert() {
    setShowAlert(!showAlert);
  }

  async function handleToggleShare(id) {
    setShowShare(id);
    const docRef = props.collection.doc(id);
    const doc = await docRef.get();
    setSharedWithIds(doc.data().sharedId)
    console.log(showShare);
  }

  function handleSetDeletion(id) {
    setListToDelete(id);
  }

  function getListName(id) {
    const list = props.listItems.find((e) => e.id === id);
    return list.name;
  }

  return (
    <div className={"ListMenuContainer"} aria-label={"my lists"}>
      <h1
        aria-label={"Lab 5"}
        className={"ListMenuTitle"}
        tabIndex={disableTab ? -1 : 0}
      >
        Lab 5
      </h1>

      <div className={"ListMenuItems"}>
        {props.listItems.map((item) => (
          <ListMenuItem
            id={item.id}
            key={item.id}
            listName={item.name}
            listSort={item.sort}
            onChangeDisplay={props.onChangeDisplay}
            onDeleteAlert={handleToggleAlert}
            onSetDeletion={handleSetDeletion}
            onShare={handleToggleShare}
            isEditingId={isEditingId}
            editingText={editingText}
            newest={newestItem}
            disableTab={disableTab}
            onEditBlur={(e) => handleEditComplete(e.target.id)}
            onEditChange={(e) => handleEditChange(e.target.id, e.target.value)}
            onEditClick={(e) => handleEditClick(e.target.id, e.target.value)}
            onEditEnter={(e) => handleEditEnter(e.target.id, e.target, e.key)}
          />
        ))}
      </div>

      <button
        className={"AddItemButton"}
        aria-label={"add new list"}
        tabIndex={disableTab ? -1 : 0}
        onClick={handleAddList}
      >
        <img
          className={"AddIcon"}
          src={plus}
          alt="add new list"
          width={14}
          height={14}
        />
        Add List
      </button>

      {showAlert && (
        <Alert
          onCancel={handleToggleAlert}
          onConfirm={() => {
            handleDeleteList();
            handleSetDeletion(null);
          }}
        >
          <div className="alert-info" aria-label={"list deletion alert"}>
            <h3 className="alert-header">WARNING</h3>
            <div className="alert-text">
              Your list will be permanently deleted, are you sure you want to
              delete
              {getListName(listToDelete) !== "" ? (
                <strong> {getListName(listToDelete)}</strong>
              ) : (
                " this list"
              )}
              ?
            </div>
          </div>
        </Alert>
      )}

      {showShare !== null && (
        <ShareList
          id={showShare}
          onCancel={handleToggleShare}
          // onConfirm={handleToggleShare}
          onConfirm={() => handleAddEditor(showShare, shareInputText)}
        >
          <h3 className="alert-header">SHARE {getListName(showShare)} </h3>
          <div className={"SharedWith"}>Shared with...</div>
          {sharedWithIds.map((email) => (
            <p>{email}</p>
          ))}
          <input
            className={"ShareInputText"}
            onChange={(e) => setShareInputText(e.target.value)}
            type={"text"}
            value={shareInputText}
          />
        </ShareList>
      )}
    </div>
  );
}

export default ListMenu;
