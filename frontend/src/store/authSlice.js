import { createSlice } from '@reduxjs/toolkit';

const userData = JSON.parse(localStorage.getItem('userId')) || {};

const initialState = {
  token: userData.token || null,
  username: userData.username || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    clearUsername(state) {
      state.username = null;
    },
  },
});

export const { setToken, setUsername, clearToken, clearUsername } = authSlice.actions;
export default authSlice.reducer;