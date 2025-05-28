'use client';

import userApi from '@/api/userApi';
import { add } from 'lodash';
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import { roles } from '@/constants';
import companyApi from '@/api/companyApi';




export default function RegisterForm() {
  const [role, setRole] = useState<string>(roles.USER);
  const [companies, setCompanies] = useState<{_id: string, name: string}[]>([]);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    companyId: '',
    taxCode: '',
    address: '',
  });

  const router = useRouter()



  //============= site for side effect =============
  useEffect(() => {
    if (role === roles.HR) {
      const fetchCompanies = async () => {
        try {
          const res = await companyApi.getAllCompanySelect();
          setCompanies(res || []);
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      };
      fetchCompanies();
    }
    console.log('--------companies', companies);
  }, [role]);



  

  //============= site for hanlde function =============
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng điền đầy đủ thông tin!',
      });
      return;
    }

    const userData = {
      ...formData,
      role: roles.USER,
    };

    console.log('Thông tin người dùng:', userData);

    try {
      const response = await userApi.create(userData);
      console.log('Thông tin đăng ký:', response);
      notification.success({
        message: 'Đăng ký thành công',
        description: 'Bạn đã tạo tài khoản thành công!',
      });
      router.push('/login');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      alert('Đã có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <div className="flex min-h-screen p-4">
      {/* Left form side */}
      <div className="flex-1 max-w-3xl px-8 py-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto" noValidate>
          {/* Email đăng nhập */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email đăng nhập <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-200 rounded-md py-2 pl-4 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
              />
            </div>
          </div>

  
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                <i className="fas fa-lock"></i>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu (từ 6 đến 25 ký tự)"
                className="w-full border border-gray-200 rounded-md py-2 pl-5 pr-10 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
              />
              <button
                aria-label="Toggle password visibility"
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>

          
          <div className="mb-8">
            <label htmlFor="password-confirm" className="block text-sm font-semibold text-gray-700 mb-1">
              Nhập lại mật khẩu <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                <i className="fas fa-lock"></i>
              </span>
              <input
                id="password-confirm"
                name="passwordConfirm"
                type="password"
                required
                placeholder="Nhập lại mật khẩu"
                className="w-full border border-gray-200 rounded-md py-2 pl-5 pr-10 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
              />
              <button
                aria-label="Toggle password visibility"
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>

          {/* Vai trò */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Vai trò <span className="text-red-600">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'user' | 'hr')}
              className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
            >
              <option value={roles.USER}>Người dùng</option>
              <option value={roles.HR}>HR / Nhà tuyển dụng</option>
            </select>
          </div>

          {/* Họ và tên + Giới tính */}
          <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-1">
                Họ và tên <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full border border-gray-200 rounded-md py-2 pl-5 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                />
              </div>
            </div>

          </div>

          {/* Số điện thoại cá nhân */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
              Số điện thoại cá nhân <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                <i className="fas fa-phone"></i>
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại cá nhân"
                className="w-full border border-gray-200 rounded-md py-2 pl-5 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
              />
            </div>
          </div>

          {/* Công ty - chỉ hiện khi là HR */}
          {role === roles.HR && (
            <>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên công ty <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                    <i className="fas fa-building"></i>
                  </span>
                  <select
                    id="companyId"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-md py-2 pl-5 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="">Chọn công ty</option>
                    {companies.map((comp) => (
                      <option key={comp._id} value={comp._id}>{comp.name}</option>
                    ))}
                  </select>

                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="taxCode" className="block text-sm font-semibold text-gray-700 mb-1">
                  Mã số thuế <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                    <i className="fas fa-id-card"></i>
                  </span>
                  <input
                    id="taxCode"
                    name="taxCode"
                    type="text"
                    value={formData.taxCode}
                    onChange={handleChange}
                    placeholder="VD: 0101234567"
                    className="w-full border border-gray-200 rounded-md py-2 pl-5 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ công ty <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-green-600">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ công ty"
                    className="w-full border border-gray-200 rounded-md py-2 pl-5 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>
            </>
          )}

          {/* Checkbox điều khoản */}
          <div className="mb-6 text-sm text-gray-700">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" required className="form-checkbox text-green-600" />
              <span>
                Tôi đã đọc và đồng ý với{' '}
                <a href="#" className="font-semibold text-green-600 hover:underline">
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a href="#" className="font-semibold text-green-600 hover:underline">
                  Chính sách bảo mật
                </a>
                của IT JOBS.
              </span>
            </label>
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md mb-4"
          >
            Hoàn tất đăng ký
          </button>

          {/* Đăng nhập nếu đã có tài khoản */}
          <p className="text-center text-gray-600 text-sm">
            Đã có tài khoản?{' '}
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Đăng nhập ngay
            </a>
          </p>
        </form>
      </div>

      {/* Right image side (tuỳ chọn) */}
      <div className="hidden xl:flex xl:w-1/3 bg-[#0a1f33] relative flex-col items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-white font-bold text-xl mb-6">
            Quản lý việc làm cùng <span className="text-green-600">IT JOBS</span>
          </h2>
          <img
            alt="Campaigns illustration"
            src="https://remcuaminhanh.com/wp-content/uploads/2023/02/gai-van-phong-25.jpg"
            className="mx-auto mb-4 "
            width="320"
            height="180"
          />
        </div>
      </div>
    </div>
  );
}