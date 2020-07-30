import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

const initialState = {
	latest: JSON.parse(localStorage.getItem('phones')) || [],
	status: 'idle',
	error: null,
	filters: {
		search: '',
		brand: '',
		cpu: '',
		gpu: '',
		battery: '',
		os: ''
	}
};

export const fetchLatest = createAsyncThunk('latest/fetchLatest', async options => {
	return await API.createFrom().getLatest(options);
});

const latestSlice = createSlice({
	name: 'latest',
	initialState,
	reducers: {
		setFilters(state, action) {
			state.filters = {
				...state.filters,
				...action.payload
			}
		}
	},
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

export const { setFilters } = latestSlice.actions;

export const selectLatest = state => state.latest.latest.filter(phone => {
	if (state.latest.filters.search
		&& !phone.DeviceName.toLowerCase().includes(state.latest.filters.search.toLowerCase())) {
		return false;
	}

	if (state.latest.filters.brand && (
		!phone.Brand || phone.Brand.toLowerCase() !== state.latest.filters.brand.toLowerCase()
	)) {
		return false;
	}

	if (state.latest.filters.cpu && (
		!phone.cpu || !phone.cpu.toLowerCase().includes(state.latest.filters.cpu.toLowerCase())
	)) {
		return false;
	}

	if (state.latest.filters.gpu && (
		!phone.gpu || !phone.gpu.toLowerCase().includes(state.latest.filters.gpu.toLowerCase())
	)) {
		return false;
	}

	if (state.latest.filters.battery && (
		!phone.battery_c || !phone.battery_c.includes(state.latest.filters.battery)
	)) {
		return false;
	}

	if (state.latest.filters.os && (
		!phone.os || !phone.os.toLowerCase().includes(state.latest.filters.os.toLowerCase())
	)) {
		return false;
	}

	return true;
});

export const selectBrands = state => [...state.latest.latest.reduce((set, phone) => {
	if (phone.Brand) {
		set.add(phone.Brand);
	}

	return set;
}, new Set())];

export const selectCPU = state => [...state.latest.latest.reduce((set, phone) => {
	const cpu = phone.cpu?.match(/^\S*/);
	if (cpu) {
		set.add(cpu[0]);
	}

	return set;
}, new Set())];

export const selectGPU = state => [...state.latest.latest.reduce((set, phone) => {
	const gpu = phone.gpu?.match(/^\S*/);
	if (gpu) {
		set.add(gpu[0]);
	}

	return set;
}, new Set())];

export const selectBatteries = state => [...state.latest.latest.reduce((set, phone) => {
	const battery = phone.battery_c?.match(/\d+/);
	if (battery) {
		set.add(battery[0]);
	}

	return set;
}, new Set())];

export const selectOS = state => [...state.latest.latest.reduce((set, phone) => {
	const os = phone.os?.match(/^\S*/);
	if (os) {
		set.add(os[0]);
	}

	return set;
}, new Set())];

export const selectFilters = state => state.latest.filters;

export default latestSlice.reducer;
