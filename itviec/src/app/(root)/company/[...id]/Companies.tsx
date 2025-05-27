'use client';
import { Appreciate } from '@/components/client/Companies/Rating';
import React, { useEffect, useRef, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { MapLocation } from '@/components/client/Companies/Location';
import Image from '@/components/base/Image';
import companyApi from '@/api/companyApi';
import { useParams } from 'next/navigation';
import { followApi } from '@/api/followApi';
import { useCurrentUser } from '@/hook/useCurrentUser';
import { ICompany } from '@/app/types/interface';
import { useTranslations } from 'next-intl';
import { message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const Companies = () => {
	const params = useParams<{ id: string }>();
	const [isFollow, setIsFollow] = useState(false);
	const [company, setCompany] = useState<ICompany>();
	const [isLoading, setIsLoading] = useState(true);
	const currentUser: any = useCurrentUser();
	const t = useTranslations();

	console.log('----status----', isFollow)

	const commentRef = useRef<HTMLDivElement | null>(null); //use scrollIntoView
	const handleScrollToComment = () => {
		//console.log('ref', commentRef.current);
		commentRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	//*********side effect*************
	useEffect(() => {
		fetchInfoCompany();
	}, [params.id]);


	useEffect(() => {
		setIsLoading(true);
		const fetchFollowStatus = async () => {
			if (!currentUser) return;

			try {
				const data = await followApi.isFollow({
					companyId: params.id,
					userId: currentUser?._id,
				});
				const timer = setTimeout(() => {
					setIsLoading(false);
					setIsFollow(data);
				}, 2000);

				return () => clearTimeout(timer);
			} catch (error) {
				console.error('Error fetching follow status:', error);
				setIsFollow(false);
			}
		};

		fetchFollowStatus();
	}, [params.id, currentUser]);




	const fetchInfoCompany = async () => {
		const data = await companyApi.getCompanyById(params.id);
		setCompany(data || {});
	}


	// const checkIsFollow = async () => {
	// 	if (!!currentUser === false) {
	// 		return;
	// 	};	
	// 	const res = await followApi.isFollow({ companyId: params.id, userId: currentUser?._id });
	// 	setIsFollow(res.data);
	// }

	//event action

	// const handleFollow = async () => {
	// 	if (!currentUser) {
	// 		return;
	// 	}
	// 	const res = await followApi.follow({ companyId: params.id, userId: currentUser?._id });
	// 	setIsFollow(res.data);
	// }



	const toggleFollow = async () => {
		try {
			if (isFollow) {
				await followApi.unFollow({
					companyId: String(params.id),
					userId: currentUser?._id,
				});
				message.success({
					content: 'Unfollowed successfully',
					duration: 2,
					icon: <CheckOutlined />,
				});
				setIsFollow(false);
				setCompany((prev) =>
					prev && prev.followers !== undefined ? { ...prev, followers: prev.followers - 1 } : prev,
				);
			} else {
				const response = await followApi.follow({
					companyId: String(params.id),
					userId: currentUser?._id,
				});
				message.success({
					content: 'Followed successfully',
					duration: 2,
					icon: <CheckOutlined />,
				});
				setIsFollow(true);
				setCompany((prev) =>
					prev && prev.followers !== undefined ? { ...prev, followers: prev.followers + 1 } : prev,
				);
			}
		} catch (error) {
			console.error(error);
		}
	};


	//console.log('company', company);


	return (
		<main className="min-h-screen mt-[72px] bg-gray-100">
			<div className="mx-auto p-4 bg-custom-gradient">
				<div className="grid grid-cols-3 gap-4 h-full">
					<div className="col-span-2">
						<div className="flex items-center space-x-4">
							<div className="logo w-36 h-36 bg-white border-2 border-gray-300 rounded-sm overflow-hidden flex items-center justify-center">
								<Image
									src={
										company?.logo ||
										'https://media.licdn.com/dms/image/v2/C560BAQFRxbxHAl5oew/company-logo_200_200/company-logo_200_200/0/1630668147018/fpt_corporation_logo?e=2147483647&v=beta&t=WW03ljSGZoL6rHvwTqGDIlWDqttr8Jii1yHjHnFm8Xk'
									}
									alt="ANDPAD VietNam Co., Ltd Vietnam Big Logo"
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="flex flex-col w-full text-white">
								<h1 className="text-lg font-semibold">{company?.name}</h1>
								<div className="flex space-x-4">
									<div className="flex items-center space-x-1">
										<span>
											<FaLocationDot />
										</span>
										<div className="text-sm">{company?.address}</div>
									</div>
									<div className="flex items-center space-x-1">
										<span>
											<FaLaptopCode />
										</span>
										<div className="text-sm">3 việc làm đang tuyển dụng </div>
									</div>
									<div className="flex items-center space-x-1">
										<div>
											<FaUserCheck />
										</div>
										<div className="text-sm">{company?.followers} Follower</div>
									</div>
								</div>
								{/* <div className="flex space-x-4 mt-4">
									<button
										onClick={handleScrollToComment}
										className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
									>
										{t('company.btnReview')}
									</button>

									{currentUser && (
										<button
											onClick={toggleFollow}
											className={`${
												isFollow ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
											} text-white py-2 px-4 rounded`}
										>
											{isFollow ? 'Đang theo dõi' : 'Theo dõi'}
										</button>
									)}
								</div> */}

								{/* <div className="flex space-x-4 mt-4">
									{isLoading ? (
										<div className="w-28 h-10 bg-gray-300 rounded animate-pulse" />
									) : (
										<button
											onClick={handleScrollToComment}
											className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
										>
											{t('company.btnReview')}
										</button>
									)}

									{isLoading ? (
										<div className="w-28 h-10 bg-gray-300 rounded animate-pulse" />
									) : (
										currentUser && (
											<button
												onClick={toggleFollow}
												className={`${
													isFollow
														? 'bg-red-500 hover:bg-red-600'
														: 'bg-green-500 hover:bg-green-600'
												} text-white py-2 px-4 rounded`}
											>
												{isFollow ? t('company.following') : t('company.unfollow')}
											</button>
										)
									)}
								</div> */}
								<div className="flex space-x-4 mt-4">
									{/* Button Review */}
									{isLoading || !currentUser ? (
										<div className="w-28 h-10 bg-gray-300 rounded animate-pulse" />
									) : (
										<button
											onClick={handleScrollToComment}
											className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
										>
											{t('company.btnReview')}
										</button>
									)}

									{/* Follow/Unfollow Button */}
									{isLoading || !currentUser ? (
										<div className="w-28 h-10 bg-gray-300 rounded animate-pulse" />
									) : (
										currentUser && (
											<button
												onClick={toggleFollow}
												className={`${isFollow
														? 'bg-red-500 hover:bg-red-600'
														: 'bg-green-500 hover:bg-green-600'
													} text-white py-2 px-4 rounded`}
											>
												{isFollow ? t('company.following') : t('company.unfollow')}
											</button>
										)
									)}
								</div>

							</div>
						</div>
					</div>
					<div className="col-span-1 flex flex-col items-center justify-center space-y-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-4">
						<div className="flex items-center space-x-1">
							<h2 className="text-xl font-bold">4.9</h2>
							{[...Array(5)].map((_, index) => (
								<svg
									key={index}
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 .587l3.668 7.571 8.332 1.151-6 5.847 1.4 8.285L12 18.896l-7.4 4.545L6 15.156l-6-5.847 8.332-1.151z" />
								</svg>
							))}
						</div>

						<div className="text-gray-600 text-sm">4.5 trên 5 sao (200 đánh giá)</div>
					</div>
				</div>
			</div>

			<div className="mt-6 p-4">
				<div className="grid grid-cols-10 gap-4">
					<div className="col-span-7 p-4 space-y-4">
						<div className="border p-4 bg-white rounded-md shadow-sm">
							<h2 className="text-lg font-semibold">Thông tin chung</h2>
							<p>
								The global leading technology, outsourcing and IT services group headquartered in
								Vietnam with nearly US$2 billion in revenue and more than 27000 employees. Qualified
								with CMMI Level 5 & ISO 27001:2013, ASPICE LEVEL 3, FPT Software delivers
								world-class services in Smart factory, Digital platform, RPA, AI, IoT, Enterprise
								Mobilization, Cloud, AR/VR, Embedded System, Managed service, Testing, Platform
								modernization, Business Applications, Application Service, BPO and more services
								globally from delivery centers across the United States, Japan, Europe, Korea,
								China, Australia, Vietnam and the Asia Pacific.{' '}
							</p>
						</div>

						<div className="border p-4 bg-white rounded-md shadow-sm">
							<h2 className="text-lg font-semibold border-b border-gray-300 pb-2">
								Giới thiệu công ty
							</h2>
							<div className="">
								No.1 Construction Tech Company in Japan
								<p
									dangerouslySetInnerHTML={{
										__html: company && company.description ? company.description : '',
									}}
								/>{' '}
								{/* <p>
									ANDPAD Vietnam is part of ANDPAD Inc. and was established in early January 2022 in
									Vietnam Software engineers and development team in ANDPAD Vietnam enjoy dynamic
									roles of SaaS product development within an international working environment, not
									consuming tasks but more on creative engineering works for clients and users in
									the construction industry.
								</p> */}
							</div>
						</div>

						<div className="border p-4 bg-white rounded-md shadow-sm">
							<h2 className="text-lg font-semibold">Chuyên môn của chúng tôi</h2>
							<p>... Nội dung chuyên môn ở đây ...</p>
						</div>


						{/*-------------------------- Review --------------------------------------*/}
						<div ref={commentRef} className="comment border p-4 bg-white rounded-md shadow-sm">
							<Appreciate targetId={
								company?._id || ''
							} />
						</div>
					</div>


					<div className="col-span-3 p-4 overflow-y-auto h-screen">
						<h2 className="text-xl font-semibold">Các việc đang tuyển dụng</h2>
						<div className=" bg-orange-100 space-y-4">
							{/* Danh sách việc làm */}
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 1</h3>
								<p>Mô tả công việc 1...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							{/* Thêm các việc làm khác tại đây */}
						</div>
						<MapLocation
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2604040572227!2d105.71057761533163!3d9.780787529675702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0f68a0a8c781d%3A0xa88c255d7d2648f0!2zVHLGsOG7nW5nIMSQ4bqhaSBDw6F5IMOibiwgUGjGsOG7nW5nIEhpw6puLCBIw6AgR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1684845093647!5m2!1svi!2s"
						/>
					</div>
				</div>
			</div>
			{/* //Thông tin chung (chiem 7 pham ben trai)
            //cac viec dang tuyen (chiem 3 phan ben phai co scroll ben do) */}
		</main>
	);
};

export default Companies;
