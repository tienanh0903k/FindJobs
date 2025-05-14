'use client';

import React, { useState } from 'react';
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
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc');

  // Cột bảng AntD
  const columns = [
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
      onFilter: (value: any, record: User) => record.role === value,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: User) => (
        <Switch
          checked={status}
          onChange={(checked) =>
            handleUpdateStatus(record.id, checked)
          }
        />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: User, b: User) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: sortBy === 'desc' ? 'descend' : 'ascend',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: User) => (
        <span className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </span>
      ),
    },
  ];

  // Hàm tìm kiếm và lọc dữ liệu
  const filteredData = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  // Mở modal sửa
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

  // Xóa người dùng
  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter((user) => user.id !== id));
      message.success('Xóa thành công!');
    }
  };

  // Cập nhật trạng thái
  const handleUpdateStatus = (id: string, status: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );
    message.success('Cập nhật trạng thái thành công!');
  };

  // Modal Form
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

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

      {/* Tìm kiếm và sắp xếp */}
      <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
        <Search
          placeholder="Tìm theo tên hoặc email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />

        <Select
          defaultValue={sortBy}
          onChange={(value) => setSortBy(value)}
          style={{ width: 150 }}
        >
          <Option value="desc">Mới nhất</Option>
          <Option value="asc">Cũ nhất</Option>
        </Select>

        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => showModal()}
        >
          Thêm người dùng
        </Button>
      </div>

      {/* Bảng danh sách người dùng */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        rowClassName={() => 'hover:bg-gray-50'}
      />

      {/* Modal thêm/sửa người dùng */}
      <Modal
        title={editingUser ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="user_form">
          <Form.Item label="Tên người dùng" name="name" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item label="Vai trò" name="role" rules={[{ required: true }]}>
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
  );
};

export default AccountPage;