import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken, clearUsername } from '../store/authSlice';
import MainChannels from '../pages/MainChannels.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    dispatch(clearToken());
    dispatch(clearUsername());
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat </a>
          <button onClick={handleLogout} className="btn btn-primary"> LogOut</button>
        </div>
      </nav>
      <MainChannels/>
    </div>
  )
};

export default ChatPage;