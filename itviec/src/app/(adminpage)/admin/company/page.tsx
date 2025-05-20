'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Select, Space, Popconfirm , message} from 'antd';
import { ColumnsType } from 'antd/es/table';
import companyApi from '@/api/companyApi';
import { ICompany } from '@/app/types/interface';
import ModalGlobal from '@/components/base/ModalGlobal'; // Import ModalGlobal
import { useModal } from '@/context/ModalProvider'; // Import useModal
import CompanyModal from '@/components/admins/company/Company.modal';
import Access from '@/components/admins/permission/Access';
import { ALL_PERMISSIONS } from '@/constants';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Option } = Select;

const CompanyPage: React.FC = () => {
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [statusFilter, setStatusFilter] = useState<any>(1);
	const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10, total: 0 });
	const [dataInit, setDataInit] = useState<ICompany | null>(null);
	const { isVisible, openModal, closeModal } = useModal();

	const fetchCompanies = async (page: number, limit: number, status?: number) => {
		setIsLoading(true);
		try {
			const response = await companyApi.getAllCompany({ page, limit, status });
			setCompanies(response.items);
			setPagination((prev) => ({
				...prev,
				total: response.total,
				currentPage: page,
				pageSize: limit,
			}));
		} catch (error) {
			console.error('Error fetching companies:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCompanies(pagination.currentPage, pagination.pageSize, statusFilter);
	}, [pagination.currentPage, pagination.pageSize, statusFilter]);


	const handleDelete = async (id: string) => {
    try {
      await companyApi.deleteCompany(id);
      message.success('Xóa công ty thành công');
      fetchCompanies(pagination.currentPage, pagination.pageSize, statusFilter);
    } catch (error) {
      console.error('Error deleting company:', error);
      message.error('Xóa công ty thất bại');
    }
  };
  

	const columns: ColumnsType<ICompany> = [
		{
			title: 'Tên công ty',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Số lượng nhân viên',
			dataIndex: 'total_employee',
			key: 'total_employee',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'logo',
			key: 'logo',
			render: (image: string) => (
				<Image
					src={image}
					alt="Company Image"
					width={50}
					height={50}
					style={{ objectFit: 'cover', borderRadius: '8px' }}
				/>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="link"
						icon={<EditOutlined />}
						onClick={() => handleOpenModal(record)}
						title="Sửa"
					/>
					<Popconfirm
						title="Bạn có chắc muốn xóa công ty này?"
						onConfirm={() => handleDelete(record._id)}
						okText="Có"
						cancelText="Không"
					>
						<Button type="link" icon={<DeleteOutlined />} danger title="Xóa" />
					</Popconfirm>
				</Space>
			),
		},
	];

	const handleTableChange = (paginationConfig: any) => {
		setPagination({
			...pagination,
			currentPage: paginationConfig.current,
			pageSize: paginationConfig.pageSize,
		});
	};

	const handleOpenModal = (company?: ICompany) => {
		setDataInit(company || null);
		openModal(); // Mở modal
	};

	const reloadTable = () => {
		fetchCompanies(pagination.currentPage, pagination.pageSize, statusFilter); 
	};

	const handleStatusChange = (value: number | undefined) => {
		setStatusFilter(value);
		setPagination((prev) => ({ ...prev, currentPage: 1 }));
	};

	return (
		<div>
			<Access permission={ALL_PERMISSIONS.COMPANIES.GET_PAGINATE} hideChildren={false}>
				<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
					<Select
						value={statusFilter}
						onChange={handleStatusChange}
						style={{ width: 160 }}
						placeholder="Chọn trạng thái"
						allowClear // Cho phép xóa lựa chọn
					>
						<Option value={undefined}>Tất cả</Option>
						<Option value={1}>Đã duyệt</Option>
						<Option value={0}>Chưa duyệt</Option>
					</Select>
				</div>
				<Table
					rowKey="_id"
					loading={isLoading}
					columns={columns}
					dataSource={companies}
					scroll={{ x: true }}
					title={() => (
						<div className="text-right">
							{/* <Access permission={ALL_PERMISSIONS.COMPANIES.CREATE} hideChildren> */}
							<Button type="primary" onClick={() => handleOpenModal()}>
								+ Thêm
							</Button>
							{/* </Access> */}
						</div>
					)}
					pagination={{
						current: pagination.currentPage,
						pageSize: pagination.pageSize,
						total: pagination.total,
						showSizeChanger: true,
						pageSizeOptions: ['10', '20', '50'],
					}}
					onChange={handleTableChange}
				/>
			</Access>

			<CompanyModal dataInit={dataInit} setDataInit={setDataInit} reloadTable={reloadTable} />
		</div>
	);
};

export default CompanyPage;


