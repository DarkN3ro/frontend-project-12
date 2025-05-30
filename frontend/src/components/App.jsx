import { useDispatch } from 'react-redux';
import { setToken, setUsername } from '../store/authSlice';
import React, { useEffect }  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Chat from '../pages/ChatPage.jsx';
import Login from '../pages/LoginPage.jsx';
import Signup from '../pages/SignupPage.jsx';
import NotFound from '../pages/NotFound404Page.jsx';
import PrivateRoute from '../pages/PrivateRoute.jsx';


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