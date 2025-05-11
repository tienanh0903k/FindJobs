import useModal from '@/hook/useModal';
import { Button, Checkbox, DatePicker, Form, Input, Select, Tooltip } from 'antd';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { Option } = Select;

interface ExperienceModalProps {
	data: any;
	handleSave?: (data: any) => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ data, handleSave }) => {
	const { openModal, closeModal } = useModal();
	const [form] = Form.useForm();
	const [description, setDescription] = useState('dasdasd');
	const [projects, setProjects] = useState('asdasdas');

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{
				name: '',
				currentJob: false,
				fromMonth: '',
				fromYear: '',
				description: '',
				projects: '',
			}}
		>
			<Form.Item
				label="Tên công ty"
				name="name"
				rules={[{ required: true, message: 'Nhập tên công ty!' }]}
			>
				<Input placeholder="Nhập tên công ty" />
			</Form.Item>

			{/* Checkbox - Tôi đang làm việc tại đây */}
			<Form.Item name="currentJob" valuePropName="checked">
				<Checkbox>Tôi đang làm việc tại đây</Checkbox>
			</Form.Item>

			<Form.Item label="Từ" required>
				<div style={{ display: 'flex', gap: '10px' }}>
					<Form.Item
						name="fromMonth"
						rules={[{ required: true, message: 'Chọn tháng bắt đầu!' }]}
						noStyle
					>
						<Select placeholder="Tháng" style={{ width: 120 }}>
							{[...Array(12)].map((_, i) => (
								<Option key={i + 1} value={i + 1}>
									{`Tháng ${i + 1}`}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name="fromYear"
						rules={[{ required: true, message: 'Chọn năm bắt đầu!' }]}
						noStyle
					>
						<DatePicker picker="year" placeholder="Năm" style={{ width: 120 }} />
					</Form.Item>
				</div>
			</Form.Item>

			{/* ----Mô tả chi tiết----- */}

			<Form.Item label="Mô tả chi tiết">
				<ReactQuill
					value={description}
					onChange={setDescription}
					placeholder="Tóm lược lĩnh vực công ty, trách nhiệm và kết quả đạt được."
				/>
			</Form.Item>

			{/* Dự án */}
			<Form.Item label="Dự án">
				<ReactQuill
					value={projects}
					onChange={setProjects}
					placeholder="Mô tả dự án, vai trò của bạn, công nghệ sử dụng và số thành viên."
				/>
			</Form.Item>

			{/* <Form.Item>
					<Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
						Lưu
					</Button>
				<Button onClick={closeModal}>Hủy</Button>
			</Form.Item> */}
		</Form>
	);
};

export default ExperienceModal;
