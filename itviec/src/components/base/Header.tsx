'use client';
import Image from 'next/image';
import Logo from '../../../public/img/Logo.png';
import AVT from '../../../public/img/phuongphong.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import authApi from '@/api/authApi';
import { useRouter } from 'next/navigation';
export const Header: React.FC = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [isScrolled, setIsScrolled] = useState(false);
	const currentUser = useSelector((state: RootState) => state.auth.currentUser);
	//console.log(currentUser);
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

	//handle logout
	const handleLogout = async () => {
		try {
			const res = await authApi.logOut();
			console.log(res);
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
								Việc Làm IT
							</Link>
						</li>
						<li>
							<Link href="/about" className="text-gray-400 hover:text-gray-700">
								Top Công ty IT
							</Link>
						</li>
						<li>
							<Link href="/services" className="text-gray-400 hover:text-gray-700">
								Blog
							</Link>
						</li>
					</ul>
					<ul className="flex space-x-4 justify-end" style={{ flexBasis: '50%' }}>
						<li className="relative group">
							{/* Container for user info and dropdown */}
							<div className="flex items-center gap-1 cursor-pointer">
								{isLoading ? ( // Kiểm tra nếu đang tải
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
										<div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
									</div>
								) : currentUser ? ( // Nếu đã có currentUser
									<>
										<Image
											className="rounded-full"
											src={AVT}
											alt="User Avatar"
											width={25}
											height={25}
										/>
										<p className="text-white text-sm">
											Xin chào, {currentUser.user?.name}
										</p>
										{/* Dropdown menu */}
										<div className="absolute right-[-20px] top-full mt-2 w-40 bg-white shadow-lg opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
											<Link
												href="/profile"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Thông tin cá nhân
											</Link>
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
							<select className="bg-transparent text-white border-none focus:ring-0">
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
