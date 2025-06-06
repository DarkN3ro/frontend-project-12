import { Navigate } from 'react-router-dom'

import { useAuth } from '../util/useAuth'

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth()

  return isAuth ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
