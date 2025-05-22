import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

interface AwardModalProps {
  data?: any;
  closeModal: () => void;
  handleSave?: (data: any) => void;
}

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 40 }, (_, i) => `${currentYear - i}`);

const AwardModal: React.FC<AwardModalProps> = ({
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
        label="Tên giải thưởng *"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên giải thưởng!' }]}
      >
        <Input placeholder="Nhập tên giải thưởng" />
      </Form.Item>

      <Form.Item
        label="Nơi trao giải *"
        name="organization"
        rules={[{ required: true, message: 'Vui lòng nhập nơi trao giải!' }]}
      >
        <Input placeholder="Nhập nơi trao giải" />
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

export default AwardModal;
