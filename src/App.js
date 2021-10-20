import "./App.css";
import List from "./List";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
  authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
  projectId: "hmc-cs124-fa21-labs",
  storageBucket: "hmc-cs124-fa21-labs.appspot.com",
  messagingSenderId: "949410042946",
  appId: "1:949410042946:web:0113b139a7e3cd1cc709db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const collection = db.collection('kiphenglim-tasks');
  const [value, loading, error] = useCollection(collection);

  function generateListData() {
    if (value) {
      return value.docs.map(e => { return { ...e.data(), id: e.id } });
    }
  }

  return (
    <div className="App">
      <h1>CS124 Lab 2</h1>
      {loading ?
        <></> :
        <List collection={collection} listItems={generateListData()} />}
    </div>
  );
}

export default App;
