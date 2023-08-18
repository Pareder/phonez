import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Input } from 'antd';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';

import {
	DEFAULT_FILTERS,
	fetchLatest,
	selectFilters,
	setFilters,
} from 'store/slices/latestSlice';

import SelectBrand from './SelectBrand';
import styles from './PhoneForm.module.css';

function PhoneForm() {
	const [form] = Form.useForm();
	const { search } = useSelector(selectFilters);
	const dispatch = useDispatch();

	const onChange = filters => {
		dispatch(setFilters(filters));
	};

	const clear = () => {
		dispatch(setFilters(DEFAULT_FILTERS));
		dispatch(fetchLatest());
	};

	return (
		<Form
			layout="inline"
			size="large"
			form={form}
			onValuesChange={onChange}
		>
			<Col xs={24} sm={12}>
				<Form.Item name="search" className={styles.item}>
					<Input
						placeholder="Type phone name"
						prefix={<SearchOutlined />}
						value={search}
					/>
				</Form.Item>
			</Col>
			<Col xs={24} sm={12}>
				<Form.Item name="brand" className={styles.item}>
					<SelectBrand />
				</Form.Item>
			</Col>
			<Button
				className={styles.btn}
				type="primary"
				icon={<ClearOutlined />}
				onClick={clear}
			>
				Clear filters
			</Button>
		</Form>
	);
}

export default PhoneForm;
