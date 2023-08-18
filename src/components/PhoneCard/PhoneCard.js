import { Card, Col } from 'antd';

import styles from './PhoneCard.module.css';

const { Meta } = Card;

function PhoneCard({ phone, onClick }) {
	return (
		<Col xs={12} sm={6} lg={4} xl={3}>
			<Card
				hoverable
				cover={<img src={phone.image} alt={phone.phone_name}/>}
				onClick={() => onClick(phone)}
			>
				<Meta
					className={styles.meta}
					title={phone.phone_name}
				/>
			</Card>
		</Col>
	);
}

export default PhoneCard;
