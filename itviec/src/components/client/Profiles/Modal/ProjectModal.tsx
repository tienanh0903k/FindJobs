import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

interface ProjectModalProps {
  data?: any;
  closeModal: () => void;
  handleSave?: (data: any) => void;
}

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 40 }, (_, i) => `${currentYear - i}`);

const ProjectModal: React.FC<ProjectModalProps> = ({
  data,
  closeModal,
  handleSave,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
      console.log("Modal gửi lên:", values);  // phải hiện đúng data vừa nhập
    handleSave && handleSave(values);
    closeModal();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Tên dự án *"
        name="title"
        rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
      >
        <Input placeholder="Nhập tên dự án" />
      </Form.Item>

      <Form.Item
        label="Vai trò *"
        name="role"
        rules={[{ required: true, message: 'Vui lòng nhập vai trò của bạn!' }]}
      >
        <Input placeholder="Nhập vai trò (VD: Frontend, Leader...)" />
      </Form.Item>

      <Form.Item
        label="Năm thực hiện *"
        name="year"
        rules={[{ required: true, message: 'Vui lòng chọn năm thực hiện!' }]}
      >
        <Select placeholder="Chọn năm">
          {yearOptions.map((y) => (
            <Option key={y} value={y}>{y}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Mô tả dự án *"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án!' }]}
      >
        <Input.TextArea placeholder="Nhập mô tả dự án, công nghệ sử dụng, đóng góp..." rows={4} />
      </Form.Item>

      <Form.Item
        label="Link demo/github"
        name="link"
        rules={[
          { type: 'url', message: 'Đường dẫn không hợp lệ!', whitespace: true },
        ]}
      >
        <Input placeholder="https://github.com/..." />
      </Form.Item>

      <div className="flex justify-between">
        <Button onClick={closeModal} className="bg-gray-300 text-gray-800">
          Hủy
        </Button>
        <Button type="primary" htmlType="submit" className="bg-red-500 text-white">
          Lưu
        </Button>
      </div>
    </Form>
  );
};

export default ProjectModal;
