'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import JobPostingModal from '@/components/admins/posts/Post.modal';
import postsApi from '@/api/postsApi'; 
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { VscDebugRestart } from "react-icons/vsc";

const JobPostingPage: React.FC = () => {
	const [jobPostings, setJobPostings] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [formData, setFormData] = useState<any>(null);
	const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

	const fakeApplicants = [
		{ name: 'Nguyễn Văn A', email: 'a@example.com', cv: 'CV Link 1' },
		{ name: 'Trần Thị B', email: 'b@example.com', cv: 'CV Link 2' },
		{ name: 'Lê Quang C', email: 'c@example.com', cv: 'CV Link 3' },
		{ name: 'Phạm Thị D', email: 'd@example.com', cv: 'CV Link 4' },
		{ name: 'Võ Minh E', email: 'e@example.com', cv: 'CV Link 5' },
	];

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await postsApi.getMyPost();
			setJobPostings(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	//ThemThem
	const handleSubmit = async (data: any) => {
		console.log('--------> data', data);
		try {
			const response = await postsApi.createPost(data);
			fetchData();
			setModalVisible(false);
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	//xoa
	const handleDelete = async (id: string) => {
		if (!confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) return;
        console.log('ID:', id);
		if (!id) {
			console.error('ID không hợp lệ');
			alert('ID không hợp lệ, không thể xóa.');
			return;
		}

		try {
			await postsApi.deletePost(id);
			setJobPostings((prev) => prev.filter((job) => job._id !== id));
			alert('Xóa thành công!');
		} catch (error) {
			console.error('Lỗi khi xóa:', error);
			alert('Không thể xóa tin tuyển dụng.');
		}
	};

	// Hàm xử lý sự kiện mở rộng/thu gọn row
	const onRowExpand = (expanded: boolean, record: any) => {
		console.log('Row key (id):', record._id);
		console.log('Current expandedRowKeys:', expandedRowKeys);

		const keys = expanded
			? [...expandedRowKeys, record._id] 
			: expandedRowKeys.filter((key) => key !== record._id);

		console.log('>>>>>>>Updated:', keys);

		setExpandedRowKeys(keys);
	};

	const applicantColumns = [
		{
			title: 'Tên ứng viên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: any) => <Button type="link">Xem chi tiết</Button>,
		},
	];

	// Render thông tin mở rộng của từng row
	const expandedRowRender = (record: any) => {
		return (
			<div className="ml-12">
				<Table
					rowKey="email"
					columns={applicantColumns}
					dataSource={fakeApplicants || []}
					pagination={false}
				/>
			</div>
		);
	};

	const handleExtendDeadline = async (record: any) => {
		if (!window.confirm('Bạn có chắc chắn muốn gia hạn thêm 7 ngày?')) return;
		try {
			const oldDeadline = dayjs(record.deadline);
			const newDeadline = oldDeadline.add(7, 'day').toISOString();

			//await postsApi.updatePost(record._id, { deadline: newDeadline });

			alert('Gia hạn thành công!');
			fetchData(); // reload lại dữ liệu bảng
		} catch (error) {
			alert('Lỗi khi gia hạn!');
			console.error(error);
		}
	};

	const columns: ColumnsType<any> = [
		{
			title: 'Tên vị trí',
			dataIndex: 'position',
			key: 'position',
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
			title: 'Hạn nộp',
			dataIndex: 'deadline',
			key: 'deadline',
			render: (text) => dayjs(text).format('DD/MM/YYYY'),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<div>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setFormData(record);
							setModalVisible(true);
						}}
					/>
					<Button
						title="Xóa"
						style={{ color: 'red' }}
						type="link"
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record._id)}
					/>

					<Button
						type="dashed"
						icon={<VscDebugRestart />}
						onClick={() => handleExtendDeadline(record)}
					/>
				</div>
			),
		},
	];

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		setFormData(null);
	};

	return (
		<div style={{ padding: '20px' }}>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<div style={{ marginBottom: 16 }}>
						<div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
							<input
								type="text"
								placeholder="Tìm theo tên vị trí hoặc công ty..."
								// value={searchTerm}
								// onChange={(e) => setSearchTerm(e.target.value)}
								style={{ padding: '8px', flex: 1, minWidth: '200px' }}
							/>
							<select
								// value={sortBy}
								// onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
								style={{ padding: '8px' }}
							>
								<option value="newest">Mới nhất</option>
								<option value="oldest">Cũ nhất</option>
							</select>
						</div>
					</div>
					<Table
						rowKey="_id" // Sử dụng _id làm rowKey
						columns={columns}
						dataSource={jobPostings}
						pagination={false}
						expandedRowRender={expandedRowRender}
						expandedRowKeys={expandedRowKeys} // Cập nhật các row đã mở rộng
						onExpand={onRowExpand} // Xử lý khi mở rộng/thu gọn
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
						formData={formData}
						onClose={handleCloseModal}
						onSubmit={handleSubmit}
						onReload={fetchData}
					/>
				</>
			)}
		</div>
	);
};

export default JobPostingPage;


