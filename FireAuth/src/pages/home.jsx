import React, { useState } from "react"

const home = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(true)
  const changeMethod = () => {
    console.log("clicked")
    setIsSignUpActive(!isSignUpActive)
  }
  return (
    <section>
      <h2>Homepage</h2>
      <form>
        <div>
          <h1>{isSignUpActive ? "SignUp" : "SignIn"}</h1>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="password" />
          <button type="button">{isSignUpActive ? "SignUp" : "SignIn"}</button>
          <a onClick={changeMethod}>{isSignUpActive ? "Login" : "SignUp"}</a>
        </div>
      </form>
    </section>
  )
}

export default home
