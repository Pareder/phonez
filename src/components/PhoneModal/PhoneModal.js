import React from 'react';
import { Button, List, Modal } from 'antd';
import categories from './categories';
import styles from './PhoneModal.module.css';

const { Item } = List;

function PhoneModal({ visible, phone, onChange }) {
	return (
		<Modal
			className={styles.modal}
			visible={visible}
			title={phone.DeviceName}
			onOk={onChange.bind(null, false)}
			onCancel={onChange.bind(null, false)}
			footer={[
				<Button key="close" type="primary" onClick={onChange.bind(null, false)}>Close</Button>
			]}
		>
			{categories.map(({ header, props }) => (
				<List key={header}	header={<strong>{ header }</strong>} size="small">
					{props.map(prop => {
						const propValue = typeof prop === 'string' ? phone[prop] : prop(phone);
						return propValue && <Item key={propValue}>{ propValue }</Item>;
					})}
				</List>
			))}
		</Modal>
	);
}

export default PhoneModal;
