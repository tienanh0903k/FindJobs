import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';

const { Option } = Select;

interface ProjectModalProps {
  data: any; 
  closeModal: () => void; 
}

const ProjectModal: React.FC<ProjectModalProps> = ({ data, closeModal }) => {
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleDateChange = (value: any) => {
    setDate(value);
    setMonth(value.month() + 1);
    setYear(value.year());
  };

  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  const handleYearChange = (value: any ) => {
    setYear(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <h2>Dự án cá nhân</h2>
      <div>
        <p>Thể hiện dự án liên quan đến kỹ năng và khả năng của bạn</p>
        <div>
          <div>
            <label htmlFor="ten-du-an">Tên dự án:</label>
            <input type="text" id="ten-du-an" />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              Tôi vẫn đang làm dự án này
            </label>
          </div>
          <div>
            <label>Ngày bắt đầu:</label>
            <DatePicker
              onChange={handleDateChange}
              value={date}
              format="MM/YYYY"
              placeholder="Chọn ngày"
            />
          </div>
          <div>
            <label>Ngày kết thúc:</label>
            <Select
              value={month}
              onChange={handleMonthChange}
              style={{ width: '100px', marginRight: '10px' }}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <Option key={m} value={m}>
                  Tháng {m}
                </Option>
              ))}
            </Select>
            <Select
              value={year}
              onChange={handleYearChange}
              style={{ width: '100px' }}
            >
              {Array.from({ length: 10 }, (_, i) => 2023 - i).map((y) => (
                <Option key={y} value={y}>
                  {y}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;