import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userId');
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