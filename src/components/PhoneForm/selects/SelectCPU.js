import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { filtersSelector, selectCPU } from '../../../app/slices/latestSlice';
import { capitalize } from '../../../utils/utils';

function SelectCPU({ onChange }) {
	const { cpu } = useSelector(filtersSelector);
	const cpus = useSelector(selectCPU);

	return (
		<Select
			allowClear
			placeholder="Select CPU"
			value={cpu || null}
			options={cpus.map(cpu => ({ label: capitalize(cpu), value: cpu.toLowerCase() }))}
			onChange={value => onChange({ cpu: value || '' })}
		/>
	);
}

export default SelectCPU;
