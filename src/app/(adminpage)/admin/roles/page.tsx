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
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermission] = useState<{ module: string; permissions: any[] }[]>([]);
  const [roles, setRoles] = useState<any[]>([]);


  const dispatch = useAppDispatch();
  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Tên Quyền', 
      dataIndex: 'name',
      key: 'name',
    },
   
    {
      title: 'Mô tả về quyền',
      dataIndex: 'description',
      key: 'description',
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
        //set loading is true
        setIsLoading(true);
        setRoles(rolesRes.data);
        setPermission(groupByPermission(permissionsRes.data));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        //set loading is false
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("-----------data------------", permission);

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
        loading={isLoading}  
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
