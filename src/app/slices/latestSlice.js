import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import API from '../../api';
import filterFormatters from './config/filterFormatters';

const getSavedLatest = () => {
	const phones = JSON.parse(localStorage.getItem('phones'));
	if (!phones) {
		return [];
	}

	// One weekend ago
	if (phones.date < new Date().setDate(new Date().getDate() - 7)) {
		return [];
	}

	return phones.latest;
};

const initialState = {
	latest: getSavedLatest(),
	status: 'idle',
	error: null,
	filters: {
		search: '',
		brand: '',
		cpu: '',
		gpu: '',
		battery: '',
		os: ''
	},
	filtersOrder: []
};

export const fetchLatest = createAsyncThunk('latest/fetchLatest', async options => {
	return await API.createFrom().getLatest(options);
});

const latestSlice = createSlice({
	name: 'latest',
	initialState,
	reducers: {
		setFilters(state, action) {
			for (const [filterName, filterValue] of Object.entries(action.payload)) {
				state.filters[filterName] = filterValue;

				if (filterValue) {
					state.filtersOrder.push(filterName);
				} else {
					const filterIndex = state.filtersOrder.findIndex(filter => filter === filterName);
					if (filterIndex !== -1) {
						state.filtersOrder.splice(filterIndex, 1);
					}
				}
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
			localStorage.setItem('phones', JSON.stringify({
				latest: action.payload,
				date: Date.now()
			}));
		},
		[fetchLatest.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});

export const { setFilters } = latestSlice.actions;

const filterLatest = (latest, filters, filtersOrder) => {
	return latest.filter(phone => {
		for (const filter of filtersOrder) {
			if (filtersOrder.includes(filter)
				&& filters[filter]
				&& filterFormatters[filter].formatter(phone[filterFormatters[filter].value])(filters)) {
				return false;
			}
		}

		return true;
	})
};

const filterFiltersOrder = (filterName, filtersOrder) => {
	const newFiltersOrder = [];
	for (const filter of filtersOrder) {
		if (filter === filterName) {
			break;
		}

		newFiltersOrder.push(filter);
	}

	return newFiltersOrder;
};

const latestSelector = state => state.latest.latest;
export const filtersSelector = state => state.latest.filters;
const filtersOrderSelector = state => state.latest.filtersOrder;

export const selectLatest = createSelector(
	latestSelector,
	filtersSelector,
	filtersOrderSelector,
	(latest, filters, filtersOrder) => filterLatest(latest, filters, filtersOrder)
);

export const selectBrands = createSelector(
	latestSelector,
	filtersSelector,
	filtersOrderSelector,
	(latest, filters, filtersOrder) => {
		const newFiltersOrder = filterFiltersOrder('brand', filtersOrder);
		const newLatest = filterLatest(latest, filters, newFiltersOrder);

		return [...newLatest.reduce((set, phone) => {
			if (phone.Brand) {
				set.add(phone.Brand);
			}

			return set;
		}, new Set())];
	}
);

export const selectCPU = createSelector(
	latestSelector,
	filtersSelector,
	filtersOrderSelector,
	(latest, filters, filtersOrder) => {
		const newFiltersOrder = filterFiltersOrder('cpu', filtersOrder);
		const newLatest = filterLatest(latest, filters, newFiltersOrder);

		return [...newLatest.reduce((set, phone) => {
			if (phone.cpu) {
				set.add(phone.cpu);
			}

			return set;
		}, new Set())];
	}
);

export const selectGPU = createSelector(
	latestSelector,
	filtersSelector,
	filtersOrderSelector,
	(latest, filters, filtersOrder) => {
		const newFiltersOrder = filterFiltersOrder('gpu', filtersOrder);
		const newLatest = filterLatest(latest, filters, newFiltersOrder);

		return [...newLatest.reduce((set, phone) => {
			const gpu = phone.gpu?.match(/^\S*/);
			if (gpu) {
				set.add(gpu[0]);
			}

			return set;
		}, new Set())];
	}
);

export const selectBatteries = createSelector(
	latestSelector,
	filtersSelector,
	filtersOrderSelector,
	(latest, filters, filtersOrder) => {
		const newFiltersOrder = filterFiltersOrder('battery', filtersOrder);
		const newLatest = filterLatest(latest, filters, newFiltersOrder);

		return [...newLatest.reduce((set, phone) => {
			const battery = phone.battery_c?.match(/\d+/);
			if (battery) {
				set.add(battery[0]);
			}

			return set;
		}, new Set())];
	}
);

export const selectOS = createSelector(
	latestSelector,
	filtersSelector,
	filtersOrderSelector,
	(latest, filters, filtersOrder) => {
		const newFiltersOrder = filterFiltersOrder('os', filtersOrder);
		const newLatest = filterLatest(latest, filters, newFiltersOrder);

		return [...newLatest.reduce((set, phone) => {
			if (phone.os) {
				set.add(phone.os);
			}

			return set;
		}, new Set())];
	}
);

export default latestSlice.reducer;
