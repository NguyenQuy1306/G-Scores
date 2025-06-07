import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './features/scoreSlice';
import reportReducer from './features/reportSlice';

export const store = configureStore({
  reducer: {
    scores: scoreReducer,
    reports: reportReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;