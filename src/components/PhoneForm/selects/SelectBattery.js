import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { filtersSelector, selectBatteries } from '../../../app/slices/latestSlice';

function SelectBattery({ onChange }) {
	const { battery } = useSelector(filtersSelector);
	const batteries = useSelector(selectBatteries);

	return (
		<Select
			allowClear
			placeholder="Select battery mAh"
			value={battery || null}
			options={batteries.map(battery => ({ label: battery, value: battery }))}
			onChange={value => onChange({ battery: value || '' })}
		/>
	);
}

export default SelectBattery;
