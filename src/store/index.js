import { configureStore } from '@reduxjs/toolkit';

import brandsReducer from './slices/brandsSlice';
import detailsReducer from './slices/detailsSlice';
import latestReducer from './slices/latestSlice';

export default configureStore({
  reducer: {
    brands: brandsReducer,
    details: detailsReducer,
    latest: latestReducer,
  },
});
