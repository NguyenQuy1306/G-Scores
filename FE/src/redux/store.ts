import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './features/scoreSlice';
import studentReducer from './features/studentSlice';
import reportReducer from './features/reportSlice';
import uploadReducer from './features/uploadSlice';

export const store = configureStore({
  reducer: {
    scores: scoreReducer,
    students: studentReducer,
    reports: reportReducer,
    upload: uploadReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;