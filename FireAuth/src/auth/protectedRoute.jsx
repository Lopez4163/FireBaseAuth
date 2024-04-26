import React, { useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom" // Remove useNavigate
import { AuthContext } from "./context/context" //"

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState("")
  const [redirect, setRedirect] = useState(false) // Add state to handle redirection

  const { user, fetchUserData } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(user.uid)
        setUserRole(userData.role)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  // Check if the user is not logged in or does not have the required role
  if (!user || userRole !== "student") {
    // Update the state to trigger redirection
    setRedirect(true)
  }

  // If redirect is true, return Navigate component to perform redirection
  if (redirect) {
    return <Navigate to="/" replace={true} />
  }

  // If user has the required role, render the children
  return children
}

export default ProtectedRoute
