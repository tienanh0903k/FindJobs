// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Table, Button } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import JobPostingModal from '@/components/admins/posts/Post.modal';
// import postsApi from '@/api/postsApi'; 
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// const JobPostingPage: React.FC = () => {
// 	const [jobPostings, setJobPostings] = useState<any[]>([]);
// 	const [isLoading, setIsLoading] = useState<boolean>(true);
// 	const [modalVisible, setModalVisible] = useState<boolean>(false);

// 	const [formData, setFormData] = useState<any>(null);

// 	console.log('-----------data------', jobPostings);
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			setIsLoading(true);
// 			try {
// 				const response = await postsApi.getMyPost();
// 				console.log('Response from API:', response); 
// 				setJobPostings(Array.isArray(response.data) ? response.data : []); 
// 			} catch (error) {
// 				console.error('Error fetching posts:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, []); 

// 	const columns: ColumnsType<any> = [
// 		{
// 			title: 'Tên vị trí',
// 			dataIndex: 'position',
// 			key: 'position',
// 		},
// 		{
// 			title: 'Công ty',
// 			dataIndex: 'companyName',
// 			key: 'companyName',
// 		},
// 		{
// 			title: 'Địa điểm',
// 			dataIndex: 'location',
// 			key: 'location',
// 		},
// 		{
// 			title: 'Lương',
// 			dataIndex: 'salary',
// 			key: 'salary',
// 		},
// 		{
// 			title: 'Hành động',
// 			key: 'action',
// 			render: (_, record) => (
// 				<div>
// 				  <Button 
// 					icon={<EditOutlined />} 
// 					onClick={() => {
// 						setFormData(record);
// 						setModalVisible(true);
// 					}}
// 				  />
// 				  <Button 
// 					type="link" 
// 					icon={<DeleteOutlined />} 
// 					// onClick={() => handleDelete(record.id)}
// 				  />
// 				</div>
// 			  ),
// 		},
// 	];

// 	const handleOpenModal = () => {
// 		setModalVisible(true);
// 	};

// 	const handleCloseModal = () => {
// 		setModalVisible(false);
// 		setFormData(null);
// 	};

// 	const handleSubmit = (data: any) => {
// 		// Xử lý dữ liệu khi submit từ modal
// 		console.log(data);
// 		setModalVisible(false); // Đóng modal sau khi lưu
// 	};

// 	return (
// 		<div style={{ padding: '20px' }}>
// 			{isLoading ? (
// 				<div>Loading...</div>
// 			) : (
// 				<>
// 					<Table
// 						rowKey="id"
// 						columns={columns}
// 						dataSource={jobPostings}
// 						pagination={false}
// 						title={() => (
// 							<div className="text-right">
// 								<Button type="primary" onClick={handleOpenModal}>
// 									+ Thêm tin tuyển dụng
// 								</Button>
// 							</div>
// 						)}
// 					/>
// 					<JobPostingModal
// 						visible={modalVisible}
// 						formData={formData}
// 						onClose={handleCloseModal}
// 						onSubmit={handleSubmit}
// 					/>
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default JobPostingPage;










'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import JobPostingModal from '@/components/admins/posts/Post.modal';
import postsApi from '@/api/postsApi'; 
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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


	const handleSubmit = async (data: any) => {
		console.log('--------> data', data)
		try {
			const response = await postsApi.createPost(data);
			fetchData();
			setModalVisible(false);
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};



    // Hàm xử lý sự kiện mở rộng/thu gọn row
    const onRowExpand = (expanded: boolean, record: any) => {
        console.log('Row key (id):', record._id);
        console.log('Current expandedRowKeys:', expandedRowKeys);

        const keys = expanded
            ? [...expandedRowKeys, record._id] // Thêm key nếu mở rộng
            : expandedRowKeys.filter(key => key !== record._id); // Xóa key nếu thu gọn
        
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
            render: (_: any, record: any) => (
                <Button type="link">
                    Xem chi tiết
                </Button>
            ),
        },
    ];


    // Render thông tin mở rộng của từng row
	const expandedRowRender = (record: any) => {
        return (
			<div className='ml-12'>
				 <Table
					rowKey="email"
					columns={applicantColumns}
					dataSource={fakeApplicants || []}
					pagination={false}
            	/>
			</div>
        );
    };

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
                        type="link" 
                        icon={<DeleteOutlined />} 
                        // onClick={() => handleDelete(record.id)}
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
        // setFormData(null);
    };


    return (
        <div style={{ padding: '20px' }}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
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
                    />
                </>
            )}
        </div>
    );
};

export default JobPostingPage;


