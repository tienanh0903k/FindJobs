'use client';
import Image from 'next/image';
import Logo from '../../../public/img/Logo.png';
import AVT from '../../../public/img/phuongphong.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import authApi from '@/api/auth';
import { useRouter } from 'next/navigation';
export const Header: React.FC = () => {
	const router = useRouter();

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
							{' '}
							{currentUser ? (
								<div className="flex items-center gap-1 cursor-pointer">
									<Image
										className="rounded-full"
										src={AVT}
										alt="User Avatar"
										width={25}
										height={25}
									/>
									{/* DROPLIST */}
									<div className="hidden group-hover:block absolute left-0 top-4 mt-2 w-40 bg-white shadow-lg">
										<a
											href="/profile"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Thông tin cá nhân
										</a>
										<a
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={(e) => {
												e.preventDefault();
												handleLogout();
											}}
										>
											Đăng xuất
										</a>
									</div>
								</div>
							) : (
								<Link href="/login" className="text-white">
									Đăng nhập
								</Link>
							)}
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
