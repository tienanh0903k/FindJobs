'use client';
import Image from 'next/image';
import Logo from '../../../public/img/logo2.png';
import AVT from '../../../public/img/phuongphong.png';
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import authApi from '@/api/authApi';
import { useRouter } from 'next/navigation';
import { useNotifyCustom } from '@/hook/Notification/useNotification';
import { POST as setLanguageValue} from '@/app/api/auth/set-language/route';
import { useTranslations } from 'next-intl';
import { Dropdown, Menu } from 'antd';
import SocketClient from '@/socket/socketClient';
import DropdownMenu from './DropDown';
// import { socket } from '@/socket/socketClient';

const Header: React.FC = () => {
	const router = useRouter();

	const t = useTranslations();

	const [isLoading, setIsLoading] = useState(true);
	const [isScrolled, setIsScrolled] = useState(false);

	const currentUser: any = useSelector((state: RootState) => state.auth?.currentUser);
	//console.log("NGUOI DUNG HT---",currentUser);

	const { notifications, unreadCount, showNotifications, toggleNotifications, isSeen } =
		useNotifyCustom(currentUser?.user?._id);

	//console.log('notifications', notifications)

	const socket = useMemo(() => {
		// const socket = connectSocket();
		// return socket.connect();
		const socket = SocketClient.getInstance();
		return socket;
	}, []);

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

	useEffect(() => {
		if (currentUser?.user?._id) {
			socket.emit('addUser', { userId: currentUser.user._id });
		}
	}, [currentUser]);

	useEffect(() => {
		console.log('Current listeners before registering:', socket.listeners('statusChanged').length);

		socket.on('statusChanged', (data: any) => {
			console.log('HEADER:', data);
			// Xử lý sự kiện...
		});

		console.log('Current listeners after registering:', socket.listeners('statusChanged').length);

		return () => {
			socket.off('statusChanged');
		};
	}, [socket]);

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
						<li className="relative group">
							<div className="flex items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer">
								<Link href="/" className="text-gray-400 hover:text-gray-600">
									{t('header.item1')}
								</Link>
								<i className="fas fa-chevron-down text-xs"></i>
								<div className="absolute top-5 left-0 w-full h-8 bg-black"></div>

								<DropdownMenu />
							</div>
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
						{/* <li className="relative">
							<button className="relative text-white" onClick={toggleNotifications}>
								<FaBell className="h-6 w-6" />
								{unreadCount > 0 && (
									<span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
										{unreadCount}
									</span>
								)}
							</button>

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
						</li> */}
						{/* <li className="relative">
							{currentUser && (
								<>
									<button className="relative text-white" onClick={toggleNotifications}>
										<FaBell className="h-6 w-6" />
										{unreadCount > 0 && (
											<span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
												{unreadCount}
											</span>
										)}
									</button>

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
								</>
							)}
						</li> */}

						<li className="relative">
							{currentUser && (
								<>
									<button className="relative text-white" onClick={toggleNotifications}>
										<FaBell className="h-6 w-6" />
										{unreadCount > 0 && (
											<span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
												{unreadCount}
											</span>
										)}
									</button>

									{/* Dropdown Thông Báo */}
									{showNotifications && (
										<div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
											<div
												className="py-2 max-h-64 overflow-y-auto cursor-pointer"
												style={{
													overflow: 'hidden',
													overflowY: 'scroll',
													scrollbarWidth: 'none',
													msOverflowStyle: 'none',
												}}
											>
												{notifications.length === 0 ? (
													<p className="text-center text-gray-500">Không có thông báo</p>
												) : (
													notifications
														.slice()
														.reverse()
														.map((notif) => (
															<div
																key={notif.id}
																className="px-4 py-2 border-b border-gray-200"
																onClick={() => {
																	if (!notif.isRead) {
																		isSeen(notif.id);
																	}
																}}
															>
																<p className={`${notif.isRead ? 'text-gray-500' : 'text-black'}`}>
																	{notif.notify}
																</p>
															</div>
														))
												)}
											</div>
										</div>
									)}
								</>
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

										{/* Use the greeting text as the dropdown trigger */}
										<Dropdown
											overlay={
												<Menu>
													{(currentUser?.user?.role === 'ADMIN' ||
														currentUser?.user?.role === 'HR') && (
														<Menu.Item key="admin">
															<Link
																href="/admin/dashboard"
																className="text-gray-700 hover:bg-gray-100"
															>
																Trang quản trị
															</Link>
														</Menu.Item>
													)}
													<Menu.Item key="profile">
														<Link href="/profile" className="text-gray-700 hover:bg-gray-100">
															Thông tin cá nhân
														</Link>
													</Menu.Item>

													<Menu.Item key="wallet">
														<Link href="/wallets" className="text-gray-700 hover:bg-gray-100">
															Số dư tài khoản
														</Link>
													</Menu.Item>

													<Menu.Item key="logout">
														<button
															type="button"
															className="block w-full text-gray-700 hover:bg-gray-100 text-left"
															onClick={(e) => {
																e.preventDefault();
																handleLogout();
															}}
														>
															Đăng xuất
														</button>
													</Menu.Item>
												</Menu>
											}
											trigger={['click']}
										>
											<a
												className="flex items-center text-white"
												onClick={(e) => e.preventDefault()}
											>
												<span className="text-sm">
													{t('home.hello')},{' '}
													{currentUser.user?.name ||
														currentUser.firstName + ' ' + currentUser.lastName}
												</span>
											</a>
										</Dropdown>
									</>
								) : (
									// Nếu chưa có currentUser (chưa đăng nhập)
									<Link href="/login" className="text-white">
										{t('home.buttonLogin')}
									</Link>
								)}
							</div>
						</li>

						<li>
							<select
								onChange={handleLanguageChange}
								className="bg-transparent text-white border-none focus:ring-0"
							>
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

export default Header;
