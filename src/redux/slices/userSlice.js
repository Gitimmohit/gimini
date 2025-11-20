// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// declare all the initial values of the state
const initialState = {
  value: 0,
  access_token: "",
  refresh_token: "",
  user_details: {},
};

export const userSlice = createSlice({
  name: 'authinfo',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.user_details = action.payload;
    },

    // ⭐ RESET ALL USER DATA
    resetUser: (state) => {
      state.value = 0;
      state.access_token = "";
      state.refresh_token = "";
      state.user_details = {};
    },
  },
});

// Export actions
export const {
  increment,
  decrement,
  incrementByAmount,
  setAccessToken,
  setRefreshToken,
  setUserDetails,
  resetUser
} = userSlice.actions;

export default userSlice.reducer;
