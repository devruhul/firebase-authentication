import { GithubAuthProvider, getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import './App.css';
import initializeAuthentication from './firebase/firebase.initialize';

import { useState } from 'react'


initializeAuthentication()

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

function App() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')


  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        console.log(loggedInUser)
        setUser(loggedInUser)

      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorCode, errorMessage, email)
      })
  }

  const handleGithubSignIn = () => {

    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        console.log(loggedInUser)
        setUser(loggedInUser)

      })

      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorCode, errorMessage, email)
      })

  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }

  const handleRegister = e => {
    e.preventDefault()
    console.log(email, password)
    if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(password)) {
      setError('Minmum 8 characters length 2 letters in Upper Case 1 Special Char.(!@#$&*)2 numerals(0 - 9) 3 letters in Lower Case')
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user)
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })

  }


  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }


  return (
    <div className="mx-5">
      <form onSubmit={handleRegister}>
        <div className="mx-auto mb-3" style={{ width: 200 }}>
          <h3 className="text-primary ml-5">Please Register</h3>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
          {error}
        </button>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      <br /><br /><br /><br /><br />



      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}> Sign with google</button>
          <button onClick={handleGithubSignIn}> Sign with github</button>
        </div> :
        <button onClick={handleSignOut}> Sign out</button>}

      {user.name ?
        <div>
          <h2> welcome {user.name}</h2>
          <img src={user.photo} alt="" />
        </div> : []
      }

    </div >
  );
}

export default App;
