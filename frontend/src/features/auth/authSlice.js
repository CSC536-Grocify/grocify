import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,
    username: null,
    token: null,
  },
  reducers: {
    // setCredentials: (state, action) => {
    //   const { user, accessToken } = action.payload;
    //   state.user = user;
    //   state.token = accessToken;
    // },
    setCredentials: (state, action) => {
      const { email, username } = action.payload;
      state.email = email;
      state.username = username;
    },
    logOut: (state, action) => {
      state.email = null;
      state.username = null;
      state.token = null;
    }
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
