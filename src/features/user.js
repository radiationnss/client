import { createSlice } from '@reduxjs/toolkit';
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  token: null, // Add token to the state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(GOOGLE_AUTH_SUCCESS, (state, action) => {
      // Assuming action.payload contains user and token information
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(GOOGLE_AUTH_FAIL, (state) => {
      // Handle failure if needed
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
  },
});

export const { resetRegistered, setUser } = userSlice.actions;
export default userSlice.reducer;
