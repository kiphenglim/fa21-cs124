import './App.css';
import ListMenu from './ListMenu';
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
  const collection = db.collection('kiphenglim-lab4');
  const [currentDisplay, setCurrentDisplay] = useState('menu');
  const [value, loading, error] = useCollection(collection);

  function generateListData() {
    if (!error && value) {
      return value.docs.map(e => {return { ...e.data(), id: e.id } });
    }
  }

  function handleChangeDisplay(value) {
    console.log(value);
    // setCurrentDisplay(value);
  }

  return (
    <div className='App'>
      {loading ?
        <></> :
        currentDisplay === 'menu' ?
          <ListMenu
          collection={collection}
          listItems={generateListData()}
          onChangeDisplay={handleChangeDisplay}
          /> :
            currentDisplay === 'list' ? <></> : <></>}

    </div>
  );
}

export default App;
