import './App.css';
import List from './List'
import ListMenu from './ListMenu';
import TabList from './TabList';
import firebase from 'firebase/compat';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useState} from 'react';
import loadingIcon from './loading.gif';

const firebaseConfig = {
  apiKey: "AIzaSyAlILmNMlZ8xYJbCBm2N4gjZ-ZFM7e8S2o",
  authDomain: "fa21-cs124.firebaseapp.com",
  projectId: "fa21-cs124",
  storageBucket: "fa21-cs124.appspot.com",
  messagingSenderId: "61985211143",
  appId: "1:61985211143:web:d10c025299ac719dc0fba2",
  measurementId: "G-8CXFS46XVY"
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
    ownerId
    sharedId
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
          ? <img className={'LoadingIcon'} src={loadingIcon} alt="loading..." />
          : currentDisplay === 'menu'
            ?
              // <TabList aria-label={'switch tabs to view owned or shared list'}>
              //   <div key={'owned'}
              //        aria-label={'list owned by me'}>
                  <ListMenu
                    collection={collection}
                    listItems={lists}
                    onChangeDisplay={handleChangeDisplay}
                  />
              //   </div>
              //   <div key={'shared'}
              //        align={'center'}
              //        aria-label={'lists shared with me'}>
              //       Lists Shared With Me
              //   </div>
              // </TabList>
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
