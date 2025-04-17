import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadFileAPI } from './../api/uploadApi';

interface UploadState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UploadState = {
  loading: false,
  success: false,
  error: null,
};

export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await uploadFileAPI(file);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Upload failed');
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetUpload: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
