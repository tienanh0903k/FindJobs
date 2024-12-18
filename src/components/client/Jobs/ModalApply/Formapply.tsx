// import React, { useState } from 'react';
// import { Modal, Button, Form, Input } from 'antd';
// import { UploadFile } from 'antd/es/upload/interface';
// import DropFile from '@/components/base/DropZone';
// import { useCurrentUser } from '@/hook/useCurrentUser';

// interface ApplyModalProps {
// 	visible: boolean;
// 	onCancel: () => void;
// 	onApply: (data: FormData) => void; 
// }

// const ApplyModal: React.FC<ApplyModalProps> = ({ visible, onCancel, onApply }) => {
// 	const [form] = Form.useForm();
// 	const user = useCurrentUser();
// 	const [fileList, setFileList] = useState<File[]>([]);

// 	const handleFileChange = (newFiles: File[]) => {
// 		setFileList(newFiles);
// 	};

// 	const handleFinish = async (values: any) => {
// 		const formData = new FormData();
// 		formData.append('name', values.name);
// 		formData.append('email', values.email);
// 		formData.append('introduction', values.introduction);

// 		// Thêm tệp vào `FormData`
// 		fileList.forEach((file) => {
// 			formData.append('file', file);
			
// 		});

// 		// Log kiểm tra các thông tin input và file
// 		console.log("Thông tin từ các trường input:");
// 		console.log("Họ và tên:", values.name);
// 		console.log("Email:", values.email);
// 		console.log("Giới thiệu bản thân:", values.introduction);
// 		console.log("current",  user);

// 		console.log("Thông tin tệp đã chọn:");
// 		fileList.forEach((file, index) => {
// 			console.log(`File ${index + 1}:`);
// 			console.log("Tên:", file.name);
// 			console.log("Kích thước:", file.size, "bytes");
// 			console.log("Loại:", file.type);
// 			console.log("Instance của File:", file instanceof File); // Kiểm tra
	
// 			// Thêm tệp vào `FormData` nếu là instance của File
// 			if (file instanceof File) {
// 				formData.append('file', file);
// 			} else {
// 				console.warn("Tệp không phải là instance của File và không thể upload:", file);
// 			}
// 		});

		

// 		// Gọi hàm `onApply` để xử lý `FormData` (có thể gửi lên server từ đây)
// 		onApply(formData);
// 	};

// 	return (
// 		<Modal
// 			title="Nộp hồ sơ"
// 			visible={visible}
// 			onCancel={onCancel}
// 			footer={[
// 				<Button key="cancel" onClick={onCancel}>
// 					Hủy
// 				</Button>,
// 				<Button key="submit" type="primary" form="apply-form" htmlType="submit">
// 					Nộp hồ sơ
// 				</Button>,
// 			]}
// 		>
// 			<Form form={form} layout="vertical" id="apply-form" onFinish={handleFinish}>
// 				<Form.Item
// 					label="Họ và tên"
// 					name="name"
// 					rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}
// 				>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item
// 					label="Email"
// 					name="email"
// 					rules={[
// 						{ required: true, message: 'Email là bắt buộc' },
// 						{ type: 'email', message: 'Email không hợp lệ' },
// 					]}
// 				>
// 					<Input />
// 				</Form.Item>

// 				{/* Thêm vùng drag-and-drop cho CV */}
// 				<Form.Item label="Chọn CV">
// 					<DropFile
// 						wrapperClass="mb-4"
// 						onChange={handleFileChange}
// 						multiple={false} // Chỉ cho phép tải lên một tệp
// 					/>
// 				</Form.Item>

// 				<Form.Item label="Giới thiệu bản thân" name="introduction">
// 					<Input.TextArea rows={4} placeholder="Viết một giới thiệu ngắn gọn về bản thân" />
// 				</Form.Item>
// 			</Form>
// 		</Modal>
// 	);
// };

// export default ApplyModal;





import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import DropFile from '@/components/base/DropZone';
import { useCurrentUser } from '@/hook/useCurrentUser';

interface ApplyModalProps {
  visible: boolean;
  onCancel: () => void;
  onApply: (data: FormData) => void;
  jobId: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ visible, onCancel, onApply, jobId }) => {
  const [form] = Form.useForm();
  const user = useCurrentUser();
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileChange = (newFiles: File[]) => {
    setFileList(newFiles);
  };

  const handleFinish = async (values: any) => {
    if (!user) {
      alert('Vui lòng đăng nhập trước khi ứng tuyển!');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('userId', user._id); 
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('coverLetter', values.introduction);

    // Thêm file CV vào formData
    if (fileList.length > 0) {
      formData.append('file', fileList[0]);
    }

    console.log('Form Data chuẩn bị gửi:', formData);
    onApply(formData); 
  };

  return (
    <Modal
      title="Nộp hồ sơ"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" form="apply-form" htmlType="submit">
          Nộp hồ sơ
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" id="apply-form" onFinish={handleFinish}>
        <Form.Item
          label="Họ và tên"
          name="name"
          initialValue={user?.fullName || ''}
          rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email là bắt buộc' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Thêm vùng drag-and-drop cho CV */}
        <Form.Item label="Chọn CV">
          <DropFile
            wrapperClass="mb-4"
            onChange={handleFileChange}
            multiple={false} // Chỉ cho phép tải lên một tệp
          />
        </Form.Item>

        <Form.Item label="Giới thiệu bản thân" name="introduction">
          <Input.TextArea rows={4} placeholder="Viết một giới thiệu ngắn gọn về bản thân" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplyModal;
