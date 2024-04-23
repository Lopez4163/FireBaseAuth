import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"

import Home from "./pages/home"
import ProtectedRoute from "./components/protectedRoute"
import PrivatePage from "./pages/privatePage"
import privatePage from "./pages/privatePage"

function App() {
  const [user, setUser] = useState(null)
  const [isfetching, setIsFetching] = useState(true)

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

  if (isfetching) {
    return <h1>Loading.....</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index="/" element={<Home user={user} />} />
        <Route
          path="/private"
          element={
            <ProtectedRoute user={user}>
              <PrivatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
