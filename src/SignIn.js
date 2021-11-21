import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { useState } from "react";


function SignIn(props) {
  const [
    signInWithEmailAndPassword,
    userCredential, loading, error
  ] = useSignInWithEmailAndPassword(props.auth);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  if (userCredential) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <div>Unexpectedly signed in already</div>
  } else if (loading) {
    return <p>Logging in…</p>
  }
  return <div>
    {error && <p>Error logging in: {error.message}</p>}
    <h1>Sign In</h1>
    <button onClick={() => props.auth.signInWithPopup(props.gProv)}>
      Sign In With Google
    </button>
    <br/>
    <label>
      Email:
      <input onChange={v=>setEmail(v)} type='text'/>
    </label>
    <br/>
    <label>
      Password:
      <input onChange={v=>setPass(v)} type='password' name='password'/>
    </label>
    <br/>
    <button onClick={() => signInWithEmailAndPassword(email, pass)}>
      Sign In
    </button>
  </div>
}

export default SignIn;
