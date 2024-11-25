import React, { useState } from 'react';
import { Modal, Input, Tag, Button, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SkillsModal = ({onClose }: { onClose: () => void }) => {
  const [skills, setSkills] = useState<string[]>([]); // Danh sách kỹ năng đã chọn
  const [input, setInput] = useState(''); // Biến lưu giá trị nhập
  const [inputVisible, setInputVisible] = useState(false); // Điều khiển hiển thị input nhập

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

  // Xóa kỹ năng khỏi danh sách
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
          <Button type="primary" onClick={onClose}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
  );
};

export default SkillsModal;
