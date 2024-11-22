import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Checkbox } from 'antd';  // Import Ant Design components

const { Option } = Select;

const EducationModal = ({ onClose }: { onClose: () => void }) => {
  const [form] = Form.useForm();
  const [isCurrent, setIsCurrent] = useState(false);

  const handleSubmit = (values: any) => {
    console.log('Form Values:', values);
  };

  return (
   
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}  
      >
        <Form.Item
          label="Trường *"
          name="school"
          rules={[{ required: true, message: 'Vui lòng nhập trường học!' }]}
        >
          <Input placeholder="Nhập tên trường học" />
        </Form.Item>

        <Form.Item
          label="Ngành học *"
          name="major"
          rules={[{ required: true, message: 'Vui lòng nhập ngành học!' }]}
        >
          <Input placeholder="Nhập ngành học" />
        </Form.Item>

        {/* Checkbox "Tôi đang theo học tại đây" */}
        <Form.Item name="current" valuePropName="checked">
          <Checkbox onChange={(e) => setIsCurrent(e.target.checked)}>
            Tôi đang theo học tại đây
          </Checkbox>
        </Form.Item>

        {/* Thời gian học */}
        <Form.Item
          label="Từ *"
          name="startDate"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
        >
          <Select placeholder="Chọn tháng">
            <Option value="1">Tháng 1</Option>
            <Option value="2">Tháng 2</Option>
            <Option value="3">Tháng 3</Option>
            {/* Add more months */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Đến *"
          name="endDate"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
        >
          <Select placeholder="Chọn tháng" disabled={isCurrent}>
            <Option value="1">Tháng 1</Option>
            <Option value="2">Tháng 2</Option>
            <Option value="3">Tháng 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Thông tin chi tiết khác"
          name="details"
        >
          <Input.TextArea placeholder="Nhập thông tin chi tiết khác" rows={4} />
        </Form.Item>

        {/* Footer with Save and Cancel buttons */}
        <div className="flex justify-between">
          <Button onClick={onClose} className="bg-gray-300 text-gray-800">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" className="bg-red-500 text-white">
            Lưu
          </Button>
        </div>
      </Form>

  );
};
export default EducationModal