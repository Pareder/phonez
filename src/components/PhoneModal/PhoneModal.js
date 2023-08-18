import { useEffect } from 'react';
import { Button, Carousel, List, Modal, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDetails, selectDetailsBySlug, selectStatus } from 'store/slices/detailsSlice';

import getDataSource from './getDataSource';
import styles from './PhoneModal.module.css';

const { Item } = List;

function PhoneModal({ phone, onChange }) {
	const dispatch = useDispatch();
	const details = useSelector(selectDetailsBySlug(phone?.slug));
	const status = useSelector(selectStatus);

	useEffect(() => {
		if (phone?.slug && !details) {
			dispatch(fetchDetails(phone.slug));
		}
	}, [phone?.slug, details, dispatch]);

	return (
		<Modal
			className={styles.modal}
			open={Boolean(phone)}
			title={<p className={styles.title}>{phone?.phone_name}</p>}
			onOk={() => onChange(null)}
			onCancel={() => onChange(null)}
			footer={[
				<Button key="close" type="primary" onClick={() => onChange(null)}>Close</Button>,
			]}
		>
			{status === 'loading' && (
				<div className={styles.loader}>
					<Spin/>
				</div>
			)}
			{details && (
				<>
					{Boolean(details.phone_images?.length) && (
						<Carousel autoplay>
							{details.phone_images.map(image => (
								<img key={image} src={image} alt={phone.phone_name} className={styles.image}/>
							))}
						</Carousel>
					)}
					<List
						dataSource={getDataSource(details)}
						renderItem={item => (
							<Item>
								<Item.Meta
									title={item.title}
									description={item.description}
								/>
							</Item>
						)}
					/>
				</>
			)}
		</Modal>
	);
}

export default PhoneModal;
