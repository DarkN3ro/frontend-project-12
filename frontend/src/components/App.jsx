import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Header from '../components/Header.jsx'
import Chat from '../pages/ChatPage.jsx'
import Login from '../pages/LoginPage.jsx'
import NotFound from '../pages/NotFound404Page.jsx'
import PrivateRoute from '../pages/PrivateRoute.jsx'
import Signup from '../pages/SignupPage.jsx'
import { useAuth } from '../util/useAuth.js'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = ({ socket }) => {
  const { loginAuth } = useAuth()

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem('userId'))
    if (savedAuth?.token && savedAuth?.username) {
      loginAuth(savedAuth.token, savedAuth.username)
    }
  }, [loginAuth])

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat socket={socket} />
              </PrivateRoute>
            )}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
