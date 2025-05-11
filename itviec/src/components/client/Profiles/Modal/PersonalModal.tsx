import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';

const { Option } = Select;

interface PersonalModalProps {
  data?: any; 
  closeModal: () => void;
  handleSave: (data: any) => void; 
}

const PersonalModal: React.FC<PersonalModalProps> = ({
  data,
  closeModal,
  handleSave,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        console.log('Form Values:', values); // Thay bằng xử lý logic lưu trữ
        closeModal(); // Đóng modal sau khi submit
      })
      .catch((error) => {
        console.error('Validation Failed:', error);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: 'Tien Anh Nguyen',
        email: 'tienanh09032003k@gmail.com',
        phone: '0123456789',
        gender: 'Nam',
      }}
    >
      {/* Họ và Tên */}
      <Form.Item
        label="Họ và Tên"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

      {/* Chức danh */}
      <Form.Item
        label="Chức danh"
        name="jobTitle"
        rules={[{ required: true, message: 'Vui lòng nhập chức danh!' }]}
      >
        <Input placeholder="Nhập chức danh" />
      </Form.Item>

      {/* Email */}
      <Form.Item
        label="Địa chỉ email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ!' },
        ]}
      >
        <Input placeholder="Nhập địa chỉ email" />
      </Form.Item>

      {/* Số điện thoại */}
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>

      {/* Ngày sinh */}
      <Form.Item
        label="Ngày sinh"
        name="birthDate"
        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      {/* Giới tính */}
      <Form.Item
        label="Giới tính"
        name="gender"
        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
      >
        <Select placeholder="Chọn giới tính">
          <Option value="Nam">Nam</Option>
          <Option value="Nữ">Nữ</Option>
          <Option value="Khác">Khác</Option>
        </Select>
      </Form.Item>

      {/* Nút Submit */}
      <Form.Item>
        <Button type="primary" onClick={handleSubmit} style={{ marginRight: 8 }}>
          Lưu thông tin
        </Button>
        <Button onClick={closeModal}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalModal;
