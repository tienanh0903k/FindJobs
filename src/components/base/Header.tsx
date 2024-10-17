'use client';
import Image from 'next/image';
import Logo from '../../../public/img/Logo.png';
import AVT from '../../../public/img/phuongphong.png';
import { FaBell } from 'react-icons/fa';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import authApi from '@/api/authApi';
import { useRouter } from 'next/navigation';
import { useNotifyCustom } from '@/hook/Notification/useNotification';
import setLanguageValue from '@/app/api/auth/set-language/route';
import { useTranslations } from 'next-intl';
export const Header: React.FC = () => {
	const router = useRouter();

	const t = useTranslations();

	const [isLoading, setIsLoading] = useState(true);
	const [isScrolled, setIsScrolled] = useState(false);

	const currentUser: any = useSelector((state: RootState) => state.auth?.currentUser);
	//console.log("NGUOI DUNG HT---",currentUser);

	const { notifications, unreadCount, showNotifications, toggleNotifications } = useNotifyCustom();

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, []);

	const handleLanguageChange = async (event: any) => {
		const selectedLocale = event.target.value;
		await setLanguageValue(selectedLocale);
	};

	//handle logout
	const handleLogout = async () => {
		try {
			const res = await authApi.logOut();
			//console.log(res);
			localStorage.removeItem('user');
			router.push('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all border-b border-border-custom w-full ${
				isScrolled ? 'bg-custom-gradient py-2 shadow-md' : 'bg-custom-gradient py-4'
			}`}
		>
			<nav className="container flex justify-between items-center h-full w-[95%] mx-auto">
				<div className="w-24 h-10 relative mr-6">
					<Link href="/">
						<Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
					</Link>
				</div>
				{/* MENU & OPTION */}
				<div className="flex items-center w-full space-x-4">
					<ul className="flex space-x-4" style={{ flexBasis: '50%' }}>
						<li>
							<Link href="/" className="text-gray-400 hover:text-gray-600">
								{t('header.item1')}
							</Link>
						</li>
						<li>
							<Link href="/about" className="text-gray-400 hover:text-gray-700">
							{t('header.item2')}
							</Link>
						</li>
						<li>
							<Link href="/services" className="text-gray-400 hover:text-gray-700">
							{t('header.item3')}
							</Link>
						</li>
					</ul>
					<ul className="flex space-x-4 justify-end" style={{ flexBasis: '50%' }}>
						<li className="relative">
							<button className="relative text-white" onClick={toggleNotifications}>
								<FaBell className="h-6 w-6" />
								{unreadCount > 0 && (
									<span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
										{unreadCount}
									</span>
								)}
							</button>

							{/* Dropdown danh sách thông báo */}
							{showNotifications && (
								<div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
									<div className="py-2">
										{notifications.length === 0 ? (
											<p className="text-center text-gray-500">Không có thông báo</p>
										) : (
											notifications.map((notif) => (
												<div key={notif.id} className="px-4 py-2 border-b border-gray-200">
													<p className={`${notif.isRead ? 'text-gray-500' : 'text-black'}`}>
														{notif.message}
													</p>
												</div>
											))
										)}
									</div>
								</div>
							)}
						</li>

						<li className="relative group">
							{/* Container for user info and dropdown */}
							<div className="flex items-center gap-1 cursor-pointer">
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
										<div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
									</div>
								) : currentUser ? (
									<>
										<Image
											className="rounded-full"
											src={AVT}
											alt="User Avatar"
											width={25}
											height={25}
										/>
										<p className="text-white text-sm">Xin chào, {currentUser.user?.name}</p>
										{/* Dropdown menu */}
										<div className="absolute right-[-20px] top-full mt-2 w-40 bg-white shadow-lg opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
											<Link
												href="/profile"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Thông tin cá nhân
											</Link>
											{(currentUser?.user?.role === 'ADMIN' ||
												currentUser?.user?.role === 'HR') && (
												<Link
													href="/admin/dashboard"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Trang quản trị
												</Link>
											)}
											<button
												type="button"
												className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
												onClick={(e) => {
													e.preventDefault();
													handleLogout();
												}}
											>
												Đăng xuất
											</button>
										</div>
									</>
								) : (
									// Nếu chưa có currentUser (chưa đăng nhập)
									<Link href="/login" className="text-white">
										Đăng nhập
									</Link>
								)}
							</div>
						</li>
						<li>
							<select 
								onChange={handleLanguageChange} 
								className="bg-transparent text-white border-none focus:ring-0">
								<option className="text-black" value="en">
									EN
								</option>
								<option className="text-black" value="vi">
									VI
								</option>
							</select>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
