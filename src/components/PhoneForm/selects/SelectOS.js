import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { filtersSelector, selectOS } from '../../../app/slices/latestSlice';
import { capitalize } from '../../../utils/utils';

function SelectOS({ onChange }) {
	const { os } = useSelector(filtersSelector);
	const oss = useSelector(selectOS);

	return (
		<Select
			allowClear
			placeholder="Select OS"
			value={os || null}
			options={oss.map(os => ({ label: capitalize(os), value: os.toLowerCase() }))}
			onChange={value => onChange({ os: value || '' })}
		/>
	);
}

export default SelectOS;
