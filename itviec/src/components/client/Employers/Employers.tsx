import React from 'react';
import { EmployerCard } from './EmployerCard';
import { useTranslations } from 'next-intl';

export const Employers = ({
	jobs
}: any) => {
	const {items} = jobs
	const t  = useTranslations();
	return (
		<div className="bg-white h-[1200px]">
			<div className="w-[90%] mx-auto">
				<h1 className="text-2xl text-center font-bold pt-4">{t('home.title2')}</h1>
				<div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
					{/* {Array(8)
						.fill(0)
						.map((_, index) => (
							<EmployerCard key={index} jobs={jobs} />
						))} */}

					{items.slice(0, 8).map((job: any, index: number) => (
						<EmployerCard key={index} job={job} />
					))}
				</div>
			</div>
		</div>
	);
};
