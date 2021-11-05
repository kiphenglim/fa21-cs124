import './App.css';
import List from './List';
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
  const collection = db.collection('kiphenglim-lab3');
  const [sortBy, setSortBy] = useState('created');
  const [value, loading, error] = useCollection(collection.orderBy(sortBy));

  function generateListData() {
    if (!error && value) {
      return value.docs.map(e => {return { ...e.data(), id: e.id } });
    }
  }

  function handleChangeSort(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className='App'>
      {loading ?
        <></> :
        <List collection={collection}
              db={db}
              listItems={generateListData()}
              onChangeSort={handleChangeSort}
              sortBy={sortBy}/>}
    </div>
  );
}

export default App;
