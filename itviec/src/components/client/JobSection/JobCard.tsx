// components/JobCard.js
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const JobCards = ({ job }: any) => {
	console.log('job', job);
  return (
		<article 
        style={{ borderLeft: '4px solid #00b14f' }}
      className="bg-white rounded-lg p-4 flex flex-col gap-2 border border-transparent hover:shadow-md transition relative border-l-4 border-[#10b981]"
    >
			<div className="flex items-center gap-3">
				<img alt={job.companyName} className="w-12 h-12 object-contain rounded" src={job?.userId?.companyId?.logo} />
				<h2 className="text-xs sm:text-sm font-semibold text-[#1f2937] leading-snug line-clamp-3 cursor-pointer">
					{job.position}
				</h2>
				<span className="inline-flex items-center gap-1 bg-[#00a14b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
					<i className="fas fa-certificate"></i> TOP
				</span>
			</div>
			<p className="text-[10px] sm:text-xs font-semibold text-[#6b7280] uppercase leading-none">
				{job?.companyId?.name}
			</p>
			<div className="flex flex-wrap gap-2 mt-auto">
				<span className="text-[10px] sm:text-xs bg-[#f3f4f6] text-[#374151] rounded-full px-2 py-0.5">
					{job.salary}
				</span>
				<span className="text-[10px] sm:text-xs bg-[#f3f4f6] text-[#374151] rounded-full px-2 py-0.5">
					{job.location}
				</span>
				<button className="flex items-center justify-center w-8 h-8 ml-auto border border-[#10b981] text-[#10b981] hover:text-[#059669] bg-white rounded-full shadow hover:bg-[#f0fdf4] transition">
					 <FaHeart size={18} strokeWidth={2} />
				</button>
			</div>
		</article>
	);
};

export default JobCards;
