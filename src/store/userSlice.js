import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    adminIsLoggedIn: false,
  },
  reducers: {
    loginUser(state, action) {
      const { email } = action.payload;

      if (email === process.env.REACT_APP_ADMIN_EMAIL) {
        state.adminIsLoggedIn = true;
      } else {
        state.adminIsLoggedIn = false;
      }
    },
    logoutUser(state, action) {
      state.adminIsLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
