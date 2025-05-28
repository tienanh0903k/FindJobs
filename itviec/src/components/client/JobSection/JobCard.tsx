import userApi from '@/api/userApi';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { message } from 'antd';
import { CiHeart } from "react-icons/ci";
import { useAppSelector } from '@/hook/useSelector';
import { RootState } from '@/redux/store';

interface JobCardProps {
  job: {
    _id: string;
    position: string;
    companyName?: string;
    companyId?: {
      name: string;
    };
    userId?: {
      companyId?: {
        logo: string;
      };
    };
    salary: string;
    location: string;
    isHot?: boolean;
    isUrgent?: boolean;
  };
}

const JobCards: React.FC<JobCardProps> = ({ job }: any) => {
  const infoUser = useAppSelector((state: RootState) => state.auth.currentUser?.user);
  
  
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log('job', job);
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await userApi.getBookmarks();
        console.log('bookmarks response:', response);
        const bookmarks = response.data?.bookmark || [];
        const isJobBookmarked = bookmarks.includes(job._id);
        console.log('isJobBookmarked:', isJobBookmarked);
        setIsBookmarked(isJobBookmarked);
      } catch (error: any) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    if (job._id) fetchBookmarks();
  }, [job._id]);


  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!infoUser) {
      message.warning('Bạn cần đăng nhập để sử dụng chức năng này!');
      return;
    }
    handleBookmarkToggle();
  };
  


  const handleBookmarkToggle = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        await userApi.unBookmarkPost(job._id);
        setIsBookmarked(false);
        message.success('Đã xóa bookmark'); // Sử dụng message.success
      } else {
        await userApi.bookmarkPost(job._id);
        setIsBookmarked(true);
        message.success('Đã thêm bookmark'); // Sử dụng message.success
      }
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      style={{ borderLeft: '4px solid #00b14f' }}
      className="bg-white rounded-lg p-4 flex flex-col gap-2 border border-transparent hover:shadow-md transition relative border-l-4 border-[#10b981]"
    >
      <div className="flex items-center gap-3">
        <img
          alt={job.companyName || job.companyId?.name || 'Company'}
          className="w-12 h-12 object-contain rounded"
          src={job?.userId?.companyId?.logo || '/default-logo.png'}
        />
        <h2 className="text-xs sm:text-sm font-semibold text-[#1f2937] leading-snug line-clamp-3 cursor-pointer">
          {job.position}
        </h2>
        {job.isHot && (
          <span className="inline-flex items-center gap-1 bg-[#00a14b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
            <i className="fas fa-certificate"></i> TOP
          </span>
        )}
        {job.isUrgent && (
          <span className="inline-flex items-center gap-1 bg-[#f59e0b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
            <i className="fas fa-certificate"></i> URGENT
          </span>
        )}
      </div>
      <p className="text-[10px] sm:text-xs font-semibold text-[#6b7280] uppercase leading-none">
        {job?.userId?.companyId?.name}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        <span style={{ lineHeight: '27px' }} className="text-[10px] sm:text-xs bg-[#f3f4f6] text-[#374151] rounded-full px-2 py-0.5">
          {job.salary}
        </span>
        <span style={{ lineHeight: '27px' }} className="text-[10px] sm:text-xs bg-[#f3f4f6] text-[#374151] rounded-full px-2 py-0.5">
          {job.location}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookmarkClick(e);
          }}
          disabled={loading}
          className={`flex items-center justify-center w-8 h-8 ml-auto border rounded-full shadow transition ${isBookmarked
              ? 'border-[#10b981] text-[#10b981] bg-[#f0fdf4]'
              : 'border-[#10b981] bg-white hover:bg-[#f0fdf4]'
            }`}
        >
          <CiHeart
            size={18}
            strokeWidth={2}
            color={isBookmarked ? '#10b981' : 'inherit'}
            style={{
              fill: isBookmarked ? "#10b981" : "none"
            }}
          />
        </button>
      </div>
    </article>
  );
};

export default JobCards;
// // components/JobCard.js
// import React from 'react';
// import { FaHeart } from 'react-icons/fa';

// const JobCards = ({ job }: any) => {
// 	console.log('job', job);
// 	return (
// 		<article
// 			style={{ borderLeft: '4px solid #00b14f' }}
// 			className="bg-white rounded-lg p-4 flex flex-col gap-2 border border-transparent hover:shadow-md transition relative border-l-4 border-[#10b981]"
// 		>
// 			<div className="flex items-center gap-3">
// 				<img alt={job.companyName} className="w-12 h-12 object-contain rounded" src={job?.userId?.companyId?.logo} />
// 				<h2 className="text-xs sm:text-sm font-semibold text-[#1f2937] leading-snug line-clamp-3 cursor-pointer">
// 					{job.position}
// 				</h2>
// 				{job.isHot && (
// 					<span className="inline-flex items-center gap-1 bg-[#00a14b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
// 						<i className="fas fa-certificate"></i> TOP
// 					</span>
// 				)}
// 				{job.isUrgent && (
// 					<span className="inline-flex items-center gap-1 bg-[#f59e0b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
// 						<i className="fas fa-certificate"></i> URGENT
// 					</span>
// 				)}
// 				{/* <span className="inline-flex items-center gap-1 bg-[#00a14b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
// 					<i className="fas fa-certificate"></i> TOP
// 				</span>
// 				<span className="inline-flex items-center gap-1 bg-[#f59e0b] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
// 					<i className="fas fa-certificate"></i> URGENT
// 				</span> */}
// 			</div>
// 			<p className="text-[10px] sm:text-xs font-semibold text-[#6b7280] uppercase leading-none">
// 				{job?.companyId?.name}
// 			</p>
// 			<div className="flex flex-wrap gap-2 mt-auto">
// 				<span style={{ lineHeight: '27px' }} className="text-[10px] sm:text-xs bg-[#f3f4f6] text-[#374151] rounded-full px-2 py-0.5">
// 					{job.salary}
// 				</span>
// 				<span style={{ lineHeight: '27px' }} className="text-[10px] sm:text-xs bg-[#f3f4f6] text-[#374151] rounded-full px-2 py-0.5">
// 					{job.location}
// 				</span>
// 				<button className="flex items-center justify-center w-8 h-8 ml-auto border border-[#10b981] text-[#10b981] hover:text-[#059669] bg-white rounded-full shadow hover:bg-[#f0fdf4] transition">
// 					<FaHeart size={18} strokeWidth={2} />
// 				</button>
// 			</div>
// 		</article>
// 	);
// };

// export default JobCards;
