import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row, Skeleton, Typography } from 'antd';

import { fetchLatest, selectFilters, selectLatest, selectStatus } from 'store/slices/latestSlice';

import PhoneForm from '../PhoneForm';
import PhoneCard from '../PhoneCard';
import PhoneModal from '../PhoneModal';
import styles from './LatestPhones.module.css';

const { Title } = Typography;

function LatestPhones() {
	const [openedPhone, setOpenedPhone] = useState(null);
	const dispatch = useDispatch();
	const latest = useSelector(selectLatest);
	const filters = useSelector(selectFilters);
	const status = useSelector(selectStatus);
	const isLoading = status === 'loading';

	useEffect(() => {
		if (!latest?.length && status === 'idle') {
			dispatch(fetchLatest());
		}
	}, []); // eslint-disable-line

	const data = latest.filter(phone => phone.phone_name.toLowerCase().includes(filters.search.toLowerCase()));

	return (
		<>
			<PhoneForm />
			<Row gutter={[32, 32]}>
				{isLoading && [...new Array(8)].map((val, id) => (
					<Col key={id} xs={12} sm={6} lg={4} xl={3}>
						<Card>
							<Skeleton key={id} loading active />
						</Card>
					</Col>
				))}
				{!isLoading && data.map(phone => (
					<PhoneCard key={phone.slug} phone={phone} onClick={setOpenedPhone} />
				))}
				{!isLoading && !data?.length && (
					<Title className={styles.center} level={3}>No phones found, please change filters</Title>
				)}
			</Row>
			<PhoneModal
				phone={openedPhone}
				onChange={setOpenedPhone}
			/>
		</>
	);
}

export default LatestPhones;
