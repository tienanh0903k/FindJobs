import { Button, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const IntroduceModal = ({ data, closeModal, handleSave,  ...props }: { data: any; handleSave: (data: any) => void; closeModal: () => void }) => {
    const [introduce, setIntroduce] = useState<string>('');

	const handleSaveIntroduce = () => {
		handleSave({ introduction: introduce });
		closeModal();
	};

    // Set initial data when modal is opened
    useEffect(() => {
        if (data && data.introduction) {
            setIntroduce(data.introduction);
        } else {
            setIntroduce('');
        }
    }, [data]);
	console.log('introduce', introduce);

    return (
        <Form layout="vertical" {...props}>
            <Form.Item label="Thông tin giới thiệu" name="introduce">
                <ReactQuill
                    value={introduce} 
                    onChange={setIntroduce}
                    placeholder="Viết giới thiệu về bản thân tại đây"
                    className="border border-gray-300 rounded-md mb-4"
                    theme="snow"
                />
				<Input.TextArea  style={{ display: 'none' }}  value={introduce} />
            </Form.Item>

            <div className="flex justify-between">
                <Button onClick={closeModal} className="bg-gray-300 text-gray-800">
                    Hủy
                </Button>
                <Button
					onClick={handleSaveIntroduce}
				 	className="bg-red-500 text-white" type="primary"
				 >
                    Lưu
                </Button>
            </div>
        </Form>
    );
};

export default IntroduceModal;
