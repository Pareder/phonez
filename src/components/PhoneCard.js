import React from 'react';
import { Card, Col } from 'antd';

function PhoneCard({phone}) {
	return (
		<Col span={8}>
			<Card title={phone.DeviceName} hoverable>
				<p>{phone.Brand}</p>
			</Card>
		</Col>
	);
}

export default PhoneCard;
