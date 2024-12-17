import React, { memo, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker, Checkbox, InputNumber } from 'antd';
// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, 
});
import 'react-quill/dist/quill.snow.css';
import { IPost } from '@/app/types/interface';
import dynamic from 'next/dynamic';
import { useCurrentUser } from '@/hook/useCurrentUser';

const { Option } = Select;

interface JobPostingModalProps {
    visible: boolean;
    onClose: () => void;
    formData?: IPost;
    onSubmit: (data: any) => void;
}

const JobPostingModal: React.FC<JobPostingModalProps> = ({ visible, formData, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState('');

    const currentUser = useCurrentUser();
    const userId = currentUser?._id;
    // Cập nhật form khi có formData (ví dụ, khi mở modal để sửa)
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                position: formData.position,
                companyName: formData.companyName,
                location: formData.location,
                salary: formData.salary,
                experience: formData.experience,
                numberOfPositions: +formData.numberOfPositions,
                tags: formData.tags || [],
                userId: formData.userId || userId,            
            });
            setDescription(formData.description || '');
        }
    }, [formData, form]);

    const handleFinish = (values: any) => {
        onSubmit({ ...values, description, userId: userId }); 
        // form.resetFields(); // Reset fields sau khi submit
        // setDescription(''); // Reset description
    };

    return (
			<Modal
				title={formData ? 'Chỉnh sửa tin tuyển dụng' : 'Thêm tin tuyển dụng'}
				visible={visible}
				onCancel={() => {
					form.resetFields();
					setDescription('');
					onClose();
				}}
				width={800}
				centered
				footer={null}
			>
				<Form form={form} onFinish={handleFinish} layout="horizontal">
					<Form.Item
						label="Tên vị trí"
						name="position"
						rules={[{ required: true, message: 'Vui lòng nhập tên vị trí!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Công ty"
						name="companyName"
						rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Địa điểm"
						name="location"
						rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Lương"
						name="salary"
						rules={[{ required: true, message: 'Vui lòng nhập mức lương!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Kinh nghiệm"
						name="experience"
						rules={[{ required: true, message: 'Vui lòng nhập kinh nghiệm!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Số lượng vị trí"
						name="numberOfPositions"
						rules={[{ required: true, message: 'Vui lòng nhập số lượng vị trí!' }]}
					>
						<InputNumber min={1} />
					</Form.Item>

					<Form.Item label="Tin nổi bật" name="isHot" valuePropName="checked">
						<Checkbox />
					</Form.Item>

					<Form.Item
						label="Hạn nộp hồ sơ"
						name="deadline"
						rules={[{ required: true, message: 'Vui lòng chọn hạn nộp hồ sơ!' }]}
					>
						<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
					</Form.Item>

					<Form.Item label="Tags" name="tags">
						<Select mode="tags" placeholder="Nhập tags" />
					</Form.Item>

					<Form.Item label="Mô tả" required>
						<ReactQuill value={description} onChange={setDescription} />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		);
};

export default memo(JobPostingModal);
