import React, { useState } from 'react';
import { Button, Card, Col } from 'antd';
import PhoneModal from '../PhoneModal/PhoneModal';
import styles from './PhoneCard.module.css';

const { Meta } = Card;

function PhoneCard({ phone }) {
	const [isModalVisible, setIsModalVisible] = useState(false);

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
						<p>{ phone.Brand }</p>
						<p>{ phone.status }</p>
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
						{ phone.cpu }
					</p>
				)}
				{phone.gpu && (
					<p>
						<strong>GPU: </strong>
						{ phone.gpu }
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
						{ phone.os }
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
