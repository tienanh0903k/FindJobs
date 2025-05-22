import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

interface CertificateModalProps {
  data?: any;
  closeModal: () => void;
  handleSave?: (data: any) => void;
}

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 40 }, (_, i) => `${currentYear - i}`);

const CertificateModal: React.FC<CertificateModalProps> = ({
  data,
  closeModal,
  handleSave,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    handleSave && handleSave(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Tên chứng chỉ *"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên chứng chỉ!' }]}
      >
        <Input placeholder="Nhập tên chứng chỉ" />
      </Form.Item>

      <Form.Item
        label="Tổ chức cấp *"
        name="organization"
        rules={[{ required: true, message: 'Vui lòng nhập tổ chức cấp!' }]}
      >
        <Input placeholder="Nhập tên tổ chức cấp" />
      </Form.Item>

      <Form.Item
        label="Năm nhận *"
        name="year"
        rules={[{ required: true, message: 'Vui lòng chọn năm nhận!' }]}
      >
        <Select placeholder="Chọn năm">
          {yearOptions.map((y) => (
            <Option key={y} value={y}>{y}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Thông tin chi tiết khác"
        name="details"
      >
        <Input.TextArea placeholder="Nhập thông tin chi tiết khác" rows={4} />
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

export default CertificateModal;
