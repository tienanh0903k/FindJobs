// pages/admin/roles.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import ModalRole from '@/components/admins/roles/Role.modal';
import roleApi from '@/api/roleApi';
import _ from 'lodash';
import { useAppDispatch } from '@/hook/useDispatch';
import { fetchRoleId } from '@/redux/reducers/role-slice';

export default function RolePage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const [permission, setPermission] = useState<{ module: string; permissions: any[] }[]>([]);
  const [roles, setRoles] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Tên Quyền',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'API Path',
      dataIndex: 'apiPath',
      key: 'apiPath',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Xóa</Button>
        </Space>
      ),
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [permissionsRes, rolesRes] = await Promise.all([
          roleApi.getPermission(),
          roleApi.getRoles()
        ]);

        // Cập nhật trạng thái với dữ liệu từ API
        setPermission(groupByPermission(permissionsRes.data));
        setRoles(rolesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("-----------data------------", permission);

  const groupByPermission = (data: any) => {
		return _(data)
			.groupBy((x) => x.module)
			.map((value, key) => {
				return { module: key, permissions: value as any[] };
			})
			.value();
  };
  

  const handleOpenModal = (permission?: any) => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSavePermission = (permission: any) => {
    // Xử lý lưu quyền ở đây
    console.log('Saved Permission:', permission);
    handleCloseModal();
  };

  const handleEdit = (record: any) => {
    dispatch(fetchRoleId(record._id))
    handleOpenModal(record);
  };

  const handleDelete = (record: any) => {
    console.log('Deleted Permission:', record);
  };

  return (
    <div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={roles}
        scroll={{ x: true }}
        title={() => (
          <Button
            type="primary"
            onClick={() => handleOpenModal()}
          >
            Thêm mới
          </Button>
        )}
      />
      <ModalRole
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSavePermission}
        permissionList={permission}
      />
    </div>
  );
}
