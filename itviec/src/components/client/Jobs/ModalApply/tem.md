// // // src/components/ApplyModal.tsx
// // import React, { useState } from 'react';
// // import { Modal, Button, Form, Input, Upload, message } from 'antd';
// // import { UploadFile } from 'antd/es/upload/interface';

// // interface ApplyModalProps {
// //     visible: boolean;
// //     onCancel: () => void;
// //     onApply: (data: any) => void;
// // }

// // const ApplyModal: React.FC<ApplyModalProps> = ({ visible, onCancel, onApply }) => {
// //     const [form] = Form.useForm();
// //     const [fileList, setFileList] = useState<UploadFile[]>([]);

// //     const handleUploadChange = (info: any) => {
// //         if (info.file.status === 'done') {
// //             message.success(`${info.file.name} file uploaded successfully`);
// //             setFileList(info.fileList); // Cập nhật file list
// //         } else if (info.file.status === 'error') {
// //             message.error(`${info.file.name} file upload failed.`);
// //         }
// //     };

// //     const handleRemove = (file: UploadFile) => {
// //         setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
// //     };

// //     const handleFinish = async (values: any) => {
// //         const formData = new FormData();
// //         formData.append('cv', fileList[0]?.originFileObj); // Lấy file CV
// //         formData.append('name', values.name);
// //         formData.append('email', values.email);
// //         formData.append('introduction', values.introduction);

// //         onApply(formData); // Gọi hàm nộp hồ sơ
// //     };

// //     return (
// //         <Modal
// //             title="Nộp hồ sơ"
// //             visible={visible}
// //             onCancel={onCancel}
// //             footer={[
// //                 <Button key="cancel" onClick={onCancel}>Hủy</Button>,
// //                 <Button key="submit" type="primary" form="apply-form" htmlType="submit">Nộp hồ sơ</Button>,
// //             ]}
// //         >
// //             <Form form={form} layout="vertical" id="apply-form" onFinish={handleFinish}>
// //                 <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}>
// //                     <Input />
// //                 </Form.Item>
// //                 <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email là bắt buộc' }, { type: 'email', message: 'Email không hợp lệ' }]}>
// //                     <Input />
// //                 </Form.Item>
// //                 <Form.Item label="Chọn CV">
// //                     <Upload
// //                         name="files"
// //                         listType="picture"
// //                         fileList={fileList}
// //                         onChange={handleUploadChange}
// //                         onRemove={handleRemove}
// //                         beforeUpload={() => false} // Ngăn không cho upload ngay lập tức
// //                     >
// //                         <Button>Chọn CV</Button>
// //                     </Upload>
// //                     <div className="mt-2 text-gray-500">Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB</div>
// //                 </Form.Item>
// //                 <Form.Item label="Giới thiệu bản thân" name="introduction">
// //                     <Input.TextArea rows={4} placeholder="Viết một giới thiệu ngắn gọn về bản thân" />
// //                 </Form.Item>
// //             </Form>
// //         </Modal>
// //     );
// // };

// // export default ApplyModal;

// // src/components/ApplyModal.tsx
// import React, { useState } from 'react';
// import { Modal, Button, Form, Input, Upload, message } from 'antd';
// import { UploadFile } from 'antd/es/upload/interface';

// interface ApplyModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   onApply: (data: any) => void;
// }

// const ApplyModal: React.FC<ApplyModalProps> = ({ visible, onCancel, onApply }) => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   // Hàm xử lý khi file được upload hoặc thay đổi
// //   const handleUploadChange = (info: any) => {
// //     if (info.file.status === 'done') {
// //       message.success(`${info.file.name} file uploaded successfully`);
// //       setFileList(info.fileList); // Cập nhật danh sách file
// //     } else if (info.file.status === 'error') {
// //       message.error(`${info.file.name} file upload failed.`);
// //     }
// //   };

//   // Hàm xử lý xóa file
//   const handleRemove = (file: UploadFile) => {
//     setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
//   };

//   const handleFinish = async (values: any) => {
//     const formData = new FormData();
//     formData.append('cv', fileList[0]?.originFileObj); // Lấy file CV
//     formData.append('name', values.name);
//     formData.append('email', values.email);
//     formData.append('introduction', values.introduction);

//     onApply(formData); // Gọi hàm nộp hồ sơ
//   };

//   return (
//     <Modal
//       title="Nộp hồ sơ"
//       visible={visible}
//       onCancel={onCancel}
//       footer={[
//         <Button key="cancel" onClick={onCancel}>Hủy</Button>,
//         <Button key="submit" type="primary" form="apply-form" htmlType="submit">Nộp hồ sơ</Button>,
//       ]}
//     >
//       <Form form={form} layout="vertical" id="apply-form" onFinish={handleFinish}>
//         <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email là bắt buộc' }, { type: 'email', message: 'Email không hợp lệ' }]}>
//           <Input />
//         </Form.Item>

//         {/* Thêm vùng drag-and-drop */}
//         <Form.Item label="Chọn CV">
//           {/* <Upload.Dragger
//             name="files"
//             listType="picture"
//             fileList={fileList}
//             // onChange={handleUploadChange}
//             onRemove={handleRemove}
//             beforeUpload={() => false}  // Ngăn không cho tải lên ngay lập tức
//             accept=".doc,.docx,.pdf"    // Chỉ hỗ trợ .doc, .docx, .pdf
//             maxCount={1}  // Giới hạn chỉ cho phép một file
//           >
//             <p className="ant-upload-drag-icon">
//               <i className="anticon anticon-upload" />
//             </p>
//             <p className="ant-upload-text">Kéo và thả CV vào đây hoặc nhấn để chọn</p>
//             <p className="ant-upload-hint">Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB</p>
//           </Upload.Dragger> */}
//         </Form.Item>

//         <Form.Item label="Giới thiệu bản thân" name="introduction">
//           <Input.TextArea rows={4} placeholder="Viết một giới thiệu ngắn gọn về bản thân" />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default ApplyModal;

// // src/components/ApplyModal.tsx
// import React, { useState } from 'react';
// import { Modal, Button, Form, Input, Upload, message } from 'antd';
// import { UploadFile } from 'antd/es/upload/interface';

// interface ApplyModalProps {
//     visible: boolean;
//     onCancel: () => void;
//     onApply: (data: any) => void;
// }

// const ApplyModal: React.FC<ApplyModalProps> = ({ visible, onCancel, onApply }) => {
//     const [form] = Form.useForm();
//     const [fileList, setFileList] = useState<UploadFile[]>([]);

//     const handleUploadChange = (info: any) => {
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//             setFileList(info.fileList); // Cập nhật file list
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     };

//     const handleRemove = (file: UploadFile) => {
//         setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
//     };

//     const handleFinish = async (values: any) => {
//         const formData = new FormData();
//         formData.append('cv', fileList[0]?.originFileObj); // Lấy file CV
//         formData.append('name', values.name);
//         formData.append('email', values.email);
//         formData.append('introduction', values.introduction);

//         onApply(formData); // Gọi hàm nộp hồ sơ
//     };

//     return (
//         <Modal
//             title="Nộp hồ sơ"
//             visible={visible}
//             onCancel={onCancel}
//             footer={[
//                 <Button key="cancel" onClick={onCancel}>Hủy</Button>,
//                 <Button key="submit" type="primary" form="apply-form" htmlType="submit">Nộp hồ sơ</Button>,
//             ]}
//         >
//             <Form form={form} layout="vertical" id="apply-form" onFinish={handleFinish}>
//                 <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}>
//                     <Input />
//                 </Form.Item>
//                 <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email là bắt buộc' }, { type: 'email', message: 'Email không hợp lệ' }]}>
//                     <Input />
//                 </Form.Item>
//                 <Form.Item label="Chọn CV">
//                     <Upload
//                         name="files"
//                         listType="picture"
//                         fileList={fileList}
//                         onChange={handleUploadChange}
//                         onRemove={handleRemove}
//                         beforeUpload={() => false} // Ngăn không cho upload ngay lập tức
//                     >
//                         <Button>Chọn CV</Button>
//                     </Upload>
//                     <div className="mt-2 text-gray-500">Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB</div>
//                 </Form.Item>
//                 <Form.Item label="Giới thiệu bản thân" name="introduction">
//                     <Input.TextArea rows={4} placeholder="Viết một giới thiệu ngắn gọn về bản thân" />
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };

// export default ApplyModal