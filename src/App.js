import './App.css';
import List from './List'
import OwnedListMenu from './OwnedListMenu';
import TabList from './TabList';
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
  collection: collection of lists each with following properties:
    id
    created
    name
    sort
    tasks
    to be added in lab 5: ownerId, sharedId
   */
  const collection = db.collection('kiphenglim-lab4');
  const [value, loading, error] = useCollection(collection);

  const [currentDisplay, setCurrentDisplay] = useState('menu');

  let lists = [];
  if (value) {
    lists = value.docs.map(e => { return e.data() });
  }

  function handleChangeDisplay(id) {
    console.log(id);
    setCurrentDisplay(id);
  }

  return (
    <div className='App'>
      {
        loading
          ? <></>
          : currentDisplay === 'menu'
            ?
              <TabList aria-label={'switch tabs to view owned or shared list'}>
                <div key={'owned'}
                     aria-label={'list owned by me'}>
                  <OwnedListMenu
                    collection={collection}
                    listItems={lists}
                    onChangeDisplay={handleChangeDisplay}
                  />
                </div>
                <div key={'shared'}
                     align={'center'}
                     aria-label={'lists shared with me'}>
                    Lists Shared With Me
                </div>
              </TabList>
            : <List
                db={db}
                id={currentDisplay}
                listData={lists.find(e => e.id === currentDisplay)}
                listDocRef={collection.doc(currentDisplay)}
                listCollection={collection.doc(currentDisplay).collection('tasks')}
                onChangeDisplay={handleChangeDisplay}
              />
      }

    </div>
  );
}

export default App;
