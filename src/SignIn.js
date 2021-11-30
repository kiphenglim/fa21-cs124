import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { useState } from "react";
import google from "./google.png";


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
  return <div className={'SignIn'}>
    {error && <p>Error: {error.message}</p>}
    <h2>Sign In</h2>
    <label>
      <div>Email</div>
      <input onChange={v=>setEmail(v)} type='email'/>
    </label>
    <label>
      <div>Password</div>
      <input onChange={v=>setPass(v)} type='password' name='password'/>
    </label>
    <br/>
    <button className={'SignInButton'} onClick={() => signInWithEmailAndPassword(email, pass)}>
      Sign In
    </button>
    <br/>
    <button className={'SignInGoogleButton'} onClick={() => props.auth.signInWithPopup(props.gProv)}>
      <img className={'GoogleIcon'}
           src={google}
           alt='google icon'
           width={18}
           height={18}/>
      <div> &nbsp;&nbsp;Sign In With Google</div>
    </button>
    <br/>
  </div>
}

export default SignIn;
