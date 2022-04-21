import './App.css';
import HeaderBar from './HeaderBar';
import List from './List'
import ListMenu from './ListMenu';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TabList from './TabList';
import loadingIcon from './loading.gif';

import firebase from 'firebase/compat';
import {GoogleAuthProvider} from 'firebase/auth';
import {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';

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
const auth = firebase.auth();
const gProvider = new GoogleAuthProvider();

function App() {
  const [user, authLoading, authError] = useAuthState(auth);
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
  const collection = db.collection('kiphenglim-lab5');
  const [ownedValue, ownedLoading, ownedError] =
    useCollection(collection.where('ownerId', '==', user ? user.uid : 0));
  const [sharedValue, sharedLoading, sharedError] =
    useCollection(collection.where('sharedId', "array-contains", user ? user.email : ''));

  const [currentDisplay, setCurrentDisplay] = useState('menu');

  let ownedLists = [];
  if (ownedValue) {
    ownedLists = ownedValue.docs.map(e => { return e.data() });
  }

  let sharedLists = [];
  if (sharedValue) {
    sharedLists = sharedValue.docs.map(e => { return e.data() });
  }

  function handleChangeDisplay(id) {
    console.log(id);
    setCurrentDisplay(id);
  }

  function findList() {
    const ownedList = ownedLists.find(e => e.id === currentDisplay);
    const sharedList = sharedLists.find(e => e.id === currentDisplay);
    if (ownedList) {
      return ownedList;
    } else if (sharedList) {
      return sharedList;
    } else {
      return -1;
    }
  }

  if (authLoading) {
    return <p>Checking authentication</p>
  } else if (user) {
      if (ownedLoading || sharedLoading) {
        return <img className={'LoadingIcon'} src={loadingIcon} alt="loading..." />
      } else if (ownedError || sharedError) {
        return <p>Database error: {ownedError.message} {sharedError.message}</p>
      } else {
        return <div className={'Wrapper'}>
          <HeaderBar
            auth={auth}
            userEmail={user.email}
            userId={user.uid}
          />
          {currentDisplay === 'menu'
            ?
            <TabList aria-label={'switch tabs to view owned or shared list'}>
              <div key={'owned'}
                   aria-label={'list owned by me'}>
                <ListMenu
                  collection={collection}
                  listItems={ownedLists}
                  onChangeDisplay={handleChangeDisplay}
                  type={'owned'}
                  user={user.uid}
                />
               </div>
              <div key={'shared'}
                   align={'center'}
                   aria-label={'lists shared with me'}>
                <ListMenu
                  collection={collection}
                  listItems={sharedLists}
                  onChangeDisplay={handleChangeDisplay}
                  type={'shared'}
                  user={user.uid}
                />
              </div>
            </TabList>
            : <List
              db={db}
              id={currentDisplay}
              listData={findList()}
              listDocRef={collection.doc(currentDisplay)}
              listCollection={collection.doc(currentDisplay).collection('tasks')}
              onChangeDisplay={handleChangeDisplay}
            />}
        </div>
      }
  }
  else {
    return <div className={'SignInWrapper'}>
      {authError && <p> Error App: {authError.message} </p>}
      <SignIn
        auth={auth}
        gProv={gProvider}
        key="Sign In"
      />
      <div><hr/></div>
      <SignUp
        auth={auth}
        key="Sign Up"
      />
    </div>
  }
}

export default App;
