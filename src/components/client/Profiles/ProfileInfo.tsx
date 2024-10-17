'use client';
import Image from 'next/image';
import React from 'react';
import { FiEdit } from 'react-icons/fi';

export const ProfileInfo = () => {
	return (
		<div className="w-full min-h-screen p-2">
			<div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
				<div className="col-span-1 sm:col-span-3 h-fit bg-white p-2 border rounded-sm border-gray-200 shadow-md">
					<p className="font-semibold text-sm text-gray-600 mb-2">Độ hoàn thiện hồ sơ</p>
					<div className="flex flex-col sm:flex-row justify-around items-center">
						<div className="relative w-16 h-16">
							<svg
								className="absolute inset-0"
								viewBox="0 0 100 100"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="50"
									cy="50"
									r="45"
									stroke="gray"
									strokeWidth="10"
									fill="none"
								/>
								<circle
									cx="50"
									cy="50"
									r="45"
									stroke="red"
									strokeWidth="10"
									fill="none"
									strokeDasharray="283"
									strokeDashoffset="175"
									style={{ transition: 'stroke-dashoffset 0.3s' }}
									transform="rotate(270 50 50)"
								/>
							</svg>
						</div>
						<div className="text-center sm:text-left mt-2 sm:mt-0">
							<strong className="text-xl">Tương đối</strong>
							<h3 className="text-2xl font-bold text-blue-600 mt-1">38%</h3>
							<strong className="ml-1">hoàn thành</strong>
						</div>
					</div>

					<hr className="my-4 border border-b-1 border-gray-200"></hr>

					<h3 className="font-bold">Nâng cấp hồ sơ lên mức Rất tốt để tải CV</h3>
					<div className="flex flex-col items-center space-y-2">
						{[...Array(4)].map((_, index) => (
							<div key={index} className="w-full">
								<button className="flex items-center p-2 rounded-md font-semibold text-blue-600 border-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="0 0 20 20"
									>
										<path
											fill="currentColor"
											d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
										/>
									</svg>
									<span className="ml-2">Thêm Thông tin cá nhân</span>
								</button>
							</div>
						))}
					</div>

					<hr className="my-4 border border-b-1 border-gray-200"></hr>

					<div className="flex items-center justify-between gap-2">
						<Image
							src="https://itviec.com/assets/profile/cv-d4db00ef4c885c25e437715236babd64c7cbb960ddf4771e69e55dd8169dd5ba.svg"
							alt="CV Icon"
							width={40}
							height={40}
						/>
						<div className="text-sm text-gray-600">
							Lựa chọn mẫu CV phù hợp và tải xuống
						</div>
					</div>

					<div className="bg-white my-4">
						<a
							className="bg-red-700 p-2 w-full block text-center text-white"
							href="/ho-so-cv/mau-cv"
						>
							Xem và Tải CV
						</a>
					</div>
				</div>
				<div className="col-span-1 sm:col-span-9 h-full bg-white p-2 border rounded-sm border-gray-200 shadow-md">
					<div className="w-full mx-auto p-4">
						{/* Personal Information Section */}
						<section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
							<div className="flex flex-col sm:flex-row items-center">
								<div className="w-24 h-24">
									<img
										className="rounded-full object-cover"
										src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeHJYVEE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b2fd7486ad904864754c2e306b83f46c9c34b30c/ACg8ocJywPG2C-sf0Q73WUEhuSnSq3ROmBfJT30RXf-NG3OniSfT4zE=s96-c.jpg"
										alt="Profile"
									/>
								</div>
								<div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left">
									<h3 className="text-lg font-semibold">Nguyen Tien Anh</h3>
									<p className="text-gray-700">johndoe@example.com</p>
									<p className="text-gray-700">0123456789</p>
								</div>
							</div>
							<button className="text-white mt-4 absolute top-0 right-2 border-none">
								<FiEdit className="text-blue-500 font-bold" />
							</button>
						</section>

						{/* Skills Section */}
						<section className="border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Kỹ năng</h2>
							<div className="flex flex-wrap gap-2">
								{['ReactJS', 'TypeScript', 'JavaScript', 'NodeJS'].map((skill) => (
									<span
										key={skill}
										className="bg-emerald-200 text-emerald-800 py-1 px-3"
									>
										{skill}
									</span>
								))}
							</div>
						</section>

						{/* Education Section */}
						<section className="border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Học vấn</h2>
							<div>
								<h3 className="text-lg font-semibold">
									Đại học Công nghệ Thông tin
								</h3>
								<p className="text-gray-700">Cử nhân Khoa học Máy tính</p>
								<p className="text-gray-700">2016 - 2020</p>
							</div>
						</section>

						{/* Projects Section */}
						<section className="border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Dự án</h2>
							{['Project A', 'Project B'].map((project, index) => (
								<div key={index} className="mt-4">
									<h3 className="text-lg font-semibold">{project}</h3>
									<p className="text-gray-700">Description of {project}</p>
								</div>
							))}
						</section>

						{/* Work Experience Section */}
						<section className="border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Kinh nghiệm làm việc</h2>
							{['Company A', 'Company B'].map((company, index) => (
								<div key={index} className="mt-4">
									<h3 className="text-lg font-semibold">{company}</h3>
									<p className="text-gray-700">Position at {company}</p>
									<p className="text-gray-700">Responsibilities at {company}</p>
								</div>
							))}
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
