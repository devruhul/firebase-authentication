import { GithubAuthProvider, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './App.css';
import initializeAuthentication from './firebase/firebase.initialize';

import { useState } from 'react'


initializeAuthentication()

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

function App() {
  const [user, setUser] = useState({})

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

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}> Sign with google</button>
      <button onClick={handleGithubSignIn}> Sign with github</button>
      {user.name &&

        <div>
          <h2> welcome {user.name}</h2>
          <h2> your email {user.email}</h2>
          <img src={user.photo} alt="" /> </div>

      }

    </div>
  );
}

export default App;
