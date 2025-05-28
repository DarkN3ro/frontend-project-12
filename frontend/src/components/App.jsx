import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Channels from '../pages/MainChannels';
import Login from './LoginPage';
import PrivateRoute from './PrivateChatRoute';
import NotFound from './NotFound';
import Signup from './Signup';
import { useDispatch } from 'react-redux';
import { setToken, setUsername } from '../store/authSlice';
import Navigate from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem('userId'));
    if (savedAuth?.token && savedAuth?.username) {
      dispatch(setToken(savedAuth.token));
      dispatch(setUsername(savedAuth.username));
    }
  }, [dispatch]);
  
  return (
    <BrowserRouter>
    <div className="d-flex flex-column h-100">
    <Navigate />
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Channels />
            </PrivateRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;