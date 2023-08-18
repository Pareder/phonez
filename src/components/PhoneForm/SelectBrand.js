import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

import { fetchBrands, selectBrands } from 'store/slices/brandsSlice';
import { fetchLatestByBrand, selectFilters } from 'store/slices/latestSlice';

function SelectBrand() {
	const dispatch = useDispatch();
	const brands = useSelector(selectBrands);
	const { brand } = useSelector(selectFilters);

	const onChange = value => {
		dispatch(fetchLatestByBrand(value));
	};

	useEffect(() => {
		if (!brands?.length) {
			dispatch(fetchBrands());
		}
	}, [brands, dispatch]);

	return (
		<Select
			allowClear
			placeholder="Select brand"
			value={brand || null}
			options={brands}
			fieldNames={{
				label: 'brand_name',
				value: 'brand_slug',
			}}
			onChange={onChange}
		/>
	);
}

export default SelectBrand;
