import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAdmin }) => {
  const token = localStorage.getItem('token') // JWT token from localStorage
  const user = JSON.parse(localStorage.getItem('user')) // Decoded user from localStorage

  if (!token) {
    return <Navigate to='/login' />
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to='/' /> // Redirect non-admins to homepage
  }

  return children
}

export default ProtectedRoute
