import './App.css';
import HeaderBar from './HeaderBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import loadingIcon from './loading.gif';

import firebase from 'firebase/compat';
import {GoogleAuthProvider} from 'firebase/auth';
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
  const collection = db.collection('kiphenglim-lab5');
  const [value, dbLoading, dbError] = useCollection(collection);

  if (authLoading) {
    return <p>Checking authentication</p>
  } else if (user) {
      if (dbLoading) {
        return <img className={'LoadingIcon'} src={loadingIcon} alt="loading..." />
      } else if (dbError) {
        return <p>Database error: {dbError.message}</p>
      } else {
        return <div>
          <HeaderBar
            auth={auth}
            userEmail={user.email}
            userId={user.uid}
          />
          <p>Yay! Auth worked :)</p>
        </div>
      }
  }
  else {
    return <>
      {authError && <p> Error App: {authError.message} </p>}
        <SignIn
          auth={auth}
          gProv={gProvider}
          key="Sign In"
        />
        <SignUp
          auth={auth}
          key="Sign Up"
        />
    </>
  }
}

export default App;
