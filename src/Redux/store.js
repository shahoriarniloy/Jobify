import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import languageReducer from "./languageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
export default store;
