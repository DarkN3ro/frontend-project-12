/* eslint-disable import/prefer-default-export */
import { useSelector, useDispatch } from 'react-redux';
import {
  setToken, setUsername, clearToken, clearUsername,
} from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);

  // eslint-disable-next-line no-shadow
  const login = (token, username) => {
    localStorage.setItem('userId', JSON.stringify({ token, username }));
    dispatch(setToken(token));
    dispatch(setUsername(username));
  };

  const logout = () => {
    localStorage.removeItem('userId');
    dispatch(clearToken());
    dispatch(clearUsername());
  };

  const isAuth = Boolean(token);

  return {
    token, username, login, logout, isAuth,
  };
};
