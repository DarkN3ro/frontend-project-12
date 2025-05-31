import { useDispatch } from 'react-redux';
import { setToken, setUsername } from '../store/authSlice';
import React, { useEffect }  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Chat from '../pages/ChatPage';
import Login from '../pages/LoginPage';
import Signup from '../pages/SignupPage';
import NotFound from '../pages/NotFound404Page';
import PrivateRoute from '../pages/PrivateRoute';


const App = ({socket}) => {
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
    <Header />
      <Routes>
        <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Chat socket={socket}/>
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