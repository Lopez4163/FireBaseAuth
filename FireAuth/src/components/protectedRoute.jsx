import React from "react"
import { Navigate } from "react-router-dom"

const protectedRoute = ({ children, user }) => {
  console.log(user)
  return user ? children : <Navigate to="/"></Navigate>
}

export default protectedRoute
