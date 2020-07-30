import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
	selectBatteries,
	selectBrands,
	selectCPU,
	selectFilters,
	setFilters,
	selectGPU,
	selectOS
} from '../../app/slices/latestSlice';
import { capitalize } from '../../utils/utils';
import styles from './PhoneForm.module.css';

const { Option } = Select;

function PhoneForm() {
	const [form] = Form.useForm();
	const filters = useSelector(selectFilters);
	const brands = useSelector(selectBrands);
	const cpu = useSelector(selectCPU);
	const gpu = useSelector(selectGPU);
	const batteries = useSelector(selectBatteries);
	const os = useSelector(selectOS);
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
						value={filters.search}
					/>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="brand" className={styles.form__item}>
					<Select placeholder="Select brand" value={filters.brand}>
						<Option value="">All</Option>
						{brands.map(brand => brand && (
							<Option key={brand} value={brand.toLowerCase()}>{capitalize(brand)}</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="cpu" className={styles.form__item}>
					<Select placeholder="Select CPU" value={filters.cpu}>
						<Option value="">All</Option>
						{cpu.map(cpu => cpu && (
							<Option key={cpu} value={cpu.toLowerCase()}>{capitalize(cpu)}</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="gpu" className={styles.form__item}>
					<Select placeholder="Select GPU" value={filters.gpu}>
						<Option value="">All</Option>
						{gpu.map(gpu => gpu && (
							<Option key={gpu} value={gpu.toLowerCase()}>{capitalize(gpu)}</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="battery" className={styles.form__item}>
					<Select placeholder="Select battery mAh" value={filters.battery}>
						<Option value="">All</Option>
						{batteries.map(battery => battery && (
							<Option key={battery} value={battery}>{battery}</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12} lg={8}>
				<Form.Item name="os" className={styles.form__item}>
					<Select placeholder="Select OS" value={filters.os}>
						<Option value="">All</Option>
						{os.map(os => os && (
							<Option key={os} value={os.toLowerCase()}>{capitalize(os)}</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
		</Form>
	);
}

export default PhoneForm;
