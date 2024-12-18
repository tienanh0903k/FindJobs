import React from "react";
import { Button, Tag } from "antd";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";

const JobCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white border border-green-500 rounded-md p-4 gap-4 shadow-md hover:shadow-lg transition-shadow">
      {/* Logo và thông tin công việc */}
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
          <img
            src="https://via.placeholder.com/64" // Link thay thế logo
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Thông tin công việc */}
        <div>
          <h3 className="text-green-700 font-semibold text-lg">
            Nhân Viên Seo Web
          </h3>
          <p className="text-gray-500 text-sm mb-2">
            HỆ THỐNG NHA KHOA QUỐC TẾ MOON
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="bg-gray-100 text-gray-700">Hà Nội</Tag>
            <Tag className="bg-gray-100 text-gray-700">3 năm</Tag>
          </div>
          <p className="text-gray-500 text-sm">
            Chuyên môn: <span className="text-gray-700">SEO</span> |{" "}
            <span className="text-gray-700">Thương mại điện tử</span>
          </p>
        </div>
      </div>

      {/* Lương và hành động */}
      <div className="flex flex-col items-end gap-2">
        {/* Lương */}
        <div className="text-green-700 font-semibold text-lg">
          12 - 15 triệu
        </div>
        {/* Nút hành động */}
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            className="bg-green-600 hover:bg-green-700 rounded-full"
          >
            Ứng tuyển
          </Button>
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            className="text-gray-500 hover:text-green-600"
          />
          <Button
            shape="circle"
            icon={<HeartOutlined />}
            className="text-gray-500 hover:text-green-600"
          />
        </div>
        {/* Xem nhanh */}
        <Button
          type="text"
          className="bg-green-100 text-green-600 rounded-full px-4 py-1 flex items-center gap-1"
        >
          Xem nhanh <span className="text-lg">&raquo;</span>
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
