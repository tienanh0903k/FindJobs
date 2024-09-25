import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Col, Card, Collapse, Switch } from 'antd';
import { useAppSelector } from '@/hook/useSelector';
import { useDispatch } from 'react-redux';
import { resetCurrentRole } from '@/redux/reducers/role-slice';
import { getMethodColor } from '@/lib/helper';

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
	const dispatch = useDispatch();

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
	//console.log("role", singleRole);
	console.log('list permision', permissionList);
	return (
		<Modal
			title={singleRole?._id ? 'Sửa Quyền' : 'Thêm Quyền'}
			open={visible}
			afterClose={() => {
				form.resetFields();
				dispatch(resetCurrentRole({}));
			}}
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
					label="Mô tả"
					rules={[{ required: true, message: 'Vui lòng chọn phương thức!' }]}
				>
					<Input />
				</Form.Item>
				<Card size="small" bordered={false}>
					<Collapse>
						<Collapse.Panel header="Quyền API" key="1">
							{permissionList?.map((item: any, moduleIndex: number) => (
								<div key={moduleIndex}>
									<Collapse>
										<Collapse.Panel
											header={`Quyền API cho ${item.module}`}
											key={`module-${moduleIndex}`}
										>
											{item.permissions.map(
												(permission: any, permissionIndex: number) => (
													<Form.Item
														label={permission.name} // Sử dụng tên quyền làm nhãn
														key={`permission-${moduleIndex}-${permissionIndex}`} // Tạo key duy nhất
														name={permission.key} // Sử dụng key của quyền
														valuePropName="checked"
													>
														<div
															style={{
																display: 'flex',
																alignItems: 'center',
															}}
														>
															<span
																style={{
																	fontWeight: 'bold',
																	marginRight: '8px',
																	color: getMethodColor(permission.method)
																}}
															>
																{permission.method}
															</span>{' '}
															<span style={{ marginRight: '8px' }}>
																{permission.apiPath}
															</span>
															<Switch
																defaultChecked={
																	permission.defaultChecked
																}
															/>
														</div>
													</Form.Item>
												),
											)}
										</Collapse.Panel>
									</Collapse>
								</div>
							))}
						</Collapse.Panel>
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
