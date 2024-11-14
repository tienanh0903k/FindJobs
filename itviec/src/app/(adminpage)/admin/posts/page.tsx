// src/JobPostingPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import JobPostingModal from '@/components/admins/posts/Post.modal';
import postsApi from '@/api/postsApi'; // Import postsApi

const JobPostingPage: React.FC = () => {
	const [jobPostings, setJobPostings] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	console.log('-----------data------', jobPostings);
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await postsApi.getMyPost();
				console.log('Response from API:', response); // Log phản hồi từ API
				setJobPostings(Array.isArray(response.data) ? response.data : []); // Đảm bảo jobPostings là mảng
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []); // Gọi API khi component mount

	const columns: ColumnsType<any> = [
		{
			title: 'Tên vị trí',
			dataIndex: 'position',
			key: 'position',
		},
		{
			title: 'Công ty',
			dataIndex: 'companyName',
			key: 'companyName',
		},
		{
			title: 'Địa điểm',
			dataIndex: 'location',
			key: 'location',
		},
		{
			title: 'Lương',
			dataIndex: 'salary',
			key: 'salary',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: () => (
				<Button type="link" onClick={() => {}}>
					Sửa
				</Button>
			),
		},
	];

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const handleSubmit = (data: any) => {
		// Xử lý dữ liệu khi submit từ modal
		console.log(data);
		setModalVisible(false); // Đóng modal sau khi lưu
	};

	return (
		<div style={{ padding: '20px' }}>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<Table
						rowKey="id"
						columns={columns}
						dataSource={jobPostings}
						pagination={false}
						title={() => (
							<div className="text-right">
								<Button type="primary" onClick={handleOpenModal}>
									+ Thêm tin tuyển dụng
								</Button>
							</div>
						)}
					/>
					<JobPostingModal
						visible={modalVisible}
						onClose={handleCloseModal}
						onSubmit={handleSubmit}
					/>
				</>
			)}
		</div>
	);
};

export default JobPostingPage;
