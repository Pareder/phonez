import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'antd';
import { selectLatest, fetchLatest } from '../app/slices/latestSlice';
import PhoneCard from './PhoneCard';

function LatestPhones() {
	const dispatch = useDispatch();
	const latest = useSelector(selectLatest);
	const latestStatus = useSelector(state => state.latest.status);

	useEffect(() => {
		if (latestStatus === 'idle') {
			dispatch(fetchLatest());
		}
	}, [latestStatus, dispatch]);

	return (
		<Row gutter={[16, 16]} style={{margin: 0}}>
			{latest.map(phone => (
				<PhoneCard key={phone.DeviceName} phone={phone}/>
			))}
		</Row>
	);
}

export default LatestPhones;
