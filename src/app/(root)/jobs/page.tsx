'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import { ItemJobs } from '@/components/client/Jobs/ItemJobs';

const cx = classNames.bind(styles);

const JobListing = () => {
	const [isScrollActive, setIsScrollActive] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrollActive(window.scrollY > 100);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="h-[1500px] w-full relative">
			<div className={cx('gradient-background')}></div>
			<section className="mt-24 relative">
				{/* <header className={cx('job-show-header', { 'scroll-active': isScrollActive })}>
					<div className="m-2 p-2 bg-gray-100 rounded-sm shadow-md">
						<div className="job-info m-2 p-2 flex items-start">
							<img
								src="https://cdn1.vieclam24h.vn/images/employer_avatar/2023/11/15/Thi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(84)_170001975648.png"
								className="w-28 h-28 rounded object-contain"
								alt="Logo"
							/>
							<div className="ml-4">
								<h3 className="text-lg font-semibold">Frontend Developer</h3>
								<h1 className="font-semibold text-lg md:text-2xl leading-snug">
									Nhân Viên Hành Chính Nhân Sự (1 Năm Kinh Nghiệm Trở Lên)
								</h1>
								<div className="flex flex-wrap gap-6 mt-2">
									<div className="flex items-center">
										<span>💰</span>
										<h4 className="text-base font-semibold">
											Mức lương: 8 - 12 triệu
										</h4>
									</div>
									<div className="flex items-center">
										<span>🗓️</span>
										<h4 className="text-base font-semibold">
											Hạn nộp hồ sơ: 15/10/2024
										</h4>
									</div>
									<div className="flex items-center">
										<span>📍</span>
										<h4 className="text-base font-semibold">
											Khu vực tuyển: Hà Nội
										</h4>
									</div>
								</div>
								<div className="flex flex-col md:flex-row justify-between mt-4">
									<div className="w-full md:w-[60%] flex">
										<button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
											Nộp hồ sơ
										</button>
										<button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition">
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
				</header> */}

				<header className={cx('job-show-header', { 'scroll-active': isScrollActive })}>
					<div className={cx('ribbon-wrapper')}>
						<div className={cx('ribbon')}>Hot</div>
					</div>
					<div className="m-2 p-2 bg-gray-100 rounded-sm shadow-md box-border">
						<div className="job-info m-2 p-2 flex items-start flex-wrap">
							<div className="w-full ml-4 overflow-hidden">
								<h3 className="text-lg text-gray-500 font-semibold">
									Frontend Developer
								</h3>
								<h1 className="font-semibold text-lg md:text-xl leading-snug">
									Nhân Viên Hành Chính Nhân Sự (1 Năm Kinh Nghiệm Trở Lên)
								</h1>
								<div className="flex flex-wrap gap-6 mt-2">
									<div className="flex items-center">
										<span>💰</span>
										<h4 className="text-base text-gray-500  font-semibold">
											Mức lương: 8 - 12 triệu
										</h4>
									</div>
									<div className="flex items-center">
										<span>🗓️</span>
										<h4 className="text-base  text-gray-500 font-semibold">
											Hạn nộp hồ sơ: 15/10/2024
										</h4>
									</div>
									<div className="flex items-center">
										<span>📍</span>
										<h4 className="text-base  text-gray-500 font-semibold">
											Khu vực tuyển: Hà Nội
										</h4>
									</div>
								</div>
								<div className="flex flex-col md:flex-row justify-between mt-4">
									<div className="w-full md:w-[60%] flex">
										<button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
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
								<button className="px-4 py-2 font-semibold text-gray-600">
									Công ty
								</button>
							</div>
							<div className="px-2">
								{/* {[...Array(30)].map((_, index) => (
                  <p key={index} className="text-gray-700 mt-4">Đây là nội dung thử nghiệm số {index + 1}. Lorem ipsum dolor sit amet.</p>
                ))} */}
								<div className="text-2xl font-semibold p-2">Thông tin chung</div>
								<div className="bg-[#F5F3FF] px-4 pt-5 pb-1 mb-6">
									<div className="md:flex md:border-b border-[#DDD6FE] mb-4">
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Ngày đăng
												</p>
												<p className="text-14">25/09/2024</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Thời gian thử việc
												</p>
												<p className="text-14">25/09/2024</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Cấp bậc
												</p>
												<p className="text-14">Chuyên gia</p>
											</h3>
										</div>
									</div>
									<div className="md:flex md:border-b border-[#DDD6FE] mb-4">
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Số lượng tuyển
												</p>
												<p className="text-14">25</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Hình thức làm việc
												</p>
												<p className="text-14">Full time</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Ngày đăng
												</p>
												<p className="text-14">25/09/2024</p>
											</h3>
										</div>
									</div>
									<div className="md:flex md:border-b border-[#DDD6FE] mb-4">
										<div className="flex items-center mb-4 md:w-[33%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Yêu cầu bằng cấp
												</p>
												<p className="text-14">Đại học</p>
											</h3>
										</div>
										<div className="flex items-center mb-4 md:w-[67%]">
											<span>I</span>
											<h3 className="ml-3">
												<p className="mr-1 text-se-neutral-64 text-12">
													Ngành nghề
												</p>
												<p className="text-14">25/09/2024</p>
											</h3>
										</div>
									</div>
								</div>

								<div className="jd px-2 m-2">
									<div className="text-2xl font-semibold p-2">
										Mô tả công việc
									</div>
									<div className="mb-2 text-14 break-words">
										<p>
											- Quản lý và phát triển thị trường sơn tại khu vực được
											phân công tại Hà Nội, Hải Phòng, Quảng Ninh, Nam Định,
											Thái Bình và các khu vực Phía Bắc
										</p>
										<p>- Lập kế hoạch kinh doanh theo tuần, tháng, quý năm</p>
										<p>- Lập kế hoạch công tác theo ngày, tuần</p>
										<p>
											- Báo cáo kết quả công việc theo ngày, tuần, tháng, năm
											cho giám đốc kinh doanh
										</p>
										<p>
											- Phát triển thị trường, mở mới khách hàng tại thị
											trường khu vực được giao.
										</p>
										<p>
											- Soạn thảo hợp đồng, báo giá cho khách hàng tại khu vực
										</p>
										<p>
											- Tư vấn cho giám đốc kinh doanh và ban lãnh đạo công ty
											về việc phát triển thương hiệu tại thị trường khu vực.
										</p>
										<p>- Thu hồi công nợ khách hàng tại khu vực quản lý.</p>
										<p>
											- Chăm sóc và phát triển khách hàng cũ của công ty tại
											địa bàn khu vực được giao.
										</p>
									</div>
								</div>

								<div className="jd px-2 m-2">
									<div className="text-2xl font-semibold p-2">
										Mô tả công việc
									</div>
									<div className="mb-2 text-14 break-words">
										<p>
											- Quản lý và phát triển thị trường sơn tại khu vực được
											phân công tại Hà Nội, Hải Phòng, Quảng Ninh, Nam Định,
											Thái Bình và các khu vực Phía Bắc
										</p>
										<p>- Lập kế hoạch kinh doanh theo tuần, tháng, quý năm</p>
										<p>- Lập kế hoạch công tác theo ngày, tuần</p>
										<p>
											- Báo cáo kết quả công việc theo ngày, tuần, tháng, năm
											cho giám đốc kinh doanh
										</p>
										<p>
											- Phát triển thị trường, mở mới khách hàng tại thị
											trường khu vực được giao.
										</p>
										<p>
											- Soạn thảo hợp đồng, báo giá cho khách hàng tại khu vực
										</p>
										<p>
											- Tư vấn cho giám đốc kinh doanh và ban lãnh đạo công ty
											về việc phát triển thương hiệu tại thị trường khu vực.
										</p>
										<p>- Thu hồi công nợ khách hàng tại khu vực quản lý.</p>
										<p>
											- Chăm sóc và phát triển khách hàng cũ của công ty tại
											địa bàn khu vực được giao.
										</p>
									</div>
								</div>

								<div className="">
									<h2 className=" text-24 font-semibold py-4">
										Địa điểm làm việc
									</h2>
									<div className="">
										<h3 className=" mb-2 flex text-14">
											<span className=" text-primary font-medium pt-[1px]">
												<i className=" svicon-map-marker-alt mr-1" />
											</span>
											<span className="">
												<span className=" text-primary font-medium pt-[1px] text-12">
													Hà Nội
												</span>
												, Số 68, Ngõ 10, Nguyễn Thị Định, Trung Hòa, Cầu
												Giấy
											</span>
										</h3>
										<h3 className=" mb-2 flex text-14">
											<span className=" text-primary font-medium pt-[1px]">
												<i className=" svicon-map-marker-alt mr-1" />
											</span>
											<span className="">
												<span className=" text-primary font-medium pt-[1px] text-12">
													TP.HCM
												</span>
												, Số nhà 22, Đường số 8, Hà Đô Centrosa, Phường 12,
												Quận 10
											</span>
										</h3>
										<h3 className=" mb-2 flex text-14">
											<span className=" text-primary font-medium pt-[1px]">
												<i className=" svicon-map-marker-alt mr-1" />
											</span>
											<span className="">
												<span className=" text-primary font-medium pt-[1px] text-12">
													Hà Nội
												</span>
												, 39M2, Ngõ 37 Trần Kim Xuyến, Yên Hòa, Cầu Giấy
											</span>
										</h3>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:w-1/4 p-4">
              <div className="px-4 md:px-0 top-4 pb-2">
                {
                  [...Array(10)].map((_, index) => (
                    <div key={index} className='my-2'>
                        <ItemJobs />
                    </div>
                  ))
                }
              </div>
						</div>
					</div>
				</section>
			</section>
		</div>
	);
};

export default JobListing;
