// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedUser: null, // Initialize with null or any default value
  },
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload; // Set the logged user data
    },
    clearLoggedUser: (state) => {
      state.loggedUser = null; // Clear the logged user data
    },
  },
});

export const { setLoggedUser, clearLoggedUser } = userSlice.actions;
export default userSlice.reducer;
