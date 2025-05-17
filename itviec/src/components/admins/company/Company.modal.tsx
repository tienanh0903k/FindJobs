'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, InputNumber, Form, Upload , message} from 'antd';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { ICompany } from '@/app/types/interface';
import { useModal } from '@/context/ModalProvider';
import { UploadFile } from 'antd/es/upload/interface';
import companyApi from '@/api/companyApi';
import { Select } from 'antd';

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
    const [loading, setLoading] = useState(false);

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
                status: dataInit.status ?? 1,
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
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Thêm các trường vào FormData
      formData.append('name', values.name || '');
      formData.append('description', values.description || '');
      formData.append('address', values.address || '');
      formData.append('coordinates', values.coordinates || '');
      formData.append('total_employee', values.total_employee?.toString() || '0');
      const statusValue = typeof values.status === 'number' ? values.status.toString() : '1';
	  formData.append('status', statusValue);

      // Thêm file ảnh nếu có
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      let response;
      if (dataInit) {
        // Cập nhật công ty
        response = await companyApi.updateCompany(dataInit._id, formData);
        message.success('Cập nhật công ty thành công');
      } else {
        // Tạo mới công ty
        response = await companyApi.createCompany(formData);
        message.success('Tạo công ty thành công');
      }

      reloadTable();
      closeModal();
      setDataInit(null);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error('Thao tác thất bại');
      console.error('Error saving company:', error);
    } finally {
      setLoading(false);
    }
  };

    return (
			<Modal
				title={dataInit ? 'Sửa công ty' : 'Thêm công ty mới'}
				visible={isVisible}
				onCancel={closeModal}
				footer={[
					<Button key="cancel" onClick={closeModal}>
						Đóng
					</Button>,
					<Button key="save" type="primary" onClick={handleSave}>
						Lưu
					</Button>,
				]}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						label="Tên công ty"
						name="name"
						rules={[{ required: true, message: 'Tên công ty là bắt buộc' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Mô tả" name="description">
						<ReactQuill />
					</Form.Item>
					<Form.Item
						label="Địa chỉ"
						name="address"
						rules={[{ required: true, message: 'Địa chỉ là bắt buộc' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Tọa độ" name="coordinates">
						<Input />
					</Form.Item>
					<Form.Item label="Tổng số nhân viên" name="total_employee">
						<InputNumber min={0} />
					</Form.Item>
					<Form.Item
						label="Trạng thái"
						name="status"
						rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
						initialValue={1}
					>
						<Select>
							<Select.Option value={1}>Hoạt động</Select.Option>
							<Select.Option value={0}>Không hoạt động</Select.Option>
						</Select>
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