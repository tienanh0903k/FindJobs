import React, { useState } from 'react';
import Overall from './Overall';
import { Button, Select, Modal, Input, Rate, Form } from 'antd';
import useModal from '@/hook/useModal';
import ModalGlobal from '@/components/base/ModalGlobal';
const { Option } = Select;
const { TextArea } = Input;

const Appreciate = () => {

  const [form] = Form.useForm();
  const { visible, openModal, closeModal } = useModal();
  const [isDirty, setIsDirty] = useState(false);

	return (
		<div className="p-4space-x-1">
			<Overall />
			<div className="mt-4">
				<div className="flex justify-between">
					<h2 className="text-xl font-normal mb-2 space-x-1">Tất cả đánh giá</h2>
					<Button type="primary" onClick={() => openModal()}>
						Viết đánh giá
					</Button>{' '}
				</div>
				<div className="text-right my-2">
					<Select
						defaultValue="latest"
						// onChange={(value) => setSortOrder(value)}
						style={{ minWidth: 'auto' }}
					>
						<Option value="latest">Mới nhất</Option>
						<Option value="highest">Cũ nhất</Option>
					</Select>
				</div>

				<hr className="border border-gray-100"></hr>

				<p>Ko co gi</p>
			</div>
			<ModalGlobal
				visible={visible}
				close={closeModal}
				title="Viết đánh giá"
				// onClose={() => {
				// 	if (isDirty) {
				// 		Modal.confirm({
				// 			title: 'Bạn có chắc muốn thoát?',
				// 			content: 'Các thay đổi của bạn sẽ không được lưu.',
				// 			okText: 'Thoát',
				// 			cancelText: 'Quay lại',
				// 			onOk: () => {
				// 				setIsDirty(false);
				// 				closeModal();
				// 				form.resetFields();
				// 			},
				// 		});
				// 	}
				// }}
			>
				<Form layout="horizontal">
					<Form.Item
						label="Tiêu đề"
						name="title"
						rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
					>
						<Input placeholder="Nhập tiêu đề đánh giá" />
					</Form.Item>
					<Form.Item
						label="Nội dung"
						name="content"
						rules={[{ required: true, message: 'Vui lòng nhập nội dung đánh giá' }]}
					>
						<TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
					</Form.Item>
					<Form.Item
						label="Đánh giá"
						name="rating"
						rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
					>
						<Rate />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Gửi đánh giá
						</Button>
					</Form.Item>
				</Form>
			</ModalGlobal>
		</div>
	);
};

export default Appreciate;
