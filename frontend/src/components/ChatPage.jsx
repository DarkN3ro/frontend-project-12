import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../store/authSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1>Chat is Pending...</h1>
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Выйти
      </button>
    </div>
  )
};

export default ChatPage;