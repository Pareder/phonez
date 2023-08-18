import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'api';

const initialState = {
  brands: [],
  error: null,
};

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  return await API.create().getBrands();
});

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload.data;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.error = action?.error?.message || 'Something went wrong';
      });
  },
});

export const selectBrands = state => state.brands.brands;

export default brandsSlice.reducer;
