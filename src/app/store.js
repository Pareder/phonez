import { configureStore } from '@reduxjs/toolkit';
import latestReducer from './slices/latestSlice';

export default configureStore({
  reducer: {
    latest: latestReducer
  },
});
