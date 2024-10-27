// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import languageReducer from "./languageSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    user: userReducer, // Add the user slice to the store
  },
});

export default store;
