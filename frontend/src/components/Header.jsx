import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../util/useAuth.js';
import i18next from '../util/i18n.js';


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
          <Link className="navbar-brand" to="/">{i18next.t('navbar.chatName')}</Link>
          {isAuth && <button onClick={handleLogout} className="btn btn-primary">{i18next.t('navbar.logout')}</button>}
        </div>
      </nav>
  )
};

export default Header