// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Input, Button, Space, Col, Card, Collapse, Switch } from 'antd';
// import { useAppSelector } from '@/hook/useSelector';
// import { useDispatch } from 'react-redux';
// import { resetCurrentRole } from '@/redux/reducers/role-slice';
// import { getMethodColor } from '@/lib/helper';
// import roleApi from '@/api/roleApi';

// const { Panel } = Collapse;

// interface IModalProps {
// 	visible: boolean;
// 	onClose: () => void;
// 	onSave: (role: any) => void;
// 	permissionList: { module: string; permissions: any[] }[];
// }

// const ModalRole = ({ visible, onClose, onSave, permissionList }: IModalProps) => {
// 	const [form] = Form.useForm();
// 	const singleRole = useAppSelector((state) => state.roles.currentRole);
// 	const dispatch = useDispatch();

// 	const [permissions, setPermissions] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);

// 	//console.log('singleRole', singleRole._id);

// 	// useEffect(() => {
// 	// 	if (permission) {
// 	// 		form.setFieldsValue(permission);
// 	// 	} else {
// 	// 		form.resetFields();
// 	// 	}
// 	// }, [permission, form]);

// 	useEffect(() => {
// 		if (visible && singleRole._id) {
// 		  fetchRolePermissions(singleRole._id); 
// 		}
// 	  }, [visible, singleRole._id]);

// 	  const fetchRolePermissions = async (roleId: string) => {
// 		setLoading(true); 
// 		try {
// 		  const response = await roleApi.getRoleForAdmin(roleId);
// 		  setPermissions(response.data.permissions);
// 		  console.log('response.data.permissions', response.data.permissions);
// 		} catch (error) {
// 		  console.error('Error fetching permissions:', error);
// 		} finally {
// 		  setLoading(false); 
// 		}
// 	  };

// 	const handleSave = () => {
// 		form.validateFields()
// 			.then((values) => {
// 				onSave(values);
// 				form.resetFields();
// 			})
// 			.catch((info) => {
// 				console.log('Validate Failed:', info);
// 			});
// 	};
// 	//console.log("role", singleRole);
// 	console.log('list permision', permissionList);
// 	return (
// 		<Modal
// 			title={singleRole?._id ? 'Sửa Quyền' : 'Thêm Quyền'}
// 			open={visible}
// 			afterClose={() => {
// 				form.resetFields();
// 				dispatch(resetCurrentRole({}));
// 			}}
// 			onCancel={onClose}
// 			footer={null}
// 		>
// 			<Form form={form} layout="vertical">
// 				<Form.Item
// 					name="name"
// 					label="Tên Quyền"
// 					rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
// 				>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item
// 					name="method" 
// 					label="Mô tả"
// 					rules={[{ required: true, message: 'Vui lòng chọn phương thức!' }]}
// 				>
// 					<Input />
// 				</Form.Item>
// 				<Card size="small" bordered={false}>
// 					<Collapse>
// 						<Collapse.Panel header="Quyền API" key="1">
// 							{permissionList?.map((item: any, moduleIndex: number) => (
// 								<div key={moduleIndex}>
// 									<Collapse>
// 										<Collapse.Panel
// 											header={`Quyền API cho ${item.module}`}
// 											key={`module-${moduleIndex}`}
// 										>
// 											{item.permissions.map(
// 												(permission: any, permissionIndex: number) => (
// 													<Form.Item
// 														label={permission.name} // Sử dụng tên quyền làm nhãn
// 														key={`permission-${moduleIndex}-${permissionIndex}`} // Tạo key duy nhất
// 														name={permission.key} // Sử dụng key của quyền
// 														valuePropName="checked"
// 													>
// 														<div
// 															style={{
// 																display: 'flex',
// 																alignItems: 'center',
// 															}}
// 														>
// 															<span
// 																style={{
// 																	fontWeight: 'bold',
// 																	marginRight: '8px',
// 																	color: getMethodColor(permission.method)
// 																}}
// 															>
// 																{permission.method}
// 															</span>{' '}
// 															<span style={{ marginRight: '8px' }}>
// 																{permission.apiPath}
// 															</span>
// 															<Switch
// 																defaultChecked={
// 																	permission.defaultChecked
// 																}
// 															/>
// 														</div>
// 													</Form.Item>
// 												),
// 											)}
// 										</Collapse.Panel>
// 									</Collapse>
// 								</div>
// 							))}
// 						</Collapse.Panel>
// 					</Collapse>
// 				</Card>

// 				<Form.Item>
// 					<Space>
// 						<Button onClick={onClose}>Hủy</Button>
// 						<Button type="primary" onClick={handleSave}>
// 							Lưu
// 						</Button>
// 					</Space>
// 				</Form.Item>
// 			</Form>
// 		</Modal>
// 	);
// };

// export default ModalRole;


import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Space, Card, Collapse, Switch } from 'antd';
import { useAppSelector } from '@/hook/useSelector';
import { useDispatch } from 'react-redux';
import { resetCurrentRole } from '@/redux/reducers/role-slice';
import { getMethodColor } from '@/lib/helper';
import roleApi from '@/api/roleApi';

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

	const [permissions, setPermissions] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	// Khi modal mở và singleRole._id có giá trị, gọi API để lấy quyền
	useEffect(() => {
		if (visible && singleRole._id) {
			form.setFieldsValue({
				name: singleRole.name,
				permissions: singleRole.permissions,
			});
			fetchRolePermissions(singleRole._id);
		}
	}, [visible, singleRole._id]);

	// Hàm gọi API lấy quyền của role
	const fetchRolePermissions = async (roleId: string) => {
		setLoading(true);
		try {
			const response = await roleApi.getRoleForAdmin(roleId);
			setPermissions(response.data.permissions);
			console.log('response.data.permissions', response.data.permissions);
		} catch (error) {
			console.error('Error fetching permissions:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = () => {
		form
			.validateFields()
			.then((values) => {
				const {name, description} = values
				const selectedPermissions = permissions.map(permission => permission._id);

				// console.log('enabledPermissionIds', enabledPermissionIds);
				onSave({name, description, permissions: selectedPermissions});

				//onSave(values);
				form.resetFields();
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

// 	console.log('Switching....', permissions);
// 	Array(3) [ {…}, {…}, {…} ]
// ​
// 0: Object { _id: "66e86074c0ac5e57004e1216", name: "Lấy danh sách vai trò", apiPath: "/api/roles", … }
// ​
// 1: Object { _id: "66f41b30ccbbc6537b322266", name: "GET NGUOI DUNG", apiPath: "/api/user", … }
// ​
// 2: Object { _id: "66e8605ec0ac5e57004e1212", name: "Cập nhật người dùng", apiPath: "/api/updateuser", … }
// ​
// length: 3

	const handleSwitchChange = (checked: boolean, permissionId: string) => {
		// Cập nhật state permissions khi người dùng thay đổi trạng thái của switch
	setPermissions(prev => {
		if (checked) {
			return [
				...prev, {
					_id: permissionId,
				}
			]
		} else {
			return prev.filter((p:any) => p._id !== permissionId);
		}
	})
		//console.log(permissions.some((p: any) => p._id == permissionId));
	};

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
					label="Tên quyền"
					rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="description"
					label="Mô tả"
				>
					<Input />
				</Form.Item>

				<Card size="small" bordered={false}>
					<Collapse>
						<Panel header="Quyền API" key="1">
							{permissionList?.map((item: any, moduleIndex: number) => (
								<div key={moduleIndex}>
									<Collapse>
										<Panel header={`Quyền API cho ${item.module}`} key={`module-${moduleIndex}`}>
											{item.permissions.map((permission: any, permissionIndex: number) => (
												<Form.Item
													label={permission.name}
													key={`permission-${moduleIndex}-${permissionIndex}`}
													name={`permissions[${permission._id}]`}
													valuePropName="checked"
												>
													<div style={{ display: 'flex', alignItems: 'center' }}>
														<span
															style={{
																fontWeight: 'bold',
																marginRight: '8px',
																color: getMethodColor(permission.method),
															}}
														>
															{permission.method}
														</span>
														<span style={{ marginRight: '8px' }}>{permission.apiPath}</span>
														<Switch
															checked={permissions.some((p: any) => p._id == permission._id)}
															onChange={(checked) => handleSwitchChange(checked, permission._id)}
														/>
													</div>
												</Form.Item>
											))}
										</Panel>
									</Collapse>
								</div>
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
