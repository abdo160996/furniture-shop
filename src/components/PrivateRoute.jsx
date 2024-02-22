import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation, useParams } from 'react-router-dom'

function PrivateRoute({children}) {
  const {user} =  useAuthContext()
  const {pathname} = useLocation()
  
 
  if (user) {
    return children
  }
  return (
    <Navigate to={'/login'} state={{from:pathname}} />
  )
}

export default PrivateRoute