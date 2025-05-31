import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../util/useAuth.js';


const Header = () => {
const navigate = useNavigate()
const { isAuth, logout } = useAuth()

const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
      <nav className="shadow-sm navbar navbar-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
          {isAuth && <button onClick={handleLogout} className="btn btn-primary"> LogOut</button>}
        </div>
      </nav>
  )
};

export default Header