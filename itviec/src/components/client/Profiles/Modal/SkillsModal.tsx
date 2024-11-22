import React, { useState } from 'react';
import { Form, Input, Button, List } from 'antd';

const SkillsModal = ({
	skills,
	onClose,
	onSave,
}: {
	skills: string[];
	onClose: () => void;
	onSave: (updatedSkills: string[]) => void;
}) => {
	const [skillInput, setSkillInput] = useState(''); // Input cho kỹ năng mới
	const [skillList, setSkillList] = useState([...skills]); // Danh sách kỹ năng

	const addSkill = () => {
		if (skillInput && !skillList.includes(skillInput)) {
			setSkillList([...skillList, skillInput]);
			setSkillInput('');
		}
	};

	const removeSkill = (skill: string) => {
		setSkillList(skillList.filter((item) => item !== skill));
	};

	const handleSave = () => {
		onSave(skillList);
		onClose();
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Chỉnh sửa Kỹ năng</h2>
			<Form layout="vertical">
				{/* Input thêm kỹ năng */}
				<Form.Item label="Kỹ năng mới">
					<Input
						placeholder="Nhập kỹ năng"
						value={skillInput}
						onChange={(e) => setSkillInput(e.target.value)}
						onPressEnter={addSkill}
					/>
				</Form.Item>
				<Button type="primary" onClick={addSkill} disabled={!skillInput}>
					Thêm
				</Button>

				{/* Danh sách kỹ năng */}
				<h3 className="mt-4">Danh sách Kỹ năng</h3>
				<List
					dataSource={skillList}
					renderItem={(skill) => (
						<List.Item
							actions={[
								<Button danger size="small" onClick={() => removeSkill(skill)}>
									Xóa
								</Button>,
							]}
						>
							{skill}
						</List.Item>
					)}
				/>
			</Form>

			{/* Nút Lưu và Hủy */}
			<div className="mt-4 flex justify-end gap-2">
				<Button onClick={onClose}>Hủy</Button>
				<Button type="primary" onClick={handleSave}>
					Lưu
				</Button>
			</div>
		</div>
	);
};

export default SkillsModal;
