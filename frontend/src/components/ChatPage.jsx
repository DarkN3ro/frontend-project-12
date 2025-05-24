import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken, clearUsername } from '../store/authSlice';
import MainChannels from '../pages/MainChannels.jsx';
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

  const [channelContent, setContent] = useState([]);
    useEffect(() => {
    const fetchContent = async () => {
      const dataRes = await axios.get(routes.dataPath(), {headers: getAuthHeader()});
      setContent(dataRes.data)
      };
  
        fetchContent();
    }, []);

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