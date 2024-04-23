import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../firebase"
import GoogleButton from "react-google-button"
import { signInWithGoogleRedirect } from "../firebase"

const home = ({ user }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUpActive, setIsSignUpActive] = useState(true)

  const changeMethod = () => {
    setIsSignUpActive(!isSignUpActive)
  }

  const handleSignInWithGoogle = async () => {
    signInWithGoogleRedirect()
  }

  const handleSignUp = e => {
    if (!email || !password) {
      return console.log("EMPTY FIELDS")
    }
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log("user: ", user)
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message
        console.log(errorCode, errorMessage)
      })
  }

  const handleSignIn = e => {
    if (!email || !password) {
      return console.log("EMPTY FIELDS")
    }
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log("user: ", user)
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message
        console.log(errorCode, errorMessage)
      })
  }

  //Navigate on login
  if (user) {
    return <Navigate to="/private"></Navigate>
  }

  return (
    <section>
      <h2>Homepage</h2>
      <form>
        <div>
          {isSignUpActive && <h1>Sign Up</h1>}
          {!isSignUpActive && <h1>Sign In</h1>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          {isSignUpActive && <button onClick={handleSignUp}>Sign Up</button>}
          {!isSignUpActive && <GoogleButton onClick={handleSignInWithGoogle} />}

          <a onClick={changeMethod}>{isSignUpActive ? "Login" : "SignUp"}</a>
        </div>
      </form>
    </section>
  )
}

export default home
