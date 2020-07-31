import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { filtersSelector, selectGPU } from '../../../app/slices/latestSlice';
import { capitalize } from '../../../utils/utils';

function SelectGPU({ onChange }) {
	const { gpu } = useSelector(filtersSelector);
	const gpus = useSelector(selectGPU);

	return (
		<Select
			allowClear
			placeholder="Select GPU"
			value={gpu || null}
			options={gpus.map(gpu => ({ label: capitalize(gpu), value: gpu.toLowerCase() }))}
			onChange={value => onChange({ gpu: value || '' })}
		/>
	);
}

export default SelectGPU;
