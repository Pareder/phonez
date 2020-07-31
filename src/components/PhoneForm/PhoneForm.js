import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
	filtersSelector,
	setFilters,
} from '../../app/slices/latestSlice';
import styles from './PhoneForm.module.css';
import SelectBrand from './selects/SelectBrand';
import SelectCPU from './selects/SelectCPU';
import SelectGPU from './selects/SelectGPU';
import SelectBattery from './selects/SelectBattery';
import SelectOS from './selects/SelectOS';

function PhoneForm() {
	const [form] = Form.useForm();
	const { search } = useSelector(filtersSelector);
	const dispatch = useDispatch();

	const onChange = filters => {
		dispatch(setFilters(filters));
	};

	return (
		<Form
			layout="inline"
			size="large"
			className={styles.form}
			form={form}
			onValuesChange={onChange}
		>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="search" className={styles.form__item}>
					<Input
						placeholder="Type phone name"
						prefix={<SearchOutlined />}
						value={search}
					/>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="brand" className={styles.form__item}>
					<SelectBrand onChange={onChange} />
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="cpu" className={styles.form__item}>
					<SelectCPU onChange={onChange} />
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="gpu" className={styles.form__item}>
					<SelectGPU onChange={onChange} />
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="battery" className={styles.form__item}>
					<SelectBattery onChange={onChange} />
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="os" className={styles.form__item}>
					<SelectOS onChange={onChange} />
				</Form.Item>
			</Col>
		</Form>
	);
}

export default PhoneForm;
