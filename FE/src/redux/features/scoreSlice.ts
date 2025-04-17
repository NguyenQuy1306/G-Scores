import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/scoreApi";
import { ScoreState, Score } from "../../types/score.types";  

const initialState: ScoreState = {
  currentScore: null,
  error: null,
  loading: false,
};

export const getScoreByRegistration = createAsyncThunk<Score, string, { rejectValue: string }>(
  "scores/getByRegistration",
  async (registrationNumber, { rejectWithValue }) => {
    try {
      const data = await api.getScoreByRegistration(registrationNumber);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);

export const scoreSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    clearCurrentScore: (state) => {
      state.currentScore = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScoreByRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScoreByRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScore = action.payload;
      })
      .addCase(getScoreByRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Đã xảy ra lỗi";
      });
  },
});

export const { clearCurrentScore } = scoreSlice.actions;
export default scoreSlice.reducer;
