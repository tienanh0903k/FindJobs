
import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, InputNumber, Form, Upload } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ICompany } from '@/app/types/interface';
import { useModal } from '@/context/ModalProvider';
import { UploadFile } from 'antd/es/upload/interface';

interface IProps {
    dataInit?: ICompany | null;
    setDataInit: (v: ICompany | null) => void;
    reloadTable: () => void;
}

const CompanyModal: React.FC<IProps> = ({
    dataInit,
    setDataInit,
    reloadTable,
}) => {
    const { isVisible, closeModal } = useModal();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (dataInit) {
            form.setFieldsValue({
                name: dataInit.name,
                description: dataInit.description,
                address: dataInit.address,
                coordinates: dataInit.coordinates,
                followers: dataInit.followers,
                rating: dataInit.rating,
                total_employee: dataInit.total_employee,
            });
            // Nếu có file trước đó, bạn có thể thiết lập lại fileList
            if (dataInit.file) {
                setFileList([{ uid: '-1', name: dataInit.file.name, status: 'done', url: dataInit.file.url }]);
            }
        } else {
            form.resetFields(); 
            setFileList([]);
        }
    }, [dataInit, form]);

    const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
    };

    const handleSave = async () => {
        const values = await form.validateFields();
        const formData = new FormData();

        // Thêm các trường vào FormData
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('address', values.address);
        formData.append('coordinates', values.coordinates);
        formData.append('total_employee', values.total_employee);
        
        // Nếu có file, thêm vào FormData
        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj); // Sử dụng originFileObj để lấy file thực
        }
        
        const response = dataInit
            ? await fetch('/api/company', {
                method: 'PUT',
                body: formData,
            })
            : await fetch('http://localhost:3001/api/companies', {
                method: 'POST',
                body: formData, 
            });
            console.log(response);

        if (response.ok) {
            const savedCompany = await response.json();
            console.log('Đã lưu công ty:', savedCompany);
            reloadTable();
            closeModal();
        } else {
            console.error('Lỗi khi lưu công ty:', response.statusText);
        }
    };

    return (
        <Modal
            title={dataInit ? 'Sửa công ty' : 'Thêm công ty mới'}
            visible={isVisible}
            onCancel={closeModal}
            footer={[
                <Button key="cancel" onClick={closeModal}>Đóng</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Lưu</Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Tên công ty" name="name" rules={[{ required: true, message: 'Tên công ty là bắt buộc' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <ReactQuill />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Địa chỉ là bắt buộc' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Tọa độ" name="coordinates">
                    <Input />
                </Form.Item>
                <Form.Item label="Tổng số nhân viên" name="total_employee">
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="File" name="file">
                    <Upload
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false} // Ngăn không cho upload ngay lập tức
                    >
                        <Button>Chọn file</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CompanyModal;