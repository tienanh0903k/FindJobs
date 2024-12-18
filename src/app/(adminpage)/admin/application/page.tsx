'use client'

import { Layout, Typography, Input, Select, Button, Card, Empty, Table, Tooltip, message } from 'antd';
import { SearchOutlined, FileTextOutlined, FolderOpenOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { applicationApi } from '@/api/applicationApi';
import ApplicationModal from '@/components/admins/application/Application.modal';
import { Tag } from 'antd';
const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

import '../style.css'
import Access from '@/components/admins/permission/Access';
import { ALL_PERMISSIONS } from '@/constants';
import EmailDrawer from '@/components/admins/application/Mailer.drawer';

type StatusType = 'pending' | 'reviewing' | 'interview' | 'hired' | 'rejected';

const statusColors: Record<StatusType, string> = {
	pending: 'orange',
	reviewing: 'blue',
	interview: 'purple',
	hired: 'green',
	rejected: 'red',
};


const ApplicationPage: React.FC = () => {


	const [data, setData] = useState<any[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [formData, setFormData] = useState(null);

	const [searchTerm, setSearchTerm] = useState('');
	const [status, setStatus] = useState<any>('');

	const [isEmailDrawerVisible, setEmailDrawerVisible] = useState(false);
	const [selectedApplicant, setSelectedApplicant] = useState(null);

	const loadData = async () => {
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



	useEffect(() => {
		loadData();
	}, 	[]);

	const filteredData = data?.filter((item: any) => {
		const keyword = searchTerm.toLowerCase();
		const matchSearchTerm =
			item.name.toLowerCase().includes(keyword) ||
			item.email.toLowerCase().includes(keyword) ||
			item.jobId.position.toLowerCase().includes(keyword);

		const matchStatus = status ? item.status === status : true;

		return matchSearchTerm && matchStatus;
	});
	  
	const handleSendEmail = async (data: any) => {
		try {
			await applicationApi.sendMail(data);
			message.success('Email sent successfully');
		} catch (error) {
			console.error('Failed to send email:', error);
		}
	}


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
				render: (status: string) => {
					// Ép kiểu trạng thái để đảm bảo nó là một `StatusType`
					const tagColor = statusColors[status as StatusType] || 'default';

					return (
						<Tag color={tagColor}>
							{status === 'pending'
								? 'Chờ xử lý'
								: status === 'reviewing'
								? 'Đang xem xét'
								: status === 'interview'
								? 'Đã phỏng vấn'
								: status === 'hired'
								? 'Được nhận'
								: status === 'rejected'
								? 'Bị từ chối'
								: 'Chờ xử lý'}
						</Tag>
					);
				},
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
						{/* <Button type="default" style={{ marginLeft: '8px', color: 'green' }}>
							<EditOutlined />
						</Button> */}

						<Access permission={ALL_PERMISSIONS.APPLICATION.UPDATE} hideChildren={true}>
							<Button
								type="default"
								onClick={() => {
									setIsVisible(!isVisible);
									setFormData(record);
								}}
							>
								<EditOutlined />
							</Button>
						</Access>

						<Button
							type="default"
							onClick={() => {
								setSelectedApplicant(record);
								setEmailDrawerVisible(true);
							}}
						>
							Gửi Email
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
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								prefix={<SearchOutlined />}
								className="flex-1"
							/>
							<div className="flex flex-wrap gap-2">
								<Select
									defaultValue=""
									style={{ width: 200 }}
									onChange={(value) => setStatus(value)}
								>
									<Option value="">Nhập trạng thái</Option>
									<Option value="pending">Mới</Option>
									<Option value="reviewing">Đang xem xét</Option>
									<Option value="interview">Đã phỏng vấn</Option>
									<Option value="hired">Được nhận</Option>
									<Option value="rejected">Bị từ chối</Option>
								</Select>

								{/* <Select defaultValue="" style={{ width: 200 }}>
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
								</Select> */}
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
							{/* {data ? (
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
							)} */}
							{filteredData?.length > 0 ? (
								<Table
									columns={columns}
									dataSource={filteredData}
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
				loadData={loadData}
			/>

			<EmailDrawer
				visible={isEmailDrawerVisible}
				onClose={() => setEmailDrawerVisible(false)}
				applicant={selectedApplicant}
				onSend={handleSendEmail}
			/>
		</>
	);
};
export default ApplicationPage;
