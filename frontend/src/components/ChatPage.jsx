import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../store/authSlice';
import MainChannels from './MainChannels.jsx';
import routes from '../routes.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
  
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
  
    return {};
  };

  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
        setContent(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchContent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100">
    <div className="container mt-5">
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Выйти
      </button>
    </div>
      <MainChannels/>
    </div>
  )
};

export default ChatPage;