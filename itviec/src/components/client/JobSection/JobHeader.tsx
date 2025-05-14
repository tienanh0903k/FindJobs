'use client';
import React, { useRef } from 'react';

export default function JobHeader() {
const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  }
};


  return (
    <>
    <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h1 className="text-[#00a14b] font-semibold text-lg sm:text-xl md:text-2xl leading-tight">
          Việc làm tốt nhất
        </h1>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-[10px] sm:text-xs text-[#6b7280] font-semibold leading-none">
            Đề xuất bởi
          </span>
          <img
            src="https://storage.googleapis.com/a1aa/image/baf0528d-685c-4c5f-17d7-6d2ebf3cf65d.jpg"
            alt="TOPPYAI logo"
            className="h-7 w-auto"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
			<div className="relative w-[180px] sm:w-[220px]">
				<select
					aria-label="Filter by location"
					name="location-filter"
					className="appearance-none w-full border border-[#d1d5db] rounded-md py-2 pl-3 pr-8 text-sm text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#00a14b] focus:border-[#00a14b]"
				>
					<option>Địa điểm</option>
				</select>
				<i className="fas fa-filter absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-xs pointer-events-none"></i>
				<i className="fas fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] text-xs pointer-events-none"></i>
			</div>

			{/* Arrow left */}
			<button
				aria-label="Previous"
				onClick={scrollLeft}
				className="border border-[#00a14b] text-[#00a14b] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d1f0d9] transition"
			>
				<i className="fas fa-chevron-left"></i>
			</button>

			{/* Scrollable list */}
			<div
				ref={scrollRef}
				className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none max-w-[calc(100vw-300px)] scrollbar-none"
			>
				{[
					'Hà Nội',
					'Ba Đình',
					'Hoàn Kiếm',
					'Hai Bà Trưng',
					'Đống Đa',
					'Tây Hồ',
					'Cầu Giấy',
					'Thanh Xuân',
					'Nam Từ Liêm',
					'Long Biên 22',  
					'Van Giang',
					'Da Nang',
					'Vung Tau',
					'Long Biên',
				].map((item) => (
					<button
						key={item}
						className="bg-[#e5e7eb] text-[#374151] rounded-full px-4 py-1 text-xs sm:text-sm font-semibold whitespace-nowrap"
					>
						{item}
					</button>
				))}
			</div>

			{/* Arrow right */}
			<button
				aria-label="Next"
				onClick={scrollRight}
				className="border border-[#00a14b] text-[#00a14b] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d1f0d9] transition"
			>
				<i className="fas fa-chevron-right"></i>
			</button>
		</div>

    
    </>
	);
}
