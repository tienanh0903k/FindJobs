
'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Switch,
  message,
} from 'antd';
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { ALL_PERMISSIONS, roles } from '@/constants';
import userApi from '@/api/userApi';
import { IUserType } from '@/app/types/interface';
import Access from '@/components/admins/permission/Access';

const { Search } = Input;
const { Option } = Select;

interface User {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
}

const AccountPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      key: '1',
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'a@example.com',
      role: 'admin',
      status: true,
      createdAt: '2024-09-25',
    },
    {
      key: '2',
      id: '2',
      name: 'Trần Thị B',
      email: 'b@example.com',
      role: 'user',
      status: false,
      createdAt: '2024-09-24',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // const [sortBy, setSortBy] = useState<'ascend' | 'descend'>('descend');
  const [activeUser, setActiveUser] = useState<any>(undefined);
  const [sortBy, setSortBy] = useState<'ascend' | 'descend'>('descend');
  const [selectedRole, setSelectedRole] = useState<string>(roles.USER); 

  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!selectedRole) {
    setUsers([]);
    return;
  }
  setLoading(true);
  userApi.getUsersByRoleId(selectedRole, activeUser ?? undefined)
    .then((data) => {
      setUsers(
        data.map((u: IUserType) => ({
          key: u._id,
          id: u._id,
          name: u.fullName || u.userName || 'No name',
          email: u.email,
          role: u.role?.name || '',
          status: u.status === 1,
          createdAt: u.create_at ? new Date(u.create_at).toISOString().split('T')[0] : '',
        }))
      );
    })
    .finally(() => setLoading(false));
}, [selectedRole, activeUser]);


  const roleOptions = [
		{ label: 'Quản trị viên', value: roles.ADMIN },
		{ label: 'HR', value: roles.HR },
		{ label: 'Người dùng', value: roles.USER },
	];



  const columns: ColumnsType<User> = [
		{
			title: 'Tên người dùng',
			dataIndex: 'name',
			key: 'name',
			sorter: (a: User, b: User) => a.name.localeCompare(b.name),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Vai trò',
			dataIndex: 'role',
			key: 'role',
			render: (role: string) => (
				<span className={role === 'admin' ? 'text-green-600' : 'text-gray-600'}>
					{role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
				</span>
			),
			filters: [
				{ text: 'Quản trị viên', value: 'admin' },
				{ text: 'Người dùng', value: 'user' },
			],
			onFilter: (value: any, record: User) => record.role === String(value),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: boolean, record: User) => (
				<Switch checked={status} onChange={(checked) => handleUpdateStatus(record.id, checked)} />
			),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			key: 'createdAt',
			sorter: (a: User, b: User) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			defaultSortOrder: sortBy, // Đúng kiểu 'ascend' | 'descend'
			sortDirections: ['ascend', 'descend'] as ('ascend' | 'descend')[],
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: User) => (
				<span className="flex space-x-2">
					<>
						<Select
							value={record.role}
							style={{ width: 120 }}
							onChange={(value) => handleAssignRole(record.id, value)}
						>
							{roleOptions.map((opt) => (
								<Option key={opt.value} value={opt.value}>
									{opt.label}
								</Option>
							))}
						</Select>
					</>
					<Button icon={<EditOutlined />} onClick={() => showModal(record)} title="Sửa" />
					<Button
						icon={<DeleteOutlined />}
						danger
						onClick={() => handleDelete(record.id)}
						title="Xóa"
					/>
				</span>
			),
		},
	];

  const filteredData = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'ascend') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const showModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter((user) => user.id !== id));
      message.success('Xóa thành công!');
    }
  };

  const handleUpdateStatus = (id: string, status: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );
    message.success('Cập nhật trạng thái thành công!');
  };

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id
              ? { ...user, ...values }
              : user
          )
        );
        message.success('Cập nhật thành công!');
      } else {
        const newUser: User = {
          key: `${users.length + 1}`,
          id: `${users.length + 1}`,
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setUsers([...users, newUser]);
        message.success('Thêm mới thành công!');
      }

      form.resetFields();
      setIsModalVisible(false);
      setEditingUser(null);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingUser(null);
  };



    const handleAssignRole = async (id: string, role: string) => {
			try {
				await userApi.assignRole(id, role);
				setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)));
				message.success('Gán quyền thành công!');
			} catch (e) {
				message.error('Lỗi khi gán quyền');
			}
		};

  return (
	<Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATE} hideChildren={false}> 	
		<div style={{ padding: '20px' }}>
			<h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

			<div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
				<Search
					placeholder="Tìm theo tên hoặc email"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					prefix={<SearchOutlined />}
					style={{ width: 300 }}
				/>
  
				<Select 
          value={activeUser}
          placeholder="Chọn trạng thái"
          allowClear
          onChange={(value) => setActiveUser(value)}
          style={{ width: 200 }}
        >
					<Option value="0">Inactive</Option>
					<Option value="1">Active</Option>
				</Select>

				<Select
					style={{ width: 200 }}
					value={selectedRole}
					onChange={setSelectedRole}
					placeholder="Chọn vai trò"
				>
					{roleOptions.map((opt) => (
						<Option key={opt.value} value={opt.value}>
							{opt.label}
						</Option>
					))}
				</Select>

				<Button type="primary" icon={<UserAddOutlined />} onClick={() => showModal()}>
					Thêm người dùng
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={filteredData}
				pagination={{ pageSize: 10 }}
				rowClassName={() => 'hover:bg-gray-50'}
				rowKey="id"
			/>

			<Modal
				title={editingUser ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical" name="user_form">
					<Form.Item
						label="Tên người dùng"
						name="name"
						rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
					>
						<Input placeholder="Nhập tên" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
					>
						<Input placeholder="Nhập email" />
					</Form.Item>

					<Form.Item
						label="Vai trò"
						name="role"
						rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
					>
						<Select placeholder="Chọn vai trò">
							<Option value="admin">Quản trị viên</Option>
							<Option value="user">Người dùng</Option>
						</Select>
					</Form.Item>

					<Form.Item label="Trạng thái" name="status" valuePropName="checked">
						<Switch />
					</Form.Item>
				</Form>
			</Modal>
		</div>
		</Access>
	);
};

export default AccountPage;