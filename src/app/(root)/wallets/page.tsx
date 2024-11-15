// components/Wallet.tsx
'use client'
import React, { useState } from 'react';

const WalletPage = () => {
    // State to track the selected payment method
    const [selectedMethod, setSelectedMethod] = useState('DEBIT');

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 flex">
                {/* Left Side: Payment Methods */}
                <div className="flex-1 pr-4">
                    <h2 className="text-xl font-semibold mb-4">Chọn phương thức</h2>
                    <div className="mb-6">
                        {/* Debit Card */}
                        <div 
                            className={`border p-4 rounded-lg mb-4 cursor-pointer ${selectedMethod === 'DEBIT' ? 'border border-red-500' : ''}`}
                            onClick={() => setSelectedMethod('DEBIT')}
                        >
                            <h3 className="font-bold">VISA</h3>
                            <p className="text-sm">DEBIT</p>
                            <p className="text-gray-600">**** **** **** 8763</p>
                        </div>
                        {/* Credit Card */}
                        <div 
                            className={`border p-4 rounded-lg cursor-pointer ${selectedMethod === 'CREDIT' ? 'border border-red-500' : ''}`}
                            onClick={() => setSelectedMethod('CREDIT')}
                        >
                            <h3 className="font-bold">VISA</h3>
                            <p className="text-sm">CREDIT</p>
                            <p className="text-gray-600">**** **** **** 1792</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 hover:bg-blue-600">
                            NẠP TIỀN
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                            RÚT TIỀN
                        </button>
                    </div>
                </div>

                {/* Right Side: Account Balance and Transactions */}
                <div className="flex-1 pl-4">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">Số dư tài khoản</h2>
                        <p className="text-3xl text-green-500">€ 3,261.98</p>
                    </div>

                    <h3 className="font-semibold mb-2">Transactions</h3>
                    <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg mb-6">
                        <ul>
                            {/* Sample Transactions */}
                            <li className="flex justify-between p-2 border-b border-gray-200">
                                <span>Money Transfer Joanna</span>
                                <span className="text-green-500">+ €120.00</span>
                            </li>
                            <li className="flex justify-between p-2 border-b border-gray-200">
                                <span>Design eBook</span>
                                <span className="text-red-500">- €3.99</span>
                            </li>
                            <li className="flex justify-between p-2 border-b border-gray-200">
                                <span>Neon99</span>
                                <span className="text-red-500">- €12.49</span>
                            </li>
                            <li className="flex justify-between p-2 border-b border-gray-200">
                                <span>Wages</span>
                                <span className="text-green-500">+ €2600.00</span>
                            </li>
                            <li className="flex justify-between p-2 border-b border-gray-200">
                                <span>Pig&Heifer</span>
                                <span className="text-red-500">- €10.00</span>
                            </li>
                            <li className="flex justify-between p-2 border-b border-gray-200">
                                <span>Apple Store</span>
                                <span className="text-red-500">- €5.00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
