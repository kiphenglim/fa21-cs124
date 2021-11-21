import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from "react";


function SignUp(props) {
  const [
    createUserWithEmailAndPassword,
    userCredential, loading, error
  ] = useCreateUserWithEmailAndPassword(props.auth);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  if (userCredential) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <div>Unexpectedly signed in already</div>
  } else if (loading) {
    return <p>Signing up…</p>
  }
  return <div>
    {error && <p>"Error signing up: " {error.message}</p>}
    <h1>Sign Up</h1>
    <label>
      Email
      <input onChange={v=>setEmail(v.target.value)} type='email'/>
    </label>
    <br/>
    <label>
      Password
      <input onChange={v=>setPass(v.target.value)} type='password' name='password'/>
    </label>
    <br/>
    <button onClick={() => createUserWithEmailAndPassword(email, pass) } >
      Sign Up
    </button>
  </div>
}

export default SignUp;
