import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from '../hooks';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}`};
  }

  return {};
}

const ChatPage = () => {
  const [content, setContent] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setContent(data);
    };

    fetchContent();
  }, []);

    return (
    <div className="p-5">
      <h1>Чат</h1>
      <p>{JSON.stringify(content)}</p>
      <button className="btn btn-outline-danger" onClick={auth.logOut}>Выйти</button>
    </div>
  );
};

export default ChatPage;