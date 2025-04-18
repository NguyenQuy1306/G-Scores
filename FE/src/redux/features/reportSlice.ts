import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { SubjectLevelStats } from "../../types/report.types";
import { Student } from "../../types/student.types";
interface ReportState {
  statistics: SubjectLevelStats;
  subjectStatistics: SubjectLevelStats[]; 
  topStudents: Student[]; 
  error: string;
  loading: boolean;
}

const initialState: ReportState = {
  statistics: {
    subjectName: "Tổng quan", 
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
  },
  subjectStatistics: [],
  topStudents: [],
  error: "",
  loading: false,
};

export const getScoreStatistics = createAsyncThunk(
  "reports/getStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getScoreStatistics();
      return response.payload;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopStudents = createAsyncThunk(
  "reports/getTopStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTopStudentsByGroup("A", 10);
      return response.payload;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubjectStatistics = createAsyncThunk(
  "reports/getSubjectStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSubjectStatistics();  
      return response.data;  
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScoreStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getScoreStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload.overall;
        state.subjectStatistics = action.payload.bySubject;  
      })
      .addCase(getScoreStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSubjectStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubjectStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectStatistics = action.payload;
      })
      .addCase(getSubjectStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTopStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.topStudents = action.payload;
      })
      .addCase(getTopStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reportSlice.reducer;
