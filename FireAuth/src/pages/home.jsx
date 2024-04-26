import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../firebase"
import GoogleButton from "react-google-button"
import { signInWithGoogleRedirect } from "../firebase"
import { AuthContext } from "../auth/context/context"

const home = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUpActive, setIsSignUpActive] = useState(true)

  const { fireSignUp, fireSignIn, user, isFetching } = useContext(AuthContext)

  const changeMethod = () => {
    setIsSignUpActive(!isSignUpActive)
  }

  const handleSignInWithGoogle = async () => {
    signInWithGoogleRedirect()
  }

  const handleSignUp = async e => {
    e.preventDefault()
    try {
      console.log(email, password)
      await fireSignUp(email, password)
      if (user) {
        console.log(user)
        return <Navigate to="/private"></Navigate>
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleSignIn = async e => {
    e.preventDefault()
    try {
      console.log(email, password)
      await fireSignIn(email, password)
      if (user) {
        console.log(user)
        return <Navigate to="/private"></Navigate>
      }
    } catch (err) {
      console.log(err.message)
    }
  }

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
          {!isSignUpActive && <button onClick={handleSignIn}>Login</button>}

          {!isSignUpActive && <GoogleButton onClick={handleSignInWithGoogle} />}

          <a onClick={changeMethod}>{isSignUpActive ? "Login" : "SignUp"}</a>
        </div>
      </form>
    </section>
  )
}

export default home
