'use client';

import ModalGlobal from '@/components/base/ModalGlobal';
import useModal from '@/hook/useModal';
import React, { useEffect, useRef, useState } from 'react';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import RenderModalContent from './Modal/renderModalContent';
import { message, Progress, Skeleton, Tooltip } from 'antd';
import userApi from '@/api/userApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Award, Certificate, IUserQuery, IUserType } from '@/app/types/interface';
import Image from '@/components/base/Image';
import { getModalTitle } from '@/lib/helper';
import SectionListBlock from './SectionLabel';
import { useAppSelector } from '@/hook/useSelector';
import { RootState } from '@/redux/store';
import { profileApi } from '@/api/profileApi';

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
	const queryClient = useQueryClient();
	const { modalType, visible, modalData, openModal, closeModal } = useModal();
	const [formData, setFormData] = useState<IUserType | null>(null);

	//call skill by user
	const [skills, setSkills] = useState(['ReactJS', 'TypeScript', 'JavaScript', 'NodeJS']);
	const [percent, setPercent] = useState(0);

	const infoUser = useAppSelector((state: RootState) => state.auth.currentUser?.user);

	const [isAvatarHover, setIsAvatarHover] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

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

	useEffect(() => {
		const timer = setTimeout(() => {
			setPercent(37.9);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	console.log('parent', formData);

	//useQuery
	const { data, isFetching, isSuccess, isError, error }: IUserQuery = useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			try {
				const { data } = await userApi.getMe();
				if (!data) throw new Error('User not found');
				console.log('User data:', data);
				return data;
			} catch (err) {
				console.error(err);
				throw err;
			}
		},

		refetchOnWindowFocus: false,
	});

	//mutation
	const mutation = useMutation({
		mutationFn: userApi.updateMe,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['me'],
			});
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// const handleSave = async (data: any, type: ModalType) => {
	// 	setFormData(prev => {
	// 		console.log("prev", prev);
	// 		return {
	// 			...prev,
	// 			...data
	// 		}
	// 	})
	// 	try {
	// 		await mutation.mutateAsync(data);
	// 		console.log("Updated user:", data);
	// 	} catch (error) {
	// 		console.error('Error updating user:', error);
	// 	}
	// 	console.log('>>>', data, type, infoUser?._id);
	// 	try {
	// 		if (!infoUser?._id) {
	// 			message.error('Có lỗi khi lưu dữ liệu!');
	// 			return;
	// 		}
	// 		if (type === ModalType.PROJECTS) {
	// 			await profileApi.postProject(infoUser?._id, data);
	// 			message.success('Thêm dự án thành công!');
	// 		}

	// 		queryClient.invalidateQueries({ queryKey: ['me'] });
	// 		closeModal(); // Đóng modal sau khi refetch xong
	// 	} catch (error) {
	// 		message.error('Có lỗi khi lưu dữ liệu!');
	// 	}
	// };

	const handleSave = async (data: any, type: ModalType) => {
		setFormData((prev) => ({
			...prev,
			...data,
		}));

		try {
			if (!infoUser?._id) {
				message.error('Có lỗi khi lưu dữ liệu!');
				return;
			}

			if (type === ModalType.PROJECTS) {
				// Gọi API thêm dự án
				await profileApi.postProject(infoUser._id, data);
				message.success('Thêm dự án thành công!');
			} else {
				await mutation.mutateAsync(data);
				message.success('Cập nhật thành công!');
			}

			queryClient.invalidateQueries({ queryKey: ['me'] });
		} catch (error) {
			console.error(error);
			message.error('Có lỗi khi lưu dữ liệu!');
		}
	};

	//handle avater change
	const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file || !infoUser?._id) return;
		console.log('file', file);
		try {
			const res = await profileApi.uploadAvatar(infoUser._id, file);
			message.success('Cập nhật ảnh đại diện thành công!');
			queryClient.invalidateQueries({ queryKey: ['me'] });
		} catch (err) {
			message.error('Cập nhật ảnh đại diện thất bại!');
		}
	};

	const handleDeleteArrayItem = async (
		arrayField: string,
		itemId: string,
		successMessage?: string,
	) => {
		if (!infoUser?._id) {
			message.error('Không tìm thấy user');
			return;
		}
		try {
			await profileApi.deleteArrayItem(infoUser._id, arrayField, itemId);
			message.success(successMessage || 'Xóa thành công');
			queryClient.invalidateQueries({ queryKey: ['me'] });
		} catch (error) {
			console.error(error);
			message.error('Có lỗi khi xóa dữ liệu');
		}
	};

	return (
		<div className="w-full min-h-screen p-2">
			<div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
				<div className="col-span-1 sm:col-span-3 h-fit bg-white p-2 border rounded-sm border-gray-200 shadow-md">
					<p className="font-semibold text-sm text-gray-600 mb-2">Độ hoàn thiện hồ sơ</p>
					<div className="flex flex-col sm:flex-row justify-around items-center">
						<Progress strokeColor="red" type="circle" percent={37.9} size={80} />
						<div className="text-center sm:text-left mt-2 sm:mt-0">
							<strong className="text-xl">Tương đối</strong>
							<h3 className="text-2xl font-bold text-blue-600 mt-1">{percent}%</h3>
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
						<a className="bg-red-700 p-2 w-full block text-center text-white" href="/custom-resume">
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
								{/* <div className="w-24 h-24">
									<Image
										src={data?.avatar || 'https://via.placeholder.com/150'}
										alt="Profile"
										className="rounded-full object-cover"
										width={150}
										height={150}
									/>
								</div> */}
								{/* <div
									className="w-24 h-24 relative group border-4 border-blue-300 rounded-full"
									onMouseEnter={() => setIsAvatarHover(true)}
									onMouseLeave={() => setIsAvatarHover(false)}
								>
									<Image
										src={data?.avatar || 'https://via.placeholder.com/150'}
										alt="ㅤ"
										className="rounded-full object-cover"
										width={150}
										height={150}
									/>
									{isAvatarHover && (
										<div
											className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer"
											onClick={() => fileInputRef.current?.click()}
										>
											<FiEdit className="text-white text-2xl" />
											<input
												type="file"
												accept="image/*"
												ref={fileInputRef}
												style={{ display: 'none' }}
												onChange={handleAvatarChange}
											/>
										</div>
									)}
								</div> */}
								<div
									className="w-24 h-24 relative group border-4 border-blue-300 rounded-full overflow-hidden"
									onMouseEnter={() => setIsAvatarHover(true)}
									onMouseLeave={() => setIsAvatarHover(false)}
								>
									<Image
										src={data?.avatar || 'https://via.placeholder.com/150'}
										alt="ㅤ"
										className="w-full h-full object-cover rounded-full"
										width={150}
										height={150}
									/>
									{/* Overlay icon, chỉ hiện khi hover */}
									{isAvatarHover && (
										<div
											className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer z-10"
											onClick={() => fileInputRef.current?.click()}
										>
											<FiEdit className="text-white text-2xl" />
										</div>
									)}
									{/* Input file LUÔN LUÔN xuất hiện, không điều kiện */}
									<input
										type="file"
										accept="image/*"
										ref={fileInputRef}
										style={{ display: 'none' }}
										onChange={handleAvatarChange}
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
								className={`text-gray-800 ${data?.introduction ? 'text-gray-500' : ''} ${
									isFetching ? 'animate-pulse bg-gray-300' : ''
								}`}
								style={{ height: isFetching ? '20px' : 'auto' }}
							>
								{isFetching ? (
									<div className="h-4 bg-gray-300 rounded w-3/4" />
								) : (
									<div
										dangerouslySetInnerHTML={{
											__html: data?.introduction || 'Chưa cung cấp thông tin giới thiệu',
										}}
									/>
								)}
							</div>
							<button
								className="text-white mt-4 absolute top-0 right-2 border-none"
								onClick={() => {
									openModal(ModalType.INTRODUCE, {
										introduction: data?.introduction,
									});
								}}
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
								onClick={() => openModal(ModalType.SKILLS)}
							>
								<FiEdit className="text-blue-500 font-bold" />
							</button>
						</section>

						{/* Education Section */}
						<section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Học vấn</h2>
							<div>
								<h3 className="text-lg font-semibold">Đại học Công nghệ Thông tin</h3>
								<p className="text-gray-700">Cử nhân Khoa học Máy tính</p>
								<p className="text-gray-700">2016 - 2020</p>
							</div>

							<button
								className="absolute text-white mt-4 top-0 right-2 border-none"
								onClick={() => openModal(ModalType.EDUCATION)}
							>
								<FiEdit className="text-blue-500 font-bold" />
							</button>
						</section>

						{/* Projects Section */}
						{/* <section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Dự án</h2>
							{data?.projects.map((project: any, index: any) => (
								<div key={index} className="mt-4 relative">
									<h3 className="text-lg font-semibold">{project.name}</h3>
									<p className="text-gray-700">Description of {project.description}</p>
									<div className="absolute top-0 right-0 flex space-x-2">
										<button
											className="text-blue-500 hover:text-blue-700 focus:outline-none"
											// onClick={() => openModal(ModalType.PROJECTS, project)}
										>
											<FiEdit className="font-bold" />
										</button>
										<button className="text-red-500 hover:text-red-700 focus:outline-none">
											<FiTrash className="font-bold" />
										</button>
									</div>
								</div>
							))}
							<button
								className="absolute text-white mt-4 top-0 right-2 border-none"
								onClick={() => openModal(ModalType.PROJECTS)}
							>
								<FiPlus className="text-blue-500 font-bold" />
							</button>
						</section> */}
						<section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Dự án</h2>
							{(!data?.projects || data.projects.length === 0) && (
								<div className="text-gray-500 italic mb-4">Chưa có dự án nào</div>
							)}
							{data?.projects.map((project: any, index: number) => (
								<div key={index} className="mt-4 relative border-b pb-3 last:border-b-0">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-lg font-semibold mb-1">{project.title}</h3>
											<div className="flex flex-wrap gap-4 mb-1 text-sm text-gray-700">
												{project.role && (
													<span>
														<b>Vai trò:</b> {project.role}
													</span>
												)}
												{project.year && (
													<span>
														<b>Năm:</b> {project.year}
													</span>
												)}
											</div>
											{project.description && (
												<p className="text-gray-700 mb-1">
													<b>Mô tả:</b> {project.description}
												</p>
											)}
											{project.link && (
												<a
													href={project.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 hover:underline text-sm"
												>
													{project.link}
												</a>
											)}
										</div>
										<div className="flex space-x-2">
											<button
												className="text-blue-500 hover:text-blue-700 focus:outline-none"
												onClick={() => openModal(ModalType.PROJECTS, project)}
												title="Chỉnh sửa dự án"
											>
												<FiEdit className="font-bold" />
											</button>
											<button
												className="text-red-500 hover:text-red-700 focus:outline-none"
												// onClick={...} // Xử lý xóa ở đây nếu cần
												title="Xóa dự án"
											>
												<FiTrash className="font-bold" />
											</button>
										</div>
									</div>
								</div>
							))}
							<button
								className="absolute text-white mt-4 top-0 right-2 border-none"
								onClick={() => openModal(ModalType.PROJECTS)}
								title="Thêm dự án mới"
							>
								<FiPlus className="text-blue-500 font-bold" />
							</button>
						</section>

						<section className="relative border bg-white p-4 mb-4 shadow-sm">
							<h2 className="text-xl font-semibold mb-4">Kinh nghiệm làm việc</h2>

							{!data?.workExperience || data.workExperience.length === 0 ? (
								<div className="text-gray-500 italic mb-4">Chưa có kinh nghiệm làm việc nào</div>
							) : (
								data.workExperience.map((item: any, index: number) => (
									<div key={index} className="mt-4 relative border-b pb-3 last:border-b-0">
										<h3 className="text-lg font-semibold">{item.companyName}</h3>
										<p className="text-gray-700">Vị trí: {item.position}</p>
										<p className="text-gray-700">
											Thời gian: {new Date(item.startDate).toLocaleDateString()} -{' '}
											{item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Hiện tại'}
										</p>

										{/* Nút sửa và xóa */}
										<div className="absolute top-0 right-0 flex space-x-2">
											<button
												className="text-blue-500 hover:text-blue-700 focus:outline-none"
												onClick={() => openModal(ModalType.EXPERIENCE, item)}
												title="Chỉnh sửa kinh nghiệm"
											>
												<FiEdit className="font-bold" />
											</button>
											<button
												className="text-red-500 hover:text-red-700 focus:outline-none"
												onClick={() =>
													handleDeleteArrayItem(
														'workExperience',
														item._id,
														'Xóa kinh nghiệm thành công',
													)
												}
												title="Xóa kinh nghiệm"
											>
												<FiTrash className="font-bold" />
											</button>
										</div>
									</div>
								))
							)}

							{/* Nút thêm mới */}
							<button
								className="absolute text-white mt-4 top-0 right-2 border-none"
								onClick={() => openModal(ModalType.EXPERIENCE)}
								title="Thêm kinh nghiệm mới"
							>
								<FiPlus className="text-blue-500 font-bold" />
							</button>
						</section>

						{/* Certificates Section */}
						<SectionListBlock<Certificate>
							title="Chứng chỉ"
							items={data?.certifications || []}
							fields={['name', 'organization', 'year']}
							onAdd={() => openModal(ModalType.CERTIFICATES)}
							onEdit={(cert) => openModal(ModalType.CERTIFICATES, cert)}
							onDelete={(cert) => {}}
							emptyText="Chưa có chứng chỉ nào"
						/>

						{/* Awards Section */}
						<SectionListBlock<Award>
							title="Giải thưởng"
							items={data?.awards || []}
							fields={['name', 'organization', 'year']}
							onAdd={() => openModal(ModalType.AWARDS)}
							onEdit={(award) => openModal(ModalType.AWARDS, award)}
							onDelete={(award) => {
								// Tùy API, ví dụ:
								// await userApi.deleteAward(award.id);
								// queryClient.invalidateQueries({ queryKey: ['me'] });
							}}
							emptyText="Chưa có giải thưởng nào"
						/>

						<ModalGlobal visible={visible} close={closeModal} title={getModalTitle(modalType)}>
							{RenderModalContent(modalType as ModalType, closeModal, modalData, (data: any) => {
								console.log('data', data);
								handleSave(data, modalType as ModalType);
							})}
						</ModalGlobal>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
