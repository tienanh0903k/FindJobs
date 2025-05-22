import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import type { Moment } from 'moment';

interface ExperienceModalProps {
  data?: any;
  handleSave?: (data: any) => void;
  closeModal: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ data, handleSave, closeModal }) => {
  const [form] = Form.useForm();
  const [currentJob, setCurrentJob] = useState<boolean>(data?.currentJob || false);

  useEffect(() => {
    let initialValues = { ...data };

    if (data?.startDate) {
      initialValues.fromDate = data.startDate;
    }
    if (data?.endDate) {
      initialValues.toDate = data.endDate;
    }

    form.setFieldsValue(initialValues);
    setCurrentJob(data?.currentJob || false);
  }, [data, form]);

  const onFinish = (values: any) => {
    const payload = {
      companyName: values.companyName,
      position: values.position,
      startDate: values.fromDate ? (values.fromDate as Moment).toDate() : null,
      endDate: currentJob ? null : values.toDate ? (values.toDate as Moment).toDate() : null,
      currentJob: currentJob,
    };

    handleSave && handleSave({ workExperience: [payload] });
	closeModal();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Tên công ty"
        name="companyName"
        rules={[{ required: true, message: 'Nhập tên công ty!' }]}
      >
        <Input placeholder="Nhập tên công ty" />
      </Form.Item>

      <Form.Item
        label="Vị trí"
        name="position"
        rules={[{ required: true, message: 'Nhập vị trí làm việc!' }]}
      >
        <Input placeholder="Nhập vị trí làm việc" />
      </Form.Item>

      <Form.Item
        name="currentJob"
        valuePropName="checked"
      >
        <Checkbox onChange={e => setCurrentJob(e.target.checked)}>
          Tôi đang làm việc tại đây
        </Checkbox>
      </Form.Item>

      <Form.Item
        label="Từ (tháng/năm)"
        name="fromDate"
        rules={[{ required: true, message: 'Chọn tháng bắt đầu!' }]}
      >
        <DatePicker picker="month" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Đến (tháng/năm)"
        name="toDate"
        rules={!currentJob ? [{ required: true, message: 'Chọn tháng kết thúc!' }] : []}
      >
        <DatePicker picker="month" style={{ width: '100%' }} disabled={currentJob} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Lưu
        </Button>
        <Button onClick={closeModal}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default ExperienceModal;


// import useModal from '@/hook/useModal';
// import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// const { Option } = Select;

// const arrayFields = [
//   'education',
//   'workExperience',
//   'skills',
//   'projects',
//   'certifications',
//   'awards',
// ];


// interface ExperienceModalProps {
//   data?: any;
//   handleSave?: (data: any) => void;
//   closeModal: () => void;
// }

// const ExperienceModal: React.FC<ExperienceModalProps> = ({ data, handleSave, closeModal }) => {
//   const [form] = Form.useForm();
//   const [description, setDescription] = useState(data?.description || '');
//   const [projects, setProjects] = useState(data?.projects || '');

//   useEffect(() => {
//     form.setFieldsValue(data);
//     setDescription(data?.description || '');
//     setProjects(data?.projects || '');
//   }, [data, form]);

//   const onFinish = (values: any) => {
//     // Kết hợp dữ liệu từ form và ReactQuill
//     const payload = {
//       ...values,
//       description,
//       projects,
//     };

// 	  const wrappedPayload = {
// 			workExperience: [payload],
// 		};

	
//     handleSave && handleSave(wrappedPayload);
//   };

//   return (
//     <Form form={form} layout="vertical" initialValues={data} onFinish={onFinish}>
//       <Form.Item
//         label="Tên công ty"
//         name="name"
//         rules={[{ required: true, message: 'Nhập tên công ty!' }]}
//       >
//         <Input placeholder="Nhập tên công ty" />
//       </Form.Item>

//       <Form.Item name="currentJob" valuePropName="checked">
//         <Checkbox>Tôi đang làm việc tại đây</Checkbox>
//       </Form.Item>

//       <Form.Item label="Từ" required>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <Form.Item
//             name="fromMonth"
//             rules={[{ required: true, message: 'Chọn tháng bắt đầu!' }]}
//             noStyle
//           >
//             <Select placeholder="Tháng" style={{ width: 120 }}>
//               {[...Array(12)].map((_, i) => (
//                 <Option key={i + 1} value={i + 1}>
//                   {`Tháng ${i + 1}`}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="fromYear"
//             rules={[{ required: true, message: 'Chọn năm bắt đầu!' }]}
//             noStyle
//           >
//             <DatePicker picker="year" placeholder="Năm" style={{ width: 120 }} />
//           </Form.Item>
//         </div>
//       </Form.Item>

//       <Form.Item label="Mô tả chi tiết">
//         <ReactQuill
//           value={description}
//           onChange={setDescription}
//           placeholder="Tóm lược lĩnh vực công ty, trách nhiệm và kết quả đạt được."
//         />
//       </Form.Item>

//       <Form.Item label="Dự án">
//         <ReactQuill
//           value={projects}
//           onChange={setProjects}
//           placeholder="Mô tả dự án, vai trò của bạn, công nghệ sử dụng và số thành viên."
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
//           Lưu
//         </Button>
//         <Button onClick={closeModal}>Hủy</Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default ExperienceModal;
