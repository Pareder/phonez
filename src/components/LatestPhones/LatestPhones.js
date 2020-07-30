import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row, Skeleton, Typography } from 'antd';
import { selectLatest, fetchLatest } from '../../app/slices/latestSlice';
import PhoneForm from '../PhoneForm/PhoneForm';
import PhoneCard from '../PhoneCard/PhoneCard';
import styles from './LatestPhones.module.css';

const { Title } = Typography;

function LatestPhones() {
	const dispatch = useDispatch();
	const latest = useSelector(selectLatest);
	const latestStatus = useSelector(state => state.latest.status);

	useEffect(() => {
		if ((!latest || !latest.length) && latestStatus === 'idle') {
			dispatch(fetchLatest());
		}
	}, []); // eslint-disable-line

	return (
		<>
			<PhoneForm />
			<Row gutter={[16, 16]} style={{ margin: 0 }}>
				{latest.map(phone => (
					<PhoneCard key={phone.DeviceName} phone={phone} />
				))}
				{latestStatus === 'loading' && [...new Array(3)].map((val, id) => (
					<Col key={id} xs={24} sm={12} lg={8}>
						<Card>
							<Skeleton key={id} loading={!latest.length} active />
						</Card>
					</Col>
				))}
				{(!latest || !latest.length) && (
					<Title className={styles.textCenter} level={3}>No phones found, please change filters</Title>
				)}
			</Row>
		</>
	);
}

export default LatestPhones;
