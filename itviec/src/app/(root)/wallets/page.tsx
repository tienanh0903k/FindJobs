'use client';
import { transactionApi } from '@/api/transactionApi';
import { useAppSelector } from '@/hook/useSelector';
import { RootState } from '@/redux/store';
import React, { useState, useEffect } from 'react';

const PRESET_AMOUNTS = [10000, 50000, 100000, 500000];

const WalletPage = () => {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const infoUser = useAppSelector((state: RootState) => state.auth.currentUser?.user);
	

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await transactionApi.getTransactionByMe();
				setTransactions(res.data);
			} catch (err) {
				setTransactions([]);
			} finally {
				setLoading(false);
			}
		};
		fetchTransactions();
	}, []);

	const calculateBalance = (transactions: any[]) => {
		return transactions.reduce((sum, tx) => {
			if (tx.type === 'deposit') return sum + tx.amount;
			else if (tx.type === 'spend' || tx.type === 'withdraw') return sum - tx.amount;
			return sum;
		}, 0);
	};

	// Xử lý chọn mức nạp
	const handleSelectAmount = async (amount: number) => {
		setShowModal(false);
        if (!infoUser?._id) {
            alert('Bạn chưa đăng nhập!');
            return;
        }
		try {
			const res = await transactionApi.createZaloPayOrder(amount, infoUser?._id);
			if (res.data?.order_url) {
				window.open(res.data.order_url, '_blank');
			} else {
				alert('Không lấy được link thanh toán!');
			}
		} catch (err) {
			alert('Có lỗi khi tạo giao dịch nạp tiền!');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 flex flex-col items-center">
				{/* Số dư tài khoản */}
				<div className="text-center mb-6">
					<h2 className="text-2xl font-bold">Số dư tài khoản</h2>
					<p className="text-3xl text-green-500">
						{calculateBalance(transactions).toLocaleString()}₫
					</p>
				</div>

				{/* Lịch sử giao dịch */}
				<h3 className="font-semibold mb-2 self-start">Lịch sử giao dịch</h3>
				<div className="w-full max-h-48 overflow-y-auto border border-gray-300 rounded-lg mb-2">
					<ul>
						{loading ? (
							<li className="p-2 text-center text-gray-400">Đang tải...</li>
						) : transactions.length === 0 ? (
							<li className="p-2 text-center text-gray-400">Không có giao dịch</li>
						) : (
							transactions.map((tx, idx) => (
								<li
									key={tx._id || idx}
									className="flex justify-between p-2 border-b border-gray-200"
								>
									<span>
										{tx.type === 'deposit' ? 'Nạp tiền' : tx.type}{' '}
										<span className="text-xs text-gray-400">
											({new Date(tx.createdAt).toLocaleString()})
										</span>
									</span>
									<span className="text-green-500">
										{tx.type === 'deposit' ? '+' : '-'}
										{tx.amount.toLocaleString()}₫
									</span>
								</li>
							))
						)}
					</ul>
				</div>

				{/* Nút nạp tiền */}
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600 transition"
				>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlp4qW2M8xPofmuZHwEfGi9mNMWUG0zs53A&s"
						alt="ZaloPay"
						className="h-7 w-7 mr-2"
					/>
					NẠP TIỀN QUA ZALOPAY
				</button>

				{/* Modal chọn số tiền */}
				{showModal && (
					<div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex justify-center items-center">
						<div className="bg-white rounded-xl shadow-xl px-8 py-6 w-full max-w-xs flex flex-col items-center relative">
							<button
								onClick={() => setShowModal(false)}
								className="absolute right-3 top-3 text-xl font-bold text-gray-400 hover:text-red-500"
							>
								×
							</button>
							<h2 className="text-xl font-bold mb-4">Chọn số tiền muốn nạp</h2>
							<div className="flex flex-col gap-3 w-full">
								{PRESET_AMOUNTS.map((amount) => (
									<button
										key={amount}
										onClick={() => handleSelectAmount(amount)}
										className="w-full py-2 rounded-lg border border-blue-400 font-semibold text-lg bg-blue-50 hover:bg-blue-100 transition"
									>
										{amount.toLocaleString()}₫
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default WalletPage;
