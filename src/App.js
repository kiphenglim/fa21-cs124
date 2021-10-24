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
  const collection = db.collection('kiphenglim-tasks');
  const statsDoc = db.collection('kiphenglim-tasks-stats').doc('list1');
  const [sortBy, setSortBy] = useState('created');
  const [value, loading, error] = useCollection(collection.orderBy(sortBy));

  function generateListData() {
    if (!error && value) {
      return value.docs.map(e => {return { ...e.data(), id: e.id } });
    }
  }

  function generateListStats() {
    statsDoc.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        statsDoc.set({ numChecked: 0 });
        return {numChecked: 0};
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      return {numChecked: 0};
    });
  }

  function handleChangeSort(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className='App'>
      <h1 className='list-header'>CS124 Lab 3</h1>
      {loading ?
        <></> :
        <List collection={collection}
              db={db}
              listItems={generateListData()}
              listStats={generateListStats()}
              onChangeSort={handleChangeSort}
              sortBy={sortBy}
              statsDoc={statsDoc}/>}
    </div>
  );
}

export default App;
