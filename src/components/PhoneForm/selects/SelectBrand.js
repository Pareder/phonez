import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { filtersSelector, selectBrands } from '../../../app/slices/latestSlice';
import { capitalize } from '../../../utils/utils';

function SelectBrand({ onChange }) {
	const { brand } = useSelector(filtersSelector);
	const brands = useSelector(selectBrands);

	return (
		<Select
			allowClear
			placeholder="Select brand"
			value={brand || null}
			options={brands.map(brand => ({ label: capitalize(brand), value: brand.toLowerCase() }))}
			onChange={value => onChange({ brand: value || '' })}
		/>
	);
}

export default SelectBrand;
