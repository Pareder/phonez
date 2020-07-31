const filterFormatters = {
	search: {
		value: 'DeviceName',
		formatter: value => filters => !value || !value.toLowerCase().includes(filters.search.toLowerCase())
	},
	brand: {
		value: 'Brand',
		formatter: value => filters => !value || value.toLowerCase() !== filters.brand.toLowerCase()
	},
	cpu: {
		value: 'cpu',
		formatter: value => filters =>!value || value.toLowerCase() !== filters.cpu.toLowerCase()
	},
	gpu: {
		value: 'gpu',
		formatter: value => filters =>!value || !value.toLowerCase().includes(filters.gpu.toLowerCase())
	},
	battery: {
		value: 'battery_c',
		formatter: value => filters => !value || !value.includes(filters.battery)
	},
	os: {
		value: 'os',
		formatter: value => filters => {
			return !value || value.toLowerCase() !== filters.os.toLowerCase()
		}
	}
};

export default filterFormatters;
