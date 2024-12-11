'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import { ItemJobs, ItemJobsTest } from '@/components/client/Jobs/ItemJobs';
import ApplyModal from '@/components/client/Jobs/ModalApply/Formapply';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import postsApi from '@/api/postsApi';
import moment from 'moment';

const cx = classNames.bind(styles);

const JobListing = () => {
	const { id } = useParams<{ id: string }>();
	const [isScrollActive, setIsScrollActive] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	

	// const fetch = async (id) => {
	// 	const data =  await  postsApi.getPostById(id);
	// 	console.log('-data', data);
	// 	return data
	// }
	const { id: jobId } = useParams<{ id: string }>();
	
	const { data, error, isLoading, isError } = useQuery({
		queryKey: ['job', id], 
		queryFn: async () => {
			if (!id) throw new Error('ID is required'); 
			const data = await postsApi.getPostById(id); 
			console.log('-data', data);
			return data;
		}
	});

	useEffect(() => {
		const handleScroll = () => {
			setIsScrollActive(window.scrollY > 100);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);


	
	const handleApply = async (formData: FormData) => {
		try {
		  const response = await fetch('http://localhost:3001/api/application/upload', {
			method: 'POST',
			body: formData,
		  });
	
		  if (response.ok) {
			alert('Nộp hồ sơ thành công!');
			setIsModalVisible(false);
		  } else {
			console.error('Nộp hồ sơ thất bại.');
		  }
		} catch (error) {
		  console.error('Lỗi khi nộp hồ sơ:', error);
		}
	  };

	return (
		<div className="h-[1500px] w-full relative">
			<div className={cx('gradient-background')}></div>
			<section className="mt-24 relative">
				<header className={cx('job-show-header', { 'scroll-active': isScrollActive })}>
					<div className={cx('ribbon-wrapper')}>
						<div className={cx('ribbon')}>Hot</div>
					</div>
					<div className="m-2 p-2 bg-gray-100 rounded-sm shadow-md box-border">
						<div className="job-info m-2 p-2 flex items-start flex-wrap">
							<div className="w-full ml-4 overflow-hidden">
								<h3 className="text-lg text-gray-500 font-semibold">Frontend Developer</h3>
								<h1 className="font-semibold text-lg md:text-xl leading-snug">
									{data?.position}
								</h1>
								<div className="flex flex-wrap gap-6 mt-2">
									<div className="flex items-center">
										<span>💰</span>
										<h4 className="text-base text-gray-500  font-semibold">
											Mức lương: {data?.salary}
										</h4>
									</div>
									<div className="flex items-center">
										<span>🗓️</span>
										<h4 className="text-base  text-gray-500 font-semibold">
											Hạn nộp hồ sơ: {
												moment(data?.deadline).format('DD/MM/YYYY')
											}
										</h4>
									</div>
									<div className="flex items-center">
										<span>📍</span>
										<h4 className="text-base  text-gray-500 font-semibold">
											Khu vực tuyển: {
												data?.location
											}
										</h4>
									</div>
								</div>
								<div className="flex flex-col md:flex-row justify-between mt-4">
									<div className="w-full md:w-[60%] flex">
										<button
											onClick={() => {
												setIsModalVisible(true);
											}}
											className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
										>
											Nộp hồ sơ
										</button>
										<button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition ml-2">
											Lưu
										</button>
									</div>
									<div className="flex flex-col items-start mt-4 md:mt-0">
										<div className="flex gap-4 text-sm text-gray-600">
											<span>🕒 Ngày cập nhật: 25/09/2024 08:42</span>
											<span>👁️ Lượt xem: 147</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

				<section className="m-4 p-4">
					<div className="flex flex-col lg:flex-row lg:space-x-8">
						<div className="lg:w-3/4 bg-white rounded-sm pb-4">
							<div className="flex mb-2">
								<button className="px-4 py-2 font-semibold text-blue-600 border-b-2 border-blue-600">
									Chi tiết tuyển dụng
								</button>
								<button className="px-4 py-2 font-semibold text-gray-600">Công ty</button>
							</div>
							<div className="px-2">
								<div className="text-2xl font-semibold p-2">Thông tin chung</div>
								<div className="bg-[#F5F3FF] px-4 pt-5 pb-1 mb-6">
									<div className="md:flex md:border-b border-[#DDD6FE] mb-4">
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Ngày đăng</p>
												<p className="text-14">{moment(data?.postedDate).format('DD/MM/YYYY')}</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Thời gian thử việc</p>
												<p className="text-14">25/09/2024</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Cấp bậc</p>
												<p className="text-14">{data?.level}</p>
											</h3>
										</div>
									</div>
									<div className="md:flex md:border-b border-[#DDD6FE] mb-4">
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Số lượng tuyển</p>
												<p className="text-14">{data?.numberOfPositions}</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Hình thức làm việc</p>
												<p className="text-14">Full time</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Ngày đăng</p>
												<p className="text-14">25/09/2024</p>
											</h3>
										</div>
									</div>
									<div className="md:flex md:border-b border-[#DDD6FE] mb-4">
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Yêu cầu bằng cấp</p>
												<p className="text-14">{data?.requirements}</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Email liên hệ</p>
												<p className="text-14">{data?.contactInfo}</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">Trang thai</p>
												<p className="text-14">{data?.status}</p>
											</h3>
										</div>
									</div>
								</div>

								<div className="jd px-2 m-2">
									<div className="text-2xl font-semibold p-2">Mô tả công việc</div>
									<div className="mb-2 text-14 break-words">
										<p>
											- Quản lý và phát triển thị trường sơn tại khu vực được phân công tại Hà Nội,
											Hải Phòng, Quảng Ninh, Nam Định, Thái Bình và các khu vực Phía Bắc
										</p>
										<p>- Lập kế hoạch kinh doanh theo tuần, tháng, quý năm</p>
										<p>- Lập kế hoạch công tác theo ngày, tuần</p>
										<p>
											- Báo cáo kết quả công việc theo ngày, tuần, tháng, năm cho giám đốc kinh
											doanh
										</p>
										<p>
											- Phát triển thị trường, mở mới khách hàng tại thị trường khu vực được giao.
										</p>
										<p>- Soạn thảo hợp đồng, báo giá cho khách hàng tại khu vực</p>
										<p>
											- Tư vấn cho giám đốc kinh doanh và ban lãnh đạo công ty về việc phát triển
											thương hiệu tại thị trường khu vực.
										</p>
										<p>- Thu hồi công nợ khách hàng tại khu vực quản lý.</p>
										<p>
											- Chăm sóc và phát triển khách hàng cũ của công ty tại địa bàn khu vực được
											giao.
										</p>
									</div>
								</div>

								<div className="jd px-2 m-2">
									<div className="text-2xl font-semibold p-2">Mô tả công việc</div>
									<div className="mb-2 text-14 break-words">
										<p>
											- Quản lý và phát triển thị trường sơn tại khu vực được phân công tại Hà Nội,
											Hải Phòng, Quảng Ninh, Nam Định, Thái Bình và các khu vực Phía Bắc
										</p>
										<p>- Lập kế hoạch kinh doanh theo tuần, tháng, quý năm</p>
										<p>- Lập kế hoạch công tác theo ngày, tuần</p>
										<p>
											- Báo cáo kết quả công việc theo ngày, tuần, tháng, năm cho giám đốc kinh
											doanh
										</p>
										<p>
											- Phát triển thị trường, mở mới khách hàng tại thị trường khu vực được giao.
										</p>
										<p>- Soạn thảo hợp đồng, báo giá cho khách hàng tại khu vực</p>
										<p>
											- Tư vấn cho giám đốc kinh doanh và ban lãnh đạo công ty về việc phát triển
											thương hiệu tại thị trường khu vực.
										</p>
										<p>- Thu hồi công nợ khách hàng tại khu vực quản lý.</p>
										<p>
											- Chăm sóc và phát triển khách hàng cũ của công ty tại địa bàn khu vực được
											giao.
										</p>
									</div>
								</div>

								<div className="">
									<h2 className=" text-24 font-semibold py-4">Địa điểm làm việc</h2>
									<div className="">
										<h3 className=" mb-2 flex text-14">
											<span className=" text-primary font-medium pt-[1px]">
												<i className=" svicon-map-marker-alt mr-1" />
											</span>
											<span className="">
												<span className=" text-primary font-medium pt-[1px] text-12">Hà Nội</span>,
												Số 68, Ngõ 10, Nguyễn Thị Định, Trung Hòa, Cầu Giấy
											</span>
										</h3>
										<h3 className=" mb-2 flex text-14">
											<span className=" text-primary font-medium pt-[1px]">
												<i className=" svicon-map-marker-alt mr-1" />
											</span>
											<span className="">
												<span className=" text-primary font-medium pt-[1px] text-12">TP.HCM</span>,
												Số nhà 22, Đường số 8, Hà Đô Centrosa, Phường 12, Quận 10
											</span>
										</h3>
										<h3 className=" mb-2 flex text-14">
											<span className=" text-primary font-medium pt-[1px]">
												<i className=" svicon-map-marker-alt mr-1" />
											</span>
											<span className="">
												<span className=" text-primary font-medium pt-[1px] text-12">Hà Nội</span>,
												39M2, Ngõ 37 Trần Kim Xuyến, Yên Hòa, Cầu Giấy
											</span>
										</h3>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:w-1/4 p-4">
							<div className="px-4 md:px-0 top-4 pb-2">
								{[...Array(6)].map((_, index) => (
									<div key={index} className="my-2">
										<ItemJobsTest />
									</div>
								))}
							</div>
						</div>

						<ApplyModal
							jobId={jobId}
							visible={isModalVisible}
							onCancel={() => setIsModalVisible(false)}
							onApply={handleApply}
						/>
					</div>
				</section>
			</section>
		</div>
	);
};

export default JobListing;
