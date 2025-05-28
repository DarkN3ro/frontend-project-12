import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken, clearUsername } from '../store/authSlice';

const Navigate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    dispatch(clearToken());
    dispatch(clearUsername());
    navigate('/login');
  };

  return (
      <nav className="shadow-sm navbar navbar-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
          <button onClick={handleLogout} className="btn btn-primary"> LogOut</button>
        </div>
      </nav>
  )
};

export default Navigate;