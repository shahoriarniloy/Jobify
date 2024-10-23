import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosSecure from "../Hooks/UseAxiosSecure";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchUserByEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/user/email`, {
        params: { email },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
