import { createContext, useState, useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { auth, db } from "../../firebase"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        setIsFetching(false)
        return
      }
      setUser(null)
      setIsFetching(false)
    })
    return () => unsubscribe()
  }, [])

  const fireSignUp = async (email, password) => {
    console.log("CUWAAF funct hit", email, password)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const userId = userCredential.user.uid
      const usersRef = collection(db, "users")
      const userDocRef = doc(usersRef, userId)
      await setDoc(userDocRef, {
        uid: userId,
        email: email,
        role: "student",
      })
      const userData = await fetchUserData(userId)
      console.log("User account created successfully:", userData)
    } catch (error) {
      setError(error)
      console.error("Error creating user:", error)
    }
  }

  async function fireSignIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("User Signed in successfully")
    } catch (error) {
      setError(error)
      console.log("User Signed in failed", error)
    } finally {
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
      console.log("User signed out successfully")
    } catch (error) {
      console.error(error, "logged out unsuccessfully")
    }
  }

  async function sendPasswordResetEmail(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      setError(null)
      console.log("Password reset email sent successfully!")
    } catch (error) {
      setError(error)
    }
  }

  async function fetchUserData(userId) {
    try {
      const usersRef = doc(collection(db, "users"), userId)
      const docSnapshot = await getDoc(usersRef)

      if (docSnapshot.exists) {
        return docSnapshot.data()
      } else {
        return null
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        fireSignUp,
        fireSignIn,
        handleLogout,
        sendPasswordResetEmail,
        fetchUserData,
        isFetching,
      }}
    >
      {isFetching ? (
        <h1>Loading...</h1> // Render loading indicator when fetching data
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
