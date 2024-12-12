// src/components/JobPostingModal.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS cho react-quill

const { Option } = Select;

interface JobPostingModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void; // Thay đổi type theo yêu cầu của bạn
}

const JobPostingModal: React.FC<JobPostingModalProps> = ({ visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState('');

    const handleFinish = (values: any) => {
        onSubmit({ ...values, description }); // Gộp dữ liệu form với description
        form.resetFields(); // Reset fields sau khi submit
        setDescription(''); // Reset description
    };

    return (
        <Modal
            title="Thêm tin tuyển dụng"
            visible={visible}
            onCancel={onClose}
            width={800}
            centered 
            footer={null} 
        >
            <Form form={form} onFinish={handleFinish} layout='horizontal'>
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
                    <Input type="number" />
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

export default JobPostingModal;
