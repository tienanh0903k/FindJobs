'use client';
import JobCard from '@/components/client/Search/JobCard';
import SearchForm from '@/components/client/Search/SearchForm';
import { useParams, useSearchParams } from 'next/navigation';
import { List, Avatar } from 'antd';
import { useState } from 'react';
import RightSection from '@/components/client/Search/RightSection';

// const companies = [
// 	{ name: 'Công ty A', logo: 'https://via.placeholder.com/64' },
// 	{ name: 'Công ty B', logo: 'https://via.placeholder.com/64' },
// 	{ name: 'Công ty C', logo: 'https://via.placeholder.com/64' },
// 	{ name: 'Công ty D', logo: 'https://via.placeholder.com/64' },
// ];

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState<any[]>([]); 
	const handleSearchResults = (data: any[]) => {
		setSearchResults(data);
	};
	return (
		<div className="min-h-screen">
			<SearchForm onSearchResults={handleSearchResults} />

			<div className="flex flex-col md:flex-row w-full p-4 gap-4">
				{/* Job List (70%) */}
				<div className="flex-1 md:w-9/12">
					{/* <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow-md">
						<div className="flex items-center gap-2">
							<span className="text-gray-700 font-medium">Tìm kiếm theo:</span>
							<button className="rounded-full bg-green-100 text-green-700 px-4 py-1 flex items-center gap-1 border border-green-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Tên việc làm
							</button>
							<button className="rounded-full bg-gray-200 text-gray-600 px-4 py-1">
								Tên công ty
							</button>
							<button className="rounded-full bg-gray-200 text-gray-600 px-4 py-1">Cả hai</button>
						</div>

						<div className="border-l border-gray-300 h-6 mx-2"></div>

						<div className="flex items-center gap-2">
							<span className="text-gray-700 font-medium">Ưu tiên hiển thị theo:</span>
							<button className="rounded-md border border-gray-300 px-4 py-1 flex items-center gap-1">
								Search by AI
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 9l6 6 6-6"
									/>
								</svg>
							</button>
						</div>
					</div> */}
					<h1 className="text-xl font-semibold mb-4 mt-4">Kết qủa tìm kiếm</h1>
					<div className="flex flex-col gap-4">
						{Array(10)
							.fill(0)
							.map((_, index) => (
								<JobCard key={index} />
							))}
					</div>
				</div>

				<div className="md:w-3/12 bg-white rounded-md p-4 shadow-md">
					<h2 className="text-xl font-semibold mb-4">Danh sách công ty</h2>
					<RightSection />
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
