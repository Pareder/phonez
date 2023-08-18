import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'api';

const initialState = {
  details: {},
  status: 'idle',
  error: null,
};

export const fetchDetails = createAsyncThunk('details/fetchDetails', async slug => {
  return await API.create().getDevice(slug);
});

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = {
          ...state.details,
          [action.meta.arg]: action.payload.data,
        };
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error?.message || 'Something went wrong';
      });
  },
});

export const selectDetailsBySlug = slug => state => state.details.details[slug];

export const selectStatus = state => state.details.status;

export default detailsSlice.reducer;
