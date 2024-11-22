import { Button, Form } from 'antd';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const IntroduceModal = ({ onClose }: { onClose: () => void }) => {
	return (
		<Form layout="vertical">
			<Form.Item label="Thông tin giới thiệu" name="introduce">
				<ReactQuill
					placeholder="Viết giới thiệu về bản thân tại đây"
					className="border border-gray-300 rounded-md mb-4"
					theme="snow"
				/>
			</Form.Item>

			<div className="flex justify-between">
				<Button onClick={onClose} className="bg-gray-300 text-gray-800">
					Hủy
				</Button>
				<Button className="bg-red-500 text-white" type="primary">
					Lưu
				</Button>
			</div>
		</Form>
	);
};

export default IntroduceModal;
