import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getScoreByRegistration = createAsyncThunk(
  "scores/getByRegistration",
  async (registrationNumber: string, { rejectWithValue }) => {
    try {
      const response = await api.getScoreByRegistration(registrationNumber);
      return response.payload;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    currentScore: null,
    error: "",
    loading: false,
  },
  reducers: {
    clearCurrentScore: (state) => {
      state.currentScore = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScoreByRegistration.pending, (state) => {
        state.loading = true;
        state.currentScore = null;
      })
      .addCase(getScoreByRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScore = action.payload;
      })
      .addCase(getScoreByRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentScore } = studentSlice.actions;
export default studentSlice.reducer;