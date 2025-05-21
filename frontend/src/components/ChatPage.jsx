import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { getAuthHeader } from '../utils/authHeader';


const ChatPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: getAuthHeader(),
        });
        setContent(data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1>Chat is Pending...</h1>
      {content && <p>{JSON.stringify(content)}</p>}
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Выйти
      </button>
    </div>
  )
};

export default ChatPage;