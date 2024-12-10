import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useCallback } from 'react';
const { Option } = Select;

interface IApplicationProps {
  isVisible?: boolean;
  formData?: any;
  setFormData?: (data: any) => void;  // Đảm bảo setFormData có tham số
  setIsVisible: (visible: boolean) => void;
}

const ApplicationModal = ({
  isVisible,
  formData,
  setFormData,
  setIsVisible,
}: IApplicationProps) => {
  const [form] = Form.useForm();

  // Hàm cập nhật dữ liệu form từ formData
  const updateFormData = useCallback(() => {
    if (formData) {
      form.setFieldsValue({
        name: formData?.name || '',
        email: formData?.email || '',
        job: formData?.jobId?.position || '',
        coverLetter: formData?.coverLetter || '',
        status: formData?.status || '',
        appliedAt: formData?.appliedAt ? moment(formData?.appliedAt) : null,
      });
    }
  }, [form, formData]);

  // Cập nhật form khi formData thay đổi
  useEffect(() => {
    updateFormData();
  }, [formData, updateFormData]);

  // Hàm xử lý lưu dữ liệu
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('Lưu dữ liệu', values);
      // Thực hiện lưu dữ liệu hoặc gọi API ở đây
      setIsVisible(false);  // Đóng modal sau khi lưu thành công
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={formData ? 'Cập nhật trạng thái CV' : 'Thêm công ty mới'}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      width={800}
      style={{ top: 20 }} 
      centered
      footer={[
        <Button key="cancel" onClick={() => setIsVisible(false)}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="job"
          label="Vị trí công việc"
          rules={[{ required: true, message: 'Vui lòng chọn vị trí công việc!' }]}
        >
          <Select>
            <Option value="Junior React">Junior React</Option>
            <Option value="Backend Developer">Backend Developer</Option>
            <Option value="QA Engineer">QA Engineer</Option>
            {/* Danh sách có thể thay đổi tùy vào yêu cầu */}
          </Select>
        </Form.Item>

        <Form.Item
          name="coverLetter"
          label="Thư xin việc"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select>
            <Option value="pending">Chờ</Option>
            <Option value="interviewed">Đã phỏng vấn</Option>
            <Option value="hired">Đã thuê</Option>
            <Option value="rejected">Từ chối</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="appliedAt"
          label="Ngày nộp"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplicationModal;