import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

interface EmailDrawerProps {
  visible: boolean;
  onClose: () => void;
  applicant: any;
  onSend: (emailData: { subject: string; message: string }) => void; 
}

const EmailDrawer: React.FC<EmailDrawerProps> = ({ visible, onClose, applicant, onSend }) => {
  const [form] = Form.useForm();

  const handleSend = () => {
    form
      .validateFields()
      .then((values) => {
        const bodyData = {
         ...values,
         to: applicant.email,
         name: applicant.name
        }
        onSend(bodyData); 
        form.resetFields(); 
        onClose();
      })
      .catch((info) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Drawer
      title={`Gửi Email đến ${applicant?.name || 'ứng viên'}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ subject: '', body: '' }}
      >
        <Form.Item
          label="Tiêu đề"
          name="subject"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề email!' }]}
        >
          <Input placeholder="Nhập tiêu đề email" />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="message"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung email!' }]}
        >
          <Input.TextArea placeholder="Nhập nội dung email" rows={6} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSend}>
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EmailDrawer;
