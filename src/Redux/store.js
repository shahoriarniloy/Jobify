import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import languageReducer from "./languageSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});
export default store;
