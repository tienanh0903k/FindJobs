'use client';

import { CHAT_HISTORY } from '@/constants';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';

interface RecentSearch {
	keyword: string;
	jobsCount: number;
}

const SearchHome = () => {
	const [query, setQuery] = useState('');
	const [searchType, setSearchType] = useState('jobTitle');
	const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(CHAT_HISTORY)

  const t = useTranslations();


  const suggestedJobs= [
    {
      title: 'Chương Trình Đào Tạo IT Fresher - The Rookie Program',
      company: 'NashTech',
      salary: 'Thoả thuận',
      logo: '/placeholder.svg?height=50&width=50'
    },
    {
      title: 'Chuyên Viên Tư Vấn Giáo Dục Full-Time/Part-Time',
      company: 'CÔNG TY TNHH WESET ENGLISH CENTER',
      salary: '6 - 30 triệu',
      logo: '/placeholder.svg?height=50&width=50'
    },
    {
      title: 'Giám Đốc Kinh Doanh Toàn Khu Vực (Miền Trung)',
      company: 'CÔNG TY CỔ PHẦN DỊCH VỤ VẬN TẢI BSHIP',
      salary: '25 - 40 triệu',
      logo: '/placeholder.svg?height=50&width=50'
    }
  ]

	const handleDeleteKeyword = (keyword: string) => {
		setRecentSearches(recentSearches.filter((search) => search.keyword !== keyword));
	};

	const handleClearAll = () => {
		setRecentSearches([]);
	};

	// Lọc từ khóa gợi ý dựa trên `query`
	const filteredSearches = query
		? recentSearches.filter((search) => search.keyword.toLowerCase().includes(query.toLowerCase()))
		: [];

	return (
		<div className="text-white bg-custom-gradient p-8 rounded-lg shadow-xl h-[280px]">
			<div className="mx-auto max-w-[70%]">
				<h1 className="text-3xl font-bold mb-4">{t('home.search')}</h1>

				<form className="flex items-center max-w-[95%] gap-2">
					<select className="bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
						<option>Location</option>
						<option value="1">Hà Nội</option>
						<option value="2">Hồ Chí Minh</option>
						<option value="3">Đà Nẵng</option>
					</select>

					<input
						type="text"
						placeholder="Tìm kiếm việc làm..."
						className="relative bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>

					<button
						type="submit"
						className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Tìm kiếm
					</button>
				</form>
				{query && (
					<div className="suggestions absolute grid grid-cols-1 md:grid-cols-2 gap-6 bg-white mt-2 p-4 z-10 w-[80%] border rounded-lg shadow-lg border-gray-300">
						<div className="space-y-4 overflow-y-auto max-h-[500px]">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold flex items-center gap-2 text-black">
                  <FaClock className="h-4 w-4 text-gray-400" />
									Từ khóa tìm kiếm gần đây
								</h2>
								<button className="text-green-600 text-sm hover:underline">Xóa tất cả</button>
							</div>
							<div className="space-y-2">
								{filteredSearches.map((search) => (
									<div
										key={search.keyword}
										className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group"
									>
										<button className="flex items-center gap-2 text-gray-700">
											<FaClock className="h-4 w-4 text-gray-400" />
											<span>{search.keyword}</span>
											<span className="text-gray-400">({search.jobsCount} việc làm)</span>
										</button>
										<button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
											{/* <X className="h-4 w-4" /> */}
										</button>
									</div>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<h2 className="text-lg text-black font-semibold">Việc làm có thể bạn quan tâm</h2>
							<div className="space-y-4">
								{suggestedJobs.map((job, index) => (
									<div
										key={index}
										className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-500 transition-colors"
									>
										<img src={job.logo} alt={`${job.company} logo`} className="h-12 w-12 rounded" />
										<div>
											<h3 className="font-medium text-green-600 hover:underline">{job.title}</h3>
											<p className="text-sm text-gray-600">{job.company}</p>
											<p className="text-sm font-medium text-green-500">{job.salary}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				<div className="flex mt-4">
					<div className="rounded-lg p-2">Gợi ý cho bạn:</div>
					<ul className="flex flex-wrap ml-4 space-x-2">
						<li className="">
							<a
								href="#"
								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
							>
								ReactJS
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
							>
								NodeJS
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
							>
								.NET Core
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
							>
								Go
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
							>
								Laravel
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchHome;

// import { useTranslations } from 'next-intl';
// import React from 'react';

// const SearchHome = () => {
// 	const t = useTranslations()
// 	return (
// 		<div className="text-white bg-custom-gradient p-8 rounded-lg shadow-xl">
// 			<div className="mx-auto max-w-[70%]">
// 				<h1 className="text-3xl font-bold mb-4">
// 					{t('home.search')}
// 				</h1>
// 				<form className="flex items-center max-w-[95%] gap-2">
// 					<select className="bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
// 						<option value="">Select location</option>
// 						<option value="1">Hà Nội</option>
// 						<option value="2">Hồ Chí Minh</option>
// 						<option value="3">Đà Nẵng</option>
// 					</select>

// 					<input
// 						type="text"
// 						placeholder="Tìm kiếm việc làm..."
// 						className="bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
// 					/>
// 					<button
// 						type="submit"
// 						className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
// 					>
// 						Search
// 					</button>
// 				</form>
// 				{/* suggest for me  */}

// 				<div className="flex mt-4">
// 					<div className="rounded-lg p-2">Gợi ý cho bạn:</div>
// 					<ul className="flex flex-wrap ml-4 space-x-2">
// 						<li className=''>
// 							<a
// 								href="#"
// 								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
// 							>
// 								ReactJS
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="#"
// 								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
// 							>
// 								NodeJS
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="#"
// 								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
// 							>
// 								.NET Core
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="#"
// 								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
// 							>
// 								Go
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="#"
// 								className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
// 							>
// 								Laravel
// 							</a>
// 						</li>
// 					</ul>
// 				</div>

// 			</div>
// 		</div>
// 	);
// };





















// {/* <div className="absolute top-full left-0 right-0 mt-2 bg-white text-black rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
// 						{/* Radio buttons */}
// 						<div className="flex items-center p-4 border-b">
// 							<span className="mr-2 text-gray-700 font-semibold">Tìm kiếm theo:</span>
// 							<label className="mr-4 flex items-center">
// 								<input
// 									type="radio"
// 									name="searchType"
// 									value="jobTitle"
// 									checked={searchType === 'jobTitle'}
// 									onChange={() => setSearchType('jobTitle')}
// 									className="mr-1"
// 								/>
// 								Tên việc làm
// 							</label>
// 							<label className="mr-4 flex items-center">
// 								<input
// 									type="radio"
// 									name="searchType"
// 									value="companyName"
// 									checked={searchType === 'companyName'}
// 									onChange={() => setSearchType('companyName')}
// 									className="mr-1"
// 								/>
// 								Tên công ty
// 							</label>
// 							<label className="flex items-center">
// 								<input
// 									type="radio"
// 									name="searchType"
// 									value="both"
// 									checked={searchType === 'both'}
// 									onChange={() => setSearchType('both')}
// 									className="mr-1"
// 								/>
// 								Cả hai
// 							</label>
// 						</div>

// 						{/* Gợi ý từ khóa */}
// 						<h3 className="text-lg font-semibold mb-2 p-4">Từ khóa gợi ý</h3>
// 						<ul className="space-y-2 px-4 pb-4">
// 							{filteredSearches.length > 0 ? (
// 								filteredSearches.map((search, index) => (
// 									<li
// 										key={index}
// 										className="flex items-center justify-between border-b pb-2 last:border-b-0"
// 									>
// 										<div className="flex items-center space-x-2">
// 											<span className="text-gray-500">🔍</span>
// 											<span className="font-medium">{search.keyword}</span>
// 											<span className="text-gray-500 text-sm">{search.jobsCount} việc làm</span>
// 										</div>
// 										<button
// 											onClick={() => handleDeleteKeyword(search.keyword)}
// 											className="text-gray-400 hover:text-red-500 text-sm"
// 										>
// 											✕
// 										</button>
// 									</li>
// 								))
// 							) : (
// 								<li className="text-gray-500">Không có từ khóa phù hợp</li>
// 							)}
// 						</ul>
// 					</div> */}
