import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Chat from '../pages/ChatPage.jsx';
import Login from '../pages/LoginPage.jsx';
import Signup from '../pages/SignupPage.jsx';
import NotFound from '../pages/NotFound404Page.jsx';
import PrivateRoute from '../pages/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = ({socket}) => {

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
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;