import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'api';

export const DEFAULT_FILTERS = {
	search: '',
	brand: '',
};

const initialState = {
	latest: [],
	status: 'idle',
	error: null,
	filters: { ...DEFAULT_FILTERS },
};

export const fetchLatest = createAsyncThunk('latest/fetchLatest', async () => {
	return await API.create().getLatest();
});

export const fetchLatestByBrand = createAsyncThunk('latest/fetchLatestByBrand', async (brand, thunkAPI) => {
	thunkAPI.dispatch(setFilters({ brand }));
	return await API.create().getLatestByBrand(brand);
});

const latestSlice = createSlice({
	name: 'latest',
	initialState,
	reducers: {
		setFilters(state, action) {
			for (const [filterName, filterValue] of Object.entries(action.payload)) {
				state.filters[filterName] = filterValue;
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchLatest.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchLatest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.latest = action.payload;
			})
			.addCase(fetchLatest.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message || 'Something went wrong';
			})
			.addCase(fetchLatestByBrand.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchLatestByBrand.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.latest = action.payload;
			})
			.addCase(fetchLatestByBrand.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message || 'Something went wrong';
			});
	},
});

export const { setFilters } = latestSlice.actions;

export const selectLatest = state => state.latest.latest;
export const selectStatus = state => state.latest.status;
export const selectFilters = state => state.latest.filters;

export default latestSlice.reducer;
