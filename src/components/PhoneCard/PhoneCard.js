import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Col } from 'antd';
import PhoneModal from '../PhoneModal/PhoneModal';
import { setFilters } from '../../app/slices/latestSlice';
import styles from './PhoneCard.module.css';

const { Meta } = Card;

function PhoneCard({ phone }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const onButtonClick = filters => {
		dispatch(setFilters(filters));
	};

	return (
		<Col xs={24} sm={12} lg={8}>
			<Card
				hoverable
				title={ phone.DeviceName }
				actions={[
					<Button
						type="link"
						onClick={setIsModalVisible.bind(null, true)}
					>
						More
					</Button>
				]}
			>
				<Meta className={styles.meta} description={
					<>
						{phone.Brand && (
							<div>
								<Button
									className={styles.button}
									type="link"
									size="small"
									onClick={onButtonClick.bind(null, { brand: phone.Brand.toLowerCase() })}
								>
									{ phone.Brand }
								</Button>
							</div>
						)}
						{phone.status && <p>{ phone.status }</p>}
					</>
				} />
				{phone.size && (
					<p>
						<strong>Size: </strong>
						{ phone.size }
					</p>
				)}
				{phone.cpu && (
					<p>
						<strong>CPU: </strong>
						<Button
							className={styles.button}
							type="link"
							size="small"
							onClick={onButtonClick.bind(null, { cpu: phone.cpu.toLowerCase() })}
						>
							{ phone.cpu }
						</Button>
						&nbsp;{ phone.cpuInfo || '' }
					</p>
				)}
				{phone.gpu && (
					<p>
						<strong>GPU: </strong>
						<Button
							className={styles.button}
							type="link"
							size="small"
							onClick={onButtonClick.bind(null, { gpu: phone.gpu.toLowerCase() })}
						>
							{ phone.gpu }
						</Button>
					</p>
				)}
				{phone.battery_c && (
					<p>
						<strong>Battery: </strong>
						{ phone.battery_c }
					</p>
				)}
				{phone.os && (
					<p>
						<strong>OS: </strong>
						<Button
							className={styles.button}
							type="link"
							size="small"
							onClick={onButtonClick.bind(null, { os: phone.os.toLowerCase() })}
						>
							{ phone.os }
						</Button>
						&nbsp;{ phone.osInfo || '' }
					</p>
				)}
				{phone.price && (
					<p>
						<strong>Price: </strong>
						<span dangerouslySetInnerHTML={{ __html: phone.price }}/>
					</p>
				)}
			</Card>
			<PhoneModal visible={isModalVisible} phone={phone} onChange={setIsModalVisible} />
		</Col>
	);
}

export default PhoneCard;
