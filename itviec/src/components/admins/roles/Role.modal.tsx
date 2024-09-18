import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Col, Card, Collapse, Switch } from 'antd';
import { useAppSelector } from '@/hook/useSelector';

const { Panel } = Collapse;

interface IModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (role: any) => void;
	permissionList: { module: string; permissions: any[] }[];
}

const ModalRole = ({ visible, onClose, onSave, permissionList }: IModalProps) => {
	const [form] = Form.useForm();
	const singleRole = useAppSelector((state) => state.roles.currentRole);

	// useEffect(() => {
	// 	if (permission) {
	// 		form.setFieldsValue(permission);
	// 	} else {
	// 		form.resetFields();
	// 	}
	// }, [permission, form]);

	const handleSave = () => {
		form.validateFields()
			.then((values) => {
				onSave(values);
				form.resetFields();
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	return (
		<Modal
			title={singleRole ? 'Sửa Quyền' : 'Thêm Quyền'}
			open={visible}
			onCancel={onClose}
			footer={null}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					name="name"
					label="Tên Quyền"
					rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="method"
					label="Phương thức"
					rules={[{ required: true, message: 'Vui lòng chọn phương thức!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="apiPath"
					label="API Path"
					rules={[{ required: true, message: 'Vui lòng nhập API Path!' }]}
				>
					<Input />
				</Form.Item>

				<Card size="small" bordered={false}>
					<Collapse>
						<Panel header="Quyền API" key="1">
							{permissionList?.map((item: any, index: any) => (
								<Form.Item
									label={item?.module}
									key={index}
									name={item.key}
									valuePropName="checked"
								>
									<Switch defaultChecked={item.defaultChecked} />
								</Form.Item>
							))}
						</Panel>
					</Collapse>
				</Card>

				<Form.Item>
					<Space>
						<Button onClick={onClose}>Hủy</Button>
						<Button type="primary" onClick={handleSave}>
							Lưu
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalRole;
