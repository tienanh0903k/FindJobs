'use client';

import ModalGlobal from '@/components/base/ModalGlobal';
import useModal from '@/hook/useModal';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import PersonalModal from './Modal/PersonalModal';
import SkillsModal from './Modal/SkillsModal';
import RenderModalContent from './Modal/renderModalContent';
import { Skeleton, Tooltip } from 'antd';
import userApi from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';
import { IUserType } from '@/app/types/interface';
import Image from '@/components/base/Image';
import { getModalTitle } from '@/lib/helper';

export enum ModalType {
	PERSONAL = 'personal',
	EDUCATION = 'education',
	EXPERIENCE = 'experience',
	INTRODUCE = 'introduce',
	SKILLS = 'skills',
	PROJECTS = 'projects',
	CERTIFICATES = 'certificates',
	AWARDS = 'awards',
}

export const ProfileInfo = () => {
	const { modalType, visible, openModal, closeModal } = useModal();

	//call skill by user
	const [skills, setSkills] = useState(['ReactJS', 'TypeScript', 'JavaScript', 'NodeJS']);

	//get api get me
	// const [data, setData] = useState<IUserType>();
	// useEffect(() => {
	// 	const fetchMe = async () => {
	// 		try {
	// 			const response = await userApi.getMe();
	// 			const data = await response;
	// 			console.log(data);
	// 			setData(data)
	// 		} catch (error) {
	// 			console.error('Error fetching me:', error);
	// 		}
	// 	}
	// 	fetchMe();
	// }, []);

	// app-index.js:33 Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ["me"]
	//useQuery
	const { data, isFetching, isSuccess, isError, error } = useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			try {
				const response = await userApi.getMe();

				if (!response || !response.data) {
					throw new Error('Dữ liệu bị undefined');
				}

				return response.data;
			} catch (err) {
				console.error(err);
			}
		},
	});

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
								<circle cx="50" cy="50" r="45" stroke="gray" strokeWidth="10" fill="none" />
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
						<div className="text-sm text-gray-600">Lựa chọn mẫu CV phù hợp và tải xuống</div>
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
									<Image
										src={data?.avatar || 'https://via.placeholder.com/150'}
										alt="Profile"
										className="rounded-full object-cover"
										width={150}
										height={150}
									/>
								</div>

								<div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left">
									{isSuccess ? (
										<div className="text-lg font-semibold text-gray-900">{data?.fullName}</div>
									) : (
										<div
											className={`h-6 bg-gray-300 rounded ${
												isFetching ? 'animate-pulse' : ''
											} mb-2`}
											style={{ width: '200px' }}
										/>
									)}

									<div className="flex flex-col sm:flex-row sm:gap-6 mt-2">
										<div className="content">
											{isSuccess ? (
												<>
													<p className="text-gray-700">{data?.position}</p>
													<p className="text-gray-700">{data?.email}</p>
													<p className="text-gray-700">0123456789</p>
												</>
											) : (
												<>
													<div
														className={`h-4 bg-gray-300 rounded ${
															isFetching ? 'animate-pulse' : ''
														} mb-2`}
														style={{ width: '250px' }}
													/>
													<div
														className={`h-4 bg-gray-300 rounded ${
															isFetching ? 'animate-pulse' : ''
														} mb-2`}
														style={{ width: '250px' }}
													/>
													<div
														className={`h-4 bg-gray-300 rounded ${
															isFetching ? 'animate-pulse' : ''
														}`}
														style={{ width: '150px' }}
													/>
												</>
											)}
										</div>
										<div className="content">
											{isSuccess ? (
												<>
													<p className="text-gray-700">Nam</p>
													<p className="text-gray-700">01/01/2000</p>
													<p className="text-gray-700">Information</p>
												</>
											) : (
												<>
													<div
														className={`h-4 bg-gray-300 rounded ${
															isSuccess ? 'animate-pulse' : ''
														} mb-2`}
														style={{ width: '250px' }}
													/>
													<div
														className={`h-4 bg-gray-300 rounded ${
															isSuccess ? 'animate-pulse' : ''
														} mb-2`}
														style={{ width: '250px' }}
													/>
													<div
														className={`h-4 bg-gray-300 rounded ${
															isSuccess ? 'animate-pulse' : ''
														}`}
														style={{ width: '200px' }}
													/>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<button
								className="text-white mt-4 absolute top-0 right-2 border-none"
								onClick={() => openModal(ModalType.PERSONAL)}
							>
								<FiEdit className="text-blue-500 font-bold" />
							</button>
						</section>

						<section className="relative min-h-[100px] border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Thông tin giới thiệu</h2>
							<div
								className={`text-gray-800 ${data?.introduce ? 'text-gray-500' : ''} ${
									isFetching ? 'animate-pulse bg-gray-300' : ''
								}`}
								style={{ height: isFetching ? '20px' : 'auto' }} 
							>
								{isFetching ? (
									<div className="h-4 bg-gray-300 rounded w-3/4" /> 
								) : (
									data?.introduce || 'Chưa cung cấp thông tin giới thiệu'
								)}
							</div>
							<button
								className="text-white mt-4 absolute top-0 right-2 border-none"
								onClick={() => openModal(ModalType.INTRODUCE)}
							>
								<FiEdit className="text-blue-500 font-bold" />
							</button>
						</section>

						{/* Skills Section */}
						<section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Kỹ năng</h2>
							<div className="flex flex-wrap gap-2">
								{['ReactJS', 'TypeScript', 'JavaScript', 'NodeJS'].map((skill) => (
									<span key={skill} className="bg-emerald-200 text-emerald-800 py-1 px-3">
										{skill}
									</span>
								))}
							</div>
							<button
								className="absolute text-white mt-4 top-0 right-2 border-none"
								onClick={() => openModal(ModalType.EDUCATION)}
							>
								<FiEdit className="text-blue-500 font-bold" />
							</button>
						</section>

						{/* Education Section */}
						<section className="border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Học vấn</h2>
							<div>
								<h3 className="text-lg font-semibold">Đại học Công nghệ Thông tin</h3>
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
						<section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Kinh nghiệm làm việc</h2>
							{['Company A', 'Company B'].map((company, index) => (
								<div key={index} className="mt-4">
									<h3 className="text-lg font-semibold">{company}</h3>
									<p className="text-gray-700">Position at {company}</p>
									<p className="text-gray-700">Responsibilities at {company}</p>
								</div>
							))}
							<Tooltip title="Chỉnh sửa kinh nghiệm" placement="top">
								<button
									className="text-white mt-4 absolute top-0 right-2 border-none"
									onClick={() => openModal(ModalType.EXPERIENCE)}
								>
									<FiEdit className="text-blue-500 font-bold" />
								</button>
							</Tooltip>
						</section>

						<ModalGlobal
							visible={visible}
							close={closeModal}
							title={getModalTitle(modalType)}
						>
							{RenderModalContent(modalType as ModalType, closeModal)}
						</ModalGlobal>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
