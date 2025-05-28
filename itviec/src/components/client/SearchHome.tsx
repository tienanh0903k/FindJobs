'use client';

import { CHAT_HISTORY } from '@/constants';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SearchSuggest from './Search/Suggestion';

interface RecentSearch {
	keyword: string;
	jobsCount: number;
}

const SearchHome = () => {
	const [query, setQuery] = useState('');
	const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(CHAT_HISTORY);
	const t = useTranslations();
	const router = useRouter();

	const handleDeleteKeyword = (keyword: string) => {
		setRecentSearches(recentSearches.filter((search) => search.keyword !== keyword));
	};

	const handleClearAll = () => {
		setRecentSearches([]);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query) {
			router.push(`/search?query=${encodeURIComponent(query)}`);
		}
	};

	const handleSuggestionClick = (keyword: string) => {
		setQuery(keyword);
		router.push(`/search?query=${encodeURIComponent(keyword)}`);
	};

	return (
		<div className="text-white bg-custom-gradient p-8 rounded-lg shadow-xl h-[280px]">
			<div className="mx-auto max-w-[70%]">
				<h1 className="text-3xl font-bold mb-4">{t('home.search')}</h1>

				<form className="flex items-center max-w-[95%] gap-2" onSubmit={handleSearch}>
					{/* <select className="bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
						<option>{t('home.nameSelect')}</option>
						<option value="1">Hà Nội</option>
						<option value="2">Hồ Chí Minh</option>
						<option value="3">Đà Nẵng</option>
					</select> */}

					<input
						type="text"
						placeholder={t('home.namePlaceHolder')}
						className="relative bg-white text-black placeholder-slate-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>

					<button
						type="submit"
						className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						{t('home.buttonSearch')}
					</button>
				</form>

				{query && (
					<SearchSuggest
						query={query}
						recentSearches={recentSearches}
						onDeleteKeyword={handleDeleteKeyword}
						onClearAll={handleClearAll}
						onSelectKeyword={(keyword: string) => setQuery(keyword)} 
					/>
				)}

				<div className="flex mt-4">
					<div className="rounded-lg p-2">{t('home.suggest')}</div>
					<ul className="flex flex-wrap ml-4 space-x-2">
						{recentSearches.slice(0, 5).map((suggest, index) => (
							<li key={index}>
								<button
									onClick={() => handleSuggestionClick(suggest.keyword)}
									className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
								>
									{suggest.keyword}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchHome;


//opton 2

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

//option 3

// 'use client';

// import { CHAT_HISTORY } from '@/constants';
// import { useTranslations } from 'next-intl';
// import React, { useState } from 'react';
// import SearchSuggest from './Search/Suggestion';

// export interface RecentSearch {
//   keyword: string;
//   jobsCount: number;
// }

// const SearchHome = () => {
//   const [query, setQuery] = useState('');
//   const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(CHAT_HISTORY);

//   const t = useTranslations();

//   const suggestedJobs = [
//     {
//       title: 'Chương Trình Đào Tạo IT Fresher - The Rookie Program',
//       company: 'NashTech',
//       salary: 'Thoả thuận',
//       logo: '/placeholder.svg?height=50&width=50',
//     },
//     {
//       title: 'Chuyên Viên Tư Vấn Giáo Dục Full-Time/Part-Time',
//       company: 'CÔNG TY TNHH WESET ENGLISH CENTER',
//       salary: '6 - 30 triệu',
//       logo: '/placeholder.svg?height=50&width=50',
//     },
//     {
//       title: 'Giám Đốc Kinh Doanh Toàn Khu Vực (Miền Trung)',
//       company: 'CÔNG TY CỔ PHẦN DỊCH VỤ VẬN TẢI BSHIP',
//       salary: '25 - 40 triệu',
//       logo: '/placeholder.svg?height=50&width=50',
//     },
//   ];

//   const handleDeleteKeyword = (keyword: string) => {
//     setRecentSearches(recentSearches.filter((search) => search.keyword !== keyword));
//   };

//   const handleClearAll = () => {
//     setRecentSearches([]);
//   };

//   return (
//     <div className="text-white bg-custom-gradient p-8 rounded-lg shadow-xl h-[280px]">
//       <div className="mx-auto max-w-[70%]">
//         <h1 className="text-3xl font-bold mb-4">{t('home.search')}</h1>

//         <form className="flex items-center max-w-[95%] gap-2">
//           <input
//             type="text"
//             placeholder={t('home.namePlaceHolder')}
//             className="relative bg-white text-black placeholder-slate-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             {t('home.buttonSearch')}
//           </button>
//         </form>

//         {/* Hiển thị gợi ý tìm kiếm nếu có query */}
//         {query && (
//           <SearchSuggest
//             query={query}
//             recentSearches={recentSearches}
//             onDeleteKeyword={handleDeleteKeyword}
//             onClearAll={handleClearAll}
//           />
//         )}

// <div className="flex mt-4">
// 					<div className="rounded-lg p-2">{t('home.suggest')}</div>
// 					<ul className="flex flex-wrap ml-4 space-x-2">
// 						<li className="">
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

//         <div className="flex mt-4">
//           <div className="rounded-lg p-2">{t('home.suggest')}</div>
//           <ul className="flex flex-wrap ml-4 space-x-2">
//             {suggestedJobs.map((job, index) => (
//               <li key={index}>
//                 <a
//                   href="#"
//                   className="inline-block bg-secondary text-third rounded-full px-3 py-2 border border-gray-400 text-xs leading-6 hover:text-gray-900"
//                 >
//                   {job.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchHome;

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
