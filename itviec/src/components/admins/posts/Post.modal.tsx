import React, { memo, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker, Checkbox, InputNumber, message } from 'antd';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { IPost } from '@/app/types/interface';
import dynamic from 'next/dynamic';
import { useCurrentUser } from '@/hook/useCurrentUser';
import dayjs from 'dayjs';
// import CheckBalance from '@/components/base/CheckBalance';
import postsApi from '@/api/postsApi';
import CheckBalance from '@/components/base/CheckBalance';

const { Option } = Select;

interface JobPostingModalProps {
	visible: boolean;
	onClose: () => void;
	formData?: IPost;
	onSubmit: (data: any) => void;
	onReload?: () => void;
}

const JobPostingModal: React.FC<JobPostingModalProps> = ({ visible, formData, onClose, onSubmit, onReload}) => {
	const [form] = Form.useForm();
	const [description, setDescription] = useState('');
	const currentUser = useCurrentUser();
	const userId = currentUser?._id;

	useEffect(() => {
		if (formData) {
			form.setFieldsValue({
				position: formData.position,
				location: formData.location,
				salary: formData.salary,
				experience: formData.experience,
				numberOfPositions: +formData.numberOfPositions,
				tags: formData.tags || [],
				isHot: !!formData.isHot,
				isUrgent: !!formData.isUrgent,
				status: formData.status ?? true,
				deadline: formData.deadline ? dayjs(formData.deadline) : null,
			});

			console.log('formData.deadline:', formData.deadline);
			console.log('Convert:', formData.deadline ? dayjs(formData.deadline) : null);

			setDescription(formData.description || '');
		} else {
			form.resetFields();
			setDescription('');
		}
	}, [formData, form]);

	const handleFinish = async (values: any) => {
		const data = {
			...values,
			description,
			deadline: values.deadline ? values.deadline.toISOString() : undefined,
			numberOfPositions: Number(values.numberOfPositions),
			tags: Array.isArray(values.tags) ? values.tags : [],
			status: values.status ?? true,
			isHot: values.isHot ?? false,
			isUrgent: values.isUrgent ?? false,
			userId: userId,
		};

		if (formData?._id) {
			try {
				// await postsApi.updatePost(formData._id, data);
				onReload && onReload();
				onClose();
			} catch (err) {
				alert('Cập nhật thất bại!');
			}
		} else {
			try {
				await onSubmit(data); 
				message.success('Tạo tin tuyển dụng thành công!');
				onClose();
			} catch (err) {
				message.error('Tạo tin tuyển dụng thất bại!');
			}
		}
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

				{/* <Form.Item
                    label="Tin nổi bật"
                    name="isHot"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item
                    label="Gấp"
                    name="isUrgent"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item
                    label="Tình trạng"
                    name="status"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Checkbox>Đang mở</Checkbox>
                </Form.Item> */}
				<Form.Item label=" " colon={false}>
					<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
						<Form.Item
							name="isHot"
							valuePropName="checked"
							style={{ marginBottom: 0 }}
						>
							<Checkbox>Tin nổi bật</Checkbox>
						</Form.Item>
						<Form.Item
							name="isUrgent"
							valuePropName="checked"
							style={{ marginBottom: 0 }}
						>
							<Checkbox>Gấp</Checkbox>
						</Form.Item>
						<Form.Item
							name="status"
							valuePropName="checked"
							initialValue={true}
							style={{ marginBottom: 0 }}
						>
							<Checkbox>Đang mở</Checkbox>
						</Form.Item>
					</div>
				</Form.Item>
				<Form.Item
					label="Hạn nộp hồ sơ"
					name="deadline"
					rules={[{ required: true, message: 'Vui lòng chọn hạn nộp hồ sơ!' }]}
				>
					{/* ep kieu ve boolean  !!formData */}
					<DatePicker disabled={!!formData?._id} showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
				</Form.Item>


				<Form.Item label="Tags" name="tags">
					<Select mode="tags" placeholder="Nhập tags" />
				</Form.Item>

				<Form.Item label="Mô tả" required>
					<ReactQuill value={description} onChange={setDescription} />
				</Form.Item>

				<Form.Item>
					<CheckBalance min={50000}>
						<Button type="primary" htmlType="submit">
							Lưu
						</Button>
					</CheckBalance>
					{/* <Button type="primary" htmlType="submit">
						Lưu
					</Button> */}
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default memo(JobPostingModal);
