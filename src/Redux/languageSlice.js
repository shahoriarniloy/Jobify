import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

const initialState = {
  language: localStorage.getItem("i18nextLng") || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(state.language); // Change language in i18next
      localStorage.setItem("i18nextLng", state.language); // Store in localStorage
    },
  },
});

export const { switchLanguage } = languageSlice.actions;
export default languageSlice.reducer;
