import React from "react";
import { FaComment } from "react-icons/fa"; // Icon cho bình luận

const RightSection = () => {
  // Mock data
  const companyInfo = {
    name: "INFOPLUS",
    location: "Thành Phố Hà Nội",
    employeeCount: "100-499 Nhân Viên",
    industry: "Dịch Vụ IT",
    skills: ["Java", ".NET", "ReactJS"],
    jobCount: 2,
  };

  const featuredJobs = [
    {
      logo: "https://via.placeholder.com/50x50 ",
      title: "WordPress Fullstack Developer",
      company: "CÔNG TY CP TƯ VẤN THƯƠNG HIỆU",
      skills: ["CSS", "HTML", "Wordpress"],
    },
    {
      logo: "https://via.placeholder.com/50x50 ",
      title: "Kỹ Sư Phát Triển Phần Mềm (C#)",
      company: "AZAPA ENGINEERING",
      skills: ["C++", "Japanese - N3", "Japanese"],
    },
    {
      logo: "https://via.placeholder.com/50x50 ",
      title: "System Admin (Linux)",
      company: "Công Ty Cổ Phần Giải Pháp Và Công Nghệ",
      skills: ["Linux", "SQL", "System Admin"],
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Tiêu điểm */}
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <img
            src="https://via.placeholder.com/150x80 "
            alt="Company Logo"
            className="w-16 h-8 object-cover"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <FaComment size={20} />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">INFOPLUS</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>{companyInfo.location}</li>
          <li>{companyInfo.employeeCount}</li>
          <li>{companyInfo.industry}</li>
        </ul>
        <div className="mt-2 flex space-x-2 text-sm">
          {companyInfo.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="block mt-2 text-sm text-red-500 hover:text-red-700"
        >
          {companyInfo.jobCount} vị trí tuyển dụng →
        </a>
      </div>

      {/* Việc làm nổi bật */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Việc làm nổi bật
        </h3>
        <div className="space-y-4">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-white rounded-lg shadow-sm"
            >
              <img
                src={job.logo}
                alt="Job Logo"
                className="w-8 h-8 mr-2 object-cover rounded-full"
              />
              <div className="flex-grow">
                <h4 className="text-sm font-semibold text-gray-800">
                  {job.title}
                </h4>
                <p className="text-xs text-gray-600">{job.company}</p>
                <div className="mt-1 flex space-x-2 text-xs">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSection;