'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();

  // Sử dụng useMemo để lấy giá trị từ searchParams một lần
  const { amount, idtrans } = useMemo(() => {
    return {
      amount: searchParams.get('amount') || 0,
      idtrans: searchParams.get('apptransid'),
    };
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-6">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-16 h-16 rounded-full bg-green-400 opacity-50 animate-ripple"></span>
          <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-gray-700">Thanh toán thành công</h1>
      <p className="text-gray-500 mt-2">Cảm ơn bạn đã sử dụng dịch vụ!</p>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-full max-w-md">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Số tiền:</span>
          <span className="font-medium text-gray-800">
            {Number(amount)?.toLocaleString('vi-VN')} VND
          </span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Ngày & Giờ:</span>
          <span className="font-medium text-gray-800">{new Date().toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Mã giao dịch:</span>
          <span className="font-medium text-gray-800">{idtrans}</span>
        </div>
      </div>

      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
      >
        Quay lại Trang chủ
      </button>
    </div>
  );
};

export default PaymentSuccess;
