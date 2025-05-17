'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import companyApi from '@/api/companyApi';

type FormData = {
  name: string;
  description?: string;
  address: string;
  coordinates?: string;
  faxCode?: number;
  years?: number;
  total_employee?: number;
  file?: FileList;
};

const CreateCorp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      coordinates: '',
      faxCode: 0,
      years: 0,
      total_employee: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', data.name);
      formDataToSend.append('description', data.description || '');
      formDataToSend.append('address', data.address);
      formDataToSend.append('coordinates', data.coordinates || '');
      formDataToSend.append('faxCode', (data.faxCode || 0).toString());
      formDataToSend.append('years', (data.years || 0).toString());
      formDataToSend.append('total_employee', (data.total_employee || 0).toString());

      if (data.file && data.file.length > 0) {
        formDataToSend.append('file', data.file[0]);
      }


      await companyApi.createCompany(formDataToSend);

      notification.success({
        message: 'Gửi đăng ký thành công',
        description: 'Doanh nghiệp của bạn đang chờ admin duyệt',
      });
      router.push('/');
    } catch (error) {
      console.error('Lỗi khi đăng ký doanh nghiệp:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, vui lòng thử lại!',
      });
    }
  };

  return (
		<div className="flex min-h-screen bg-gray-100 p-4">
			<div className="flex-1 max-w-xl mx-auto px-8 py-10 bg-white rounded shadow">
				<h2 className="text-2xl font-bold mb-6 text-center">Đăng ký doanh nghiệp</h2>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="mb-4">
						<label htmlFor="name" className="block font-semibold mb-1">
							Tên doanh nghiệp <span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							id="name"
							{...register('name', { required: 'Tên doanh nghiệp là bắt buộc' })}
							placeholder="Tên doanh nghiệp"
							className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${
								errors.name ? 'border-red-600' : 'border-gray-300'
							}`}
						/>
						{errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>}
					</div>

					<div className="mb-4">
						<label htmlFor="description" className="block font-semibold mb-1">
							Mô tả
						</label>
						<textarea
							id="description"
							{...register('description')}
							placeholder="Mô tả doanh nghiệp"
							rows={3}
							className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="address" className="block font-semibold mb-1">
							Địa chỉ <span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							id="address"
							{...register('address', { required: 'Địa chỉ là bắt buộc' })}
							placeholder="Địa chỉ doanh nghiệp"
							className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${
								errors.address ? 'border-red-600' : 'border-gray-300'
							}`}
						/>
						{errors.address && (
							<p className="text-red-600 mt-1 text-sm">{errors.address.message}</p>
						)}
					</div>

					<div className="mb-4">
						<label htmlFor="coordinates" className="block font-semibold mb-1">
							Tọa độ doanh nghiệp
						</label>
						<input
							type="text"
							id="coordinates"
							{...register('coordinates')}
							placeholder="Tọa độ doanh nghiệp"
							className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
						/>
					</div>

					<div className="mb-4 flex space-x-4">
						<div className="flex-1">
							<label htmlFor="faxCode" className="block font-semibold mb-1">
								Mã số thuế:
							</label>
							<input
								type="number"
								id="faxCode"
								{...register('faxCode', { valueAsNumber: true, min: 0 })}
								className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
								min={0}
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="years" className="block font-semibold mb-1">
								Năm hoạt động:
							</label>
							<input
								type="number"
								id="years"
								{...register('years', {
									valueAsNumber: true,
									min: {
										value: 0,
										message: 'Năm hoạt động phải lớn hơn hoặc bằng 0',
									},
									max: {
										value: 50,
										message: 'Năm hoạt động không được vượt quá 50',
									},
									validate: (value) =>
										value === undefined || value % 1 === 0 || 'Năm hoạt động phải là số nguyên',
								})}
								className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
								min={0}
								max={50}
								step={1}
							/>
						</div>

						<div className="flex-1">
							<label htmlFor="total_employee" className="block font-semibold mb-1">
								Tổng nhân viên
							</label>
							<input
								type="number"
								id="total_employee"
								{...register('total_employee', { valueAsNumber: true, min: 0 })}
								className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
								min={0}
							/>
						</div>
					</div>

					<div className="mb-6">
						<label htmlFor="file" className="block font-semibold mb-1">
							Ảnh đại diện (Tải lên từ máy tính)
						</label>
						<input
							type="file"
							id="file"
							{...register('file')}
							accept="image/*"
							className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded disabled:opacity-50"
					>
						{isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateCorp;
