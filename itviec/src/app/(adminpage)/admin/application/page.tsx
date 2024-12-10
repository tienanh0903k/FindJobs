'use client'

import { Layout, Typography, Input, Select, Button, Card, Empty, Table, Tooltip } from 'antd';
import { SearchOutlined, FileTextOutlined, FolderOpenOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { applicationApi } from '@/api/applicationApi';
import ApplicationModal from '@/components/admins/application/Application.modal';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

import '../style.css'

const ApplicationPage: React.FC = () => {


	const [data, setData] = useState();
	const [isVisible, setIsVisible] = useState(false);
	const [formData, setFormData] = useState(null);

	const [searchTerm, setSearchTerm] = useState('');
	const [status, setStatus] = useState('');
	const [sort, setSort] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await applicationApi.getAllApplication({
					search: '',
					status: '',
				});
				setData(response.applications || []);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, 	[]);



	// console.log(data)

    // const data = [
    //     {
    //         _id: "6735e6d688957686bda0d054",
    //         userId: "66c9fb96da1322f95d32885f",
    //         email: "tienanh2003k@gmail.com",
    //         name: "Tien ANh",
    //         jobId: {
    //             _id: "671a6889f3ef7fe71c07d72c",
    //             position: "Junior React"
    //         },
    //         resume_url: "https://cv-project-public-bucket.s3.amazonaws.com/resumes/1731585748816-anki-thống kê-2022-03-01@17-41-59.pdf",
    //         coverLetter: "hi",
    //         status: "pending",
    //         appliedAt: "2024-11-14T12:02:30.460Z",
    //         updatedAt: "2024-11-14T12:02:30.460Z",
    //         __v: 0,
    //         isSeen: true
    //     },
    //     {
    //         _id: "67564659478a761263b70ec7",
    //         userId: "66e84384ca6853fbf2b47519",
    //         email: "minhthuab@gmail.com",
    //         name: "NGUYEN MINH THUAN",
    //         jobId: {
    //             _id: "67344a36c720060058b4820a",
    //             position: "Backend Developer"
    //         },
    //         resume_url: "https://cv-project-public-bucket.s3.amazonaws.com/resumes/1733707352856-hdfgdfgdfgdfgd.docx",
    //         coverLetter: "tao tim viec khan cap",
    //         status: "pending",
    //         appliedAt: "2024-12-09T01:22:33.839Z",
    //         updatedAt: "2024-12-09T01:22:33.839Z",
    //         __v: 0
    //     },
    //     {
    //         _id: "675646fc478a761263b70ecc",
    //         userId: "66e84384ca6853fbf2b47519",
    //         email: "minhthuab@gmail.com",
    //         name: "NGUYEN MINH THUAN",
    //         jobId: {
    //             _id: "67344a5ac720060058b4820c",
    //             position: "Junior QA Engineer"
    //         },
    //         resume_url: "https://cv-project-public-bucket.s3.amazonaws.com/resumes/1733707514527-anki-thống kê-2022-03-01@17-41-59.pdf",
    //         coverLetter: "tao tim viec khan cap",
    //         status: "pending",
    //         appliedAt: "2024-12-09T01:25:16.263Z",
    //         updatedAt: "2024-12-09T01:25:16.263Z",
    //         __v: 0
    //     }
    // ];






    const columns = [
			{
				title: 'Tên',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: 'Vị trí',
				dataIndex: ['jobId', 'position'],
				key: 'position',
			},
			{
				title: 'Hồ sơ',
				key: 'resume_url',
				render: (_: any, record: any) => (
					<Tooltip title="Xem CV">
						<a href={record.resume_url} target="_blank" rel="noopener noreferrer">
							<FileTextOutlined />
						</a>
					</Tooltip>
				),
			},
			{
				title: 'Trạng thái',
				dataIndex: 'status',
				key: 'status',
			},
			{
				title: 'Ngày nộp',
				dataIndex: 'appliedAt',
				key: 'appliedAt',
				render: (text: any) => new Date(text).toLocaleDateString(),
			},
			{
				title: 'Tuy chon',
				dataIndex: 'action',
				key: 'action',
				render: (_: any, record: any) => (
					<div className="flex">
						<Button type="default" style={{ marginLeft: '8px', color: 'green' }}>
							<SaveOutlined />
						</Button>

						<Button
							type="default"
							onClick={() => {
								setIsVisible(!isVisible);
								setFormData(record);
							}}
						>
							<EditOutlined />
						</Button>
						<Button type="default" onClick={() => console.log('Edit:', record)}>
							<DeleteOutlined style={{ fontSize: '20px', color: '#F44336' }} />
						</Button>
					</div>
				),
			},
		];

	return (
		<>
			<Layout className="min-h-screen bg-gray-100">
				<Header style={{ background: '#fff' }}>
					<Title level={4} style={{ background: '#fff', color: '#00b14f' }}>
						Quản lý CV ứng viên
					</Title>
				</Header>
				<Content className="p-6">
					<div className="space-y-6">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
							<Input
								placeholder="Tìm kiếm tên, email, số điện thoại"
								prefix={<SearchOutlined />}
								className="flex-1"
							/>
							<div className="flex flex-wrap gap-2">
								<Select defaultValue="" style={{ width: 200 }}>
									<Option value="">Nhập trạng thái</Option>
									<Option value="new">Mới</Option>
									<Option value="reviewing">Đang xem xét</Option>
									<Option value="interviewed">Đã phỏng vấn</Option>
								</Select>
								<Select defaultValue="" style={{ width: 200 }}>
									<Option value="">Nhập nguồn CV</Option>
									<Option value="all">Tất cả nguồn</Option>
									<Option value="internal">Nội bộ</Option>
									<Option value="external">Bên ngoài</Option>
								</Select>
								<Select defaultValue="" style={{ width: 200 }}>
									<Option value="">Tất cả nhân</Option>
									<Option value="all">Tất cả</Option>
									<Option value="shortlisted">Đã chọn</Option>
									<Option value="rejected">Đã loại</Option>
								</Select>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<Text type="secondary">
								Tìm thấy <Text strong>0</Text> ứng viên
							</Text>
							<Button>Hiển thị tất cả CV</Button>
						</div>

						{/* ------body ---------- */}
						<div className="bg-white p-6 text-center">
							{data ? (
								<Table
									columns={columns}
									dataSource={data}
									pagination={{
										defaultPageSize: 10,
										showSizeChanger: true,
										pageSizeOptions: ['10', '20', '30'],
									}}
									className="custom-table"
								/>
							) : (
								<Empty description="Không có ứng viên" />
							)}
						</div>
					</div>
				</Content>
			</Layout>

			<ApplicationModal
				isVisible={isVisible}
				formData={formData}
				setFormData={setFormData}
				setIsVisible={setIsVisible}
			/>
		</>
	);
};
export default ApplicationPage;
