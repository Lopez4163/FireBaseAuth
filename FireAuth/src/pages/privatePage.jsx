import React from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

const privatePage = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch(error => console.log(error.message))
  }

  return (
    <section>
      <button onClick={handleSignOut}>Log Out</button>
    </section>
  )
}

export default privatePage
