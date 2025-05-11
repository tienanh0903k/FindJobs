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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobCards from '../JobSection/JobCard';

// Property 'posts' does not exist on type 'IJobSlideProps[]'.ts(2339)

const JobSlide: React.FC<IJobSlideProps> = ({ posts }) => {
	const [mounted, setMounted] = useState<boolean>(false);

	const router = useRouter();
	const handleClick = (id: string) => {
		router.push(`/jobs/${id}`);
	};
	useEffect(() => {
		setMounted(true);
	}, []);

	const t = useTranslations();
	return (
		<div className="w-full mx-auto md:py-4 lg:py-2">
			{/* <h2 className="text-2xl mt-6 font-bold text-center text-gray-800 mb-6">{t('home.title')}</h2> */}
			<div className="relative bg-white rounded-lg p-2">
				<Swiper
					slidesPerView={4}
					grid={{
						rows: 4,
						fill: 'row',
					}}
					spaceBetween={30}
					navigation
					modules={[Grid, Pagination, Navigation]}
					className="mySwiper"
					breakpoints={{
						320: {
							slidesPerView: 1,
							grid: { rows: 1 }, // 1 column on small screens
						},
						640: {
							slidesPerView: 2,
							grid: { rows: 2 }, // 2 columns on medium screens
						},
						1024: {
							slidesPerView: 3,
							grid: { rows: 3 }, // 3 columns on large screens
						},
					}}
				>
					{posts && posts.length > 0 ? (
						posts.slice().reverse().map((job: any) => (
							<SwiperSlide key={job._id} onClick={() => handleClick(job._id)}>
								{/* <ItemJobs job={job} /> */}
								<JobCards job={job} />
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
