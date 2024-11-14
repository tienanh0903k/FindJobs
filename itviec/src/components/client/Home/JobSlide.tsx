'use client';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { ItemJobs } from '../Jobs/ItemJobs';
import { useTranslations } from 'next-intl';
import { IJobSlideProps } from '@/app/types/interface';

// Property 'posts' does not exist on type 'IJobSlideProps[]'.ts(2339)

const JobSlide: React.FC<IJobSlideProps> = ({ posts }) => {
	const t = useTranslations();
	return (
		<div className="w-full mx-auto md:py-4 lg:py-2">
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t('home.title')}</h2>

			<div className="relative bg-white rounded-lg p-2">
				<Swiper
					slidesPerView={3}
					grid={{
						rows: 2,
						fill: 'row',
					}}
					spaceBetween={30}
					navigation
					modules={[Grid, Pagination, Navigation]}
					className="mySwiper"
					breakpoints={{
						// Màn hình nhỏ (điện thoại)
						320: {
							slidesPerView: 1, // Hiển thị 1 slide
							grid: { rows: 1 }, // Hiển thị 1 hàng
						},
						// Màn hình trung bình (tablet)
						640: {
							slidesPerView: 2, // Hiển thị 2 slide
							grid: { rows: 2 }, // Hiển thị 2 hàng
						},
						// Màn hình lớn (laptop)
						1024: {
							slidesPerView: 3, // Hiển thị 3 slide
							grid: { rows: 2 }, // Hiển thị 2 hàng
						},
					}}
				>
					{posts && posts.length > 0 ? (
						posts.map((job: any) => (
							<SwiperSlide key={job._id}>
								{/* Type '{ list: IPost[]; }' is not assignable to type 'IntrinsicAttributes & ItemJobsProps'.
								Property 'list' does not exist on type 'IntrinsicAttributes & ItemJobsProps'.ts(2322) */}
								<ItemJobs job={job} />
							</SwiperSlide>
						))
					) : (
						<SwiperSlide>
							<div>No jobs available</div>
						</SwiperSlide>
					)}
				</Swiper>
			</div>
		</div>
	);
};

export default JobSlide;
