import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/scoreApi";
import { ScoreState, Score } from "../../types/score.types";  

const initialState: ScoreState = {
  currentScore: null,
  error: null,
  loading: false,
};


export const getScoreByRegistration = createAsyncThunk<Score, string, { rejectValue: string }>(
  'scores/getScoreByRegistration',
  async (registrationNumber, { rejectWithValue }) => {
    try {
      const data = await api.getScoreByRegistration(registrationNumber);
      return data.payload;
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        return rejectWithValue('Không tìm thấy mã học sinh.');
      }
      return rejectWithValue('Đã xảy ra lỗi, vui lòng thử lại.');
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
