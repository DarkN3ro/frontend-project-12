import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './ChatPage';
import Login from './LoginPage';
import PrivateRoute from './PrivateChatRoute';
import NotFound from './NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;