import './App.css';
import List from './List'
import OwnedListMenu from './OwnedListMenu';
import firebase from 'firebase/compat';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useState} from "react";

const firebaseConfig = {
  apiKey: 'AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s',
  authDomain: 'hmc-cs124-fa21-labs.firebaseapp.com',
  projectId: 'hmc-cs124-fa21-labs',
  storageBucket: 'hmc-cs124-fa21-labs.appspot.com',
  messagingSenderId: '949410042946',
  appId: '1:949410042946:web:0113b139a7e3cd1cc709db'
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {

  /*
  collection: top level with lists document containing:
    ownedlists: collection of lists with following properties
      id
      created
      name
      sort
    sharedlists: collection of lists with following properties
      id
      created
      name
      sort
   */
  const collection = db.collection('kiphenglim-lab4');
  const ownedListsCollection = collection.doc('lists').collection('owned-lists');
  const [olvalue, olloading, olerror] = useCollection(ownedListsCollection);
  const sharedListsCollection = collection.doc('lists').collection('shared-lists');
  const [slvalue, slloading, slerror] = useCollection(sharedListsCollection);

  const [currentDisplay, setCurrentDisplay] = useState('menu');
  const [currentListItems, setCurrentListItems] = useState([]);

  function generateOwnedLists() {
    if (!olerror && olvalue) {
      const data = olvalue.docs.map(e => { return e.data() });
      return data;
    }
  }

  function generateSharedLists() {
    if (!slerror && slvalue) {
      const data = slvalue.docs.map(e => { return e.data() });
      return data;
    }
  }

  function generateListData(id) {
    queryListData(id).then(d => setCurrentListItems(d));
  }

  async function queryListData(id) {
    console.log(id);
    const snapshot = await ownedListsCollection.doc(id).collection('tasks').get();
    let data = [];
    snapshot.forEach(e => {data.push(e.data())});
    console.log(data);
    return data;
  }

  function handleChangeDisplay(id) {
    setCurrentDisplay(id);
    generateListData(id);
  }

  return (
    <div className='App'>
      {
        olloading || slloading
          ? <></>
          : currentDisplay === 'menu'
            ? <>
                <OwnedListMenu
                collection={collection}
                listItems={generateOwnedLists()}
                onChangeDisplay={handleChangeDisplay}
                ownedListsCollection={ownedListsCollection}
                />
                {/* List sharing in upcoming labs */}
                {/* <ListMenu
                  collection={collection}
                  ownedListsCollection={ownedListsCollection}
                  listItems={generateSharedLists()}
                  onChangeDisplay={handleChangeDisplay}
                /> */}
              </>
            : <List
                id={currentDisplay}
                listItems={currentListItems}
                sortBy={'date'}
                onChangeSort={null}
                onChangeDisplay={handleChangeDisplay}
                currentList={ownedListsCollection.doc(currentDisplay).collection('tasks')}
              />
      }

    </div>
  );
}

export default App;
