'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import companyApi from '@/api/companyApi';
import { ICompany } from '@/app/types/interface';
import ModalGlobal from '@/components/base/ModalGlobal'; // Import ModalGlobal
import { useModal } from '@/context/ModalProvider'; // Import useModal
import CompanyModal from '@/components/admins/company/Company.modal';
import Access from '@/components/admins/permission/Access';
import { ALL_PERMISSIONS } from '@/constants';

const CompanyPage: React.FC = () => {
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10, total: 0 });
	const [dataInit, setDataInit] = useState<ICompany | null>(null);
	const { isVisible, openModal, closeModal } = useModal();

	const fetchCompanies = async (page: number, limit: number) => {
		setIsLoading(true);
		try {
			const response = await companyApi.getAllCompany({ page, limit });
			setCompanies(response.items);
			setPagination((prev) => ({
				...prev,
				total: response.items.total,
			}));
		} catch (error) {
			console.error('Error fetching companies:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCompanies(pagination.currentPage, pagination.pageSize);
	}, [pagination.currentPage, pagination.pageSize]);

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
			dataIndex: 'image',
			key: 'image',
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
				<Button type="link" onClick={() => handleOpenModal(record)}>
					Sửa
				</Button>
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
		fetchCompanies(pagination.currentPage, pagination.pageSize); // Làm mới bảng
	};

	return (
		<div>
			<Access permission={ALL_PERMISSIONS.COMPANIES.GET_PAGINATE} hideChildren={false}>
				<Table
					rowKey="_id"
					loading={isLoading}
					columns={columns}
					dataSource={companies}
					scroll={{ x: true }}
					title={() => (
						<div className="text-right">
							<Access permission={ALL_PERMISSIONS.COMPANIES.CREATE} hideChildren>
								<Button type="primary" onClick={() => handleOpenModal()}>
									+ Thêm
								</Button>
							</Access>
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
