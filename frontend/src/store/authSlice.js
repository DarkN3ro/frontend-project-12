import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: JSON.parse(localStorage.getItem('userId'))?.token || null,
  username: JSON.parse(localStorage.getItem('userId'))?.username || null,
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
  },
});

export const { setToken, setUsername, clearToken } = authSlice.actions;
export default authSlice.reducer;