import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

const initialState = {
	latest: JSON.parse(localStorage.getItem('phones')) || [],
	status: 'idle',
	error: null
};

export const fetchLatest = createAsyncThunk('latest/fetchLatest', async options => {
	return await API.createFrom().getLatest(options);
});

const latestSlice = createSlice({
	name: 'latest',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchLatest.pending]: state => {
			state.status = 'loading';
		},
		[fetchLatest.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.latest = action.payload;
			localStorage.setItem('phones', JSON.stringify(action.payload));
		},
		[fetchLatest.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});

export const selectLatest = state => state.latest.latest;

export default latestSlice.reducer;
