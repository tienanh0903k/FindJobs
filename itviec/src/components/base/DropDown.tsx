// components/client/DropdownMenu.tsx
'use client';

import React from 'react';

export default function DropdownMenu() {
  return (

    <div className="absolute top-11 w-[700px] bg-white border border-gray-200 rounded-xl shadow-lg p-6 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:block z-50 transition-all duration-300 ease-out">

    <div className="arrow-up" aria-hidden="true">
      <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L0 6H12L6 0Z" fill="#fff" />
      </svg>
    </div>


    <div className="flex flex-col sm:flex-row gap-8">
      <div className="flex flex-col gap-8 min-w-[180px]">
        <div>
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 select-none">Việc làm</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700 font-semibold text-sm cursor-pointer select-none">
              <i className="fas fa-search text-green-600 text-base"></i> <span>Tìm việc làm</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold text-sm cursor-pointer select-none">
              <i className="fas fa-bookmark text-green-600 text-base"></i> <span>Việc làm đã lưu</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold text-sm cursor-pointer select-none">
              <i className="fas fa-file-alt text-green-600 text-base"></i> <span>Việc làm đã ứng tuyển</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold text-sm cursor-pointer select-none">
              <i className="fas fa-thumbs-up text-green-600 text-base"></i> <span>Việc làm phù hợp</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 select-none">Công ty</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700 font-semibold text-sm cursor-pointer select-none">
              <i className="fas fa-building text-green-600 text-base"></i> <span>Danh sách công ty</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold text-sm cursor-pointer select-none">
              <i className="fas fa-chart-bar text-green-600 text-base"></i> <span>Top công ty</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-gray-700 font-semibold text-sm select-none">
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <i className="far fa-folder"></i> Việc làm theo vị trí
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Nhân viên kinh doanh</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Kế toán</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Marketing</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Hành chính nhân sự</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Chăm sóc khách hàng</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Ngân hàng</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm IT</li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <i className="far fa-folder"></i>&nbsp;
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm phổ thông</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Senior</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Kỹ sư xây dựng</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Thiết kế đồ họa</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Bất động sản</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm Giáo dục</li>
            <li className="flex items-center gap-2 cursor-pointer"><i className="far fa-folder text-gray-600"></i> Việc làm telesales</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
}
