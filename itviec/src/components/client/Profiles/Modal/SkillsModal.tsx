import React, { useState } from 'react';
import { Modal, Input, Tag, Button, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ISkills {
  data: any; 
  closeModal: () => void;
  handleSave?: (data: any) => void; 
}

const SkillsModal: React.FC<ISkills> = ({ data, closeModal, handleSave }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState(''); 
  const [inputVisible, setInputVisible] = useState(false); 

  // Thêm kỹ năng vào danh sách khi nhấn Enter
  const handleInputConfirm = () => {
    if (input && !skills.includes(input)) {
      setSkills([...skills, input]);
    }
    setInputVisible(false);
    setInput('');
  };

  // Mở input nhập khi nhấn vào nút "Thêm kỹ năng"
  const handleShowInput = () => {
    setInputVisible(true);
  };

  const handleClose = (removedSkill: string) => {
    const newSkills = skills.filter(skill => skill !== removedSkill);
    setSkills(newSkills);
  };

  return (

      <Form layout="vertical">
        <Form.Item label="Kỹ năng">
          <div>
            {skills.map((skill, index) => (
              <Tag
                key={index}
                closable
                onClose={() => handleClose(skill)}
                style={{ marginBottom: 8 }}
              >
                {skill}
              </Tag>
            ))}

            {inputVisible ? (
              <Input
                type="text"
                size="small"
                value={input}
                onChange={e => setInput(e.target.value)}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
                style={{ width: 78 }}
              />
            ) : (
              <Button
                size="small"
                onClick={handleShowInput}
                icon={<PlusOutlined />}
                type="dashed"
              >
                Thêm kỹ năng
              </Button>
            )}
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={closeModal}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
  );
};

export default SkillsModal;
