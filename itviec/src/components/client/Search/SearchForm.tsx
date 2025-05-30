'use client';

import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined, SlidersOutlined } from '@ant-design/icons';
import SearchSuggest from './Suggestion';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { CHAT_HISTORY } from '@/constants'; 
import postsApi from '@/api/postsApi';
const { Option } = Select;

interface SearchFormProps {
	onSearchResults: (results: any[]) => void; 
}

export default function SearchForm({ onSearchResults }: SearchFormProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
	const [query, setQuery] = useState('');
	const [recentSearches, setRecentSearches] = useState(CHAT_HISTORY);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const updateQueryParams = (key: string, value: string | undefined) => {
		const currentParams = queryString.parse(searchParams.toString());
		const updatedParams = {
			...currentParams,
			[key]: value || undefined, 
		};
		const newQueryString = queryString.stringify(updatedParams, { skipEmptyString: true, skipNull: true });
		console.log(newQueryString)

		router.replace(`/search?${newQueryString}`);
	};

	const handleSuggestionSelect = (keyword: string) => {
		setQuery(keyword);
		updateQueryParams('position', keyword);
		setShowSuggestions(false);
	};

	// Xử lý khi thay đổi địa chỉ
	const handleLocationChange = (value: string) => {
		updateQueryParams('location', value);
	};



	const handleSearch = async () => {
		try {
			const currentParams = queryString.parse(searchParams.toString());
			const newQueryString = queryString.stringify(currentParams, { skipEmptyString: true, skipNull: true });
	
			console.log('Full query string:', newQueryString);
	
			const response = await postsApi.searchPosts(newQueryString);
			onSearchResults(response); 
		} catch (error) {
			console.error('Search error:', error);
		}
	};
	

	const handleDeleteKeyword = (keyword: string) => {
		setRecentSearches(recentSearches.filter((search) => search.keyword !== keyword));
	};

	const handleClearAll = () => {
		setRecentSearches([]);
	};

	return (
		<div
			className="search-bar fixed w-full p-4 backdrop-blur-lg bg-opacity-70 mt-[73px] z-10"
			style={{ background: 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)' }}
		>
		{/* <div
			className="search-bar relative w-full p-4 backdrop-blur-lg bg-opacity-70"
			style={{ background: 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)' }}
		> */}
			<div className="flex flex-col gap-4 flex-1">
				<div className="flex flex-col md:flex-row gap-2">
					<div className="flex-[2] bg-white rounded-md flex items-center px-3 relative">
						<SearchOutlined className="text-gray-500 mr-2" />
						<Input
							placeholder="Vị trí tuyển dụng"
							bordered={false}
							className="focus:outline-none"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								setShowSuggestions(true);
							}}
							onFocus={() => setShowSuggestions(true)}
						/>
						{query && showSuggestions && (
							<SearchSuggest
								query={query}
								recentSearches={recentSearches}
								onSelectKeyword={handleSuggestionSelect}
								onDeleteKeyword={handleDeleteKeyword}
								onClearAll={handleClearAll}
								className="absolute top-full left-0 right-0 z-10 w-[70vw]"
							/>
						)}
					</div>
					<div className="bg-white rounded-md flex-[1] items-center">
						<Select
							style={{ border: 'none' }}
							className="w-full border-none"
							placeholder="Địa chỉ"
							onChange={handleLocationChange}
						>
							<Option value="">Tất cả</Option>
							<Option value="Hà Nội">Hà Nội</Option>
							<Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
						</Select>
					</div>
					<Button
						style={{ background: '#DF0029', color: '#fff' }}
						type="primary"
						onClick={handleSearch}
					>
						Tìm kiếm
					</Button>
					<Button
						type="text"
						className="text-white flex items-center gap-2"
						style={{ background: '#808080', color: '#fff' }}
						onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
					>
						<SlidersOutlined />
						Lọc nâng cao
					</Button>
				</div>

				{showAdvancedFilters && (
					<div className="flex flex-wrap gap-2">
						<Select
							placeholder="Loại công ty"
							className="w-[200px]"
							onChange={(value) => updateQueryParams('companyType', value)}
						>
							<Option value="">Tất cả</Option>
							<Option value="domestic">Trong nước</Option>
							<Option value="foreign">Nước ngoài</Option>
						</Select>
						<Select
							placeholder="Kinh nghiệm"
							className="w-[200px]"
							onChange={(value) => updateQueryParams('experience', value)}
						>
							<Option value="">Tất cả</Option>
							<Option value="1">1 năm</Option>
							<Option value="2">2 năm</Option>
							<Option value="3">3 năm</Option>
						</Select>
						<Select
							placeholder="Mức lương"
							className="w-[200px]"
							onChange={(value) => updateQueryParams('salary', value)}
						>
							<Option value="">Tất cả</Option>
							<Option value="10">Dưới 10 triệu</Option>
							<Option value="20">10-20 triệu</Option>
							<Option value="30">Trên 20 triệu</Option>
						</Select>
						<Select
							placeholder="Loại công việc"
							className="w-[200px]"
							onChange={(value) => updateQueryParams('jobType', value)}
						>
							<Option value="">Tất cả</Option>
							<Option value="fulltime">Toàn thời gian</Option>
							<Option value="parttime">Bán thời gian</Option>
						</Select>
						<Select
							placeholder="Danh mục"
							className="w-[200px]"
							// onChange={(value) => updateQueryParams('jobType', value)}
						>
							<Option value="">Tất cả</Option>
							<Option value="fulltime">Toàn thời gian</Option>
							<Option value="parttime">Bán thời gian</Option>
						</Select>
					</div>
				)}
			</div>
		</div>
	);
}
















// 'use client';

// import React, { useState } from 'react';
// import { Input, Select, Button, Badge } from 'antd';
// import { SearchOutlined, SlidersOutlined } from '@ant-design/icons';
// import SearchSuggest from './Suggestion';

// const { Option } = Select;

// export default function SearchForm() {
// 	const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
// 	const [query, setQuery] = useState('');

// 	return (
// 		<div
// 			className="search-bar relative w-full p-4 backdrop-blur-lg bg-opacity-70"
// 			style={{ background: 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)' }}
// 		>
// 			<div className="flex flex-col gap-4 flex-1">
// 				<div className="flex flex-col md:flex-row gap-2">
// 					<div className="flex-[2] bg-white rounded-md flex items-center px-3">
// 						<SearchOutlined className="text-gray-500 mr-2" />
// 						<Input
// 							placeholder="Vị trí tuyển dụng"
// 							bordered={false}
// 							className="focus:outline-none"
// 							onChange={(e) => setQuery(e.target.value)}
// 						/>
// 					</div>
// 					<div className="bg-white rounded-md flex-[1] items-center">
// 						<Select
// 							style={{
// 								border: 'none',
// 							}}
// 							className="w-full border-none"
// 						>
// 							<Option s value="">
// 								Địa chỉ
// 							</Option>
// 							<Option value="Hà Nội">Hà Nội</Option>
// 							<Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
// 						</Select>
// 					</div>
// 					<Button
// 						style={{
// 							background: '#DF0029',
// 							color: '#fff',
// 						}}
// 						type="primary"
// 					>
// 						Tìm kiếm
// 					</Button>
// 					<Button
// 						type="text"
// 						className="text-white flex items-center gap-2"
// 						style={{
// 							background: '#808080',
// 							color: '#fff',
// 						}}
// 						onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
// 					>
// 						<SlidersOutlined />
// 						Lọc nâng cao
// 					</Button>
// 				</div>

// 				{/* Advanced Filters */}
// 				{showAdvancedFilters && (
// 					<div
// 						className={`flex flex-wrap gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
// 							showAdvancedFilters ? 'animate-fadeInCollapse' : 'animation-fadeOutCollapse'
// 						}`}
// 					>
// 						<Select className="flex-1" defaultValue="agency">
// 							<Option value="agency">Agency (Marketing)</Option>
// 							<Option value="corporate">Corporate</Option>
// 						</Select>

// 						<Select className="flex-1" defaultValue="1">
// 							<Option value="1">1 năm</Option>
// 							<Option value="2">2 năm</Option>
// 							<Option value="3">3 năm</Option>
// 						</Select>

// 						<Select className="flex-1" defaultValue="range2">
// 							<Option value="range1">Dưới 10 triệu</Option>
// 							<Option value="range2">10-20 triệu</Option>
// 							<Option value="range3">Trên 20 triệu</Option>
// 						</Select>


// 						<Select className="flex-1"  defaultValue="default">
// 							<Option value="default">Phương thức</Option>
// 							<Option value="fulltime">Toàn thời gian</Option>
// 							<Option value="parttime">Bán thời gian</Option>
// 						</Select>
// 					</div>
// 				)}

// 				{query && (
// 					<SearchSuggest
// 						query={query}
// 						recentSearches={recentSearches}
// 						onDeleteKeyword={handleDeleteKeyword}
// 						className="mt-9"
// 						onClearAll={handleClearAll}
// 					/>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// // 'use client';

// // import React, { useState } from 'react';
// // import { Input, Select, Button } from 'antd';
// // import { SearchOutlined, SlidersOutlined } from '@ant-design/icons';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import queryString from 'query-string';

// // const { Option } = Select;

// // export default function SearchForm() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

// //   // Hàm cập nhật URL khi giá trị thay đổi
// //   const updateQueryParams = (key: string, value: string | undefined) => {
// //     // Parse query string hiện tại từ URL
// //     const currentParams = queryString.parse(searchParams.toString());

// //     // Cập nhật giá trị mới
// //     const updatedParams = {
// //       ...currentParams,
// //       [key]: value || undefined, // Xóa param nếu value là undefined hoặc ""
// //     };

// //     // Stringify lại query string và push URL mới
// //     const newQueryString = queryString.stringify(updatedParams, { skipEmptyString: true, skipNull: true });
// //     router.replace(`/search?${newQueryString}`);
// //   };

// //   return (
// //     <div
// //       className="search-bar relative w-full p-4 backdrop-blur-lg bg-opacity-70"
// //       style={{ background: 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)' }}
// //     >
// //       <div className="flex flex-col gap-4 flex-1">
// //         <div className="flex flex-col md:flex-row gap-2">
// //           {/* Vị trí tuyển dụng */}
// //           <div className="flex-[2] bg-white rounded-md flex items-center px-3">
// //             <SearchOutlined className="text-gray-500 mr-2" />
// //             <Input
// //               placeholder="Vị trí tuyển dụng"
// //               bordered={false}
// //               className="focus:outline-none"
// //               onChange={(e) => updateQueryParams('query', e.target.value)} // Cập nhật query param
// //             />
// //           </div>

// //           {/* Địa chỉ */}
// //           <div className="bg-white rounded-md flex-[1] items-center">
// //             <Select
// //               className="w-full"
// //               placeholder="Địa chỉ"
// //               onChange={(value) => updateQueryParams('location', value)} // Cập nhật query param
// //             >
// //               <Option value="">Tất cả</Option>
// //               <Option value="Hà Nội">Hà Nội</Option>
// //               <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
// //             </Select>
// //           </div>

// //           {/* Nút tìm kiếm */}
// //           <Button
// //             style={{
// //               background: '#DF0029',
// //               color: '#fff',
// //             }}
// //             type="primary"
// //             onClick={() => updateQueryParams('search', 'true')} // Ví dụ thêm param khác
// //           >
// //             Tìm kiếm
// //           </Button>

// //           {/* Lọc nâng cao */}
// //           <Button
// //             type="text"
// //             className="text-white flex items-center gap-2"
// //             style={{
// //               background: '#808080',
// //               color: '#fff',
// //             }}
// //             onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
// //           >
// //             <SlidersOutlined />
// //             Lọc nâng cao
// //           </Button>
// //         </div>

// //         {/* Lọc nâng cao */}
// //         {showAdvancedFilters && (
// //           <div className="flex flex-wrap gap-2 mt-4">
// //             {/* Loại công ty */}
// //             <Select
// //               placeholder="Loại công ty"
// //               className="w-[200px]"
// //               onChange={(value) => updateQueryParams('companyType', value)} // Cập nhật query param
// //             >
// //               <Option value="">Tất cả</Option>
// //               <Option value="domestic">Trong nước</Option>
// //               <Option value="foreign">Nước ngoài</Option>
// //             </Select>

// //             {/* Kinh nghiệm */}
// //             <Select
// //               placeholder="Kinh nghiệm"
// //               className="w-[200px]"
// //               onChange={(value) => updateQueryParams('experience', value)} // Cập nhật query param
// //             >
// //               <Option value="">Tất cả</Option>
// //               <Option value="1">1 năm</Option>
// //               <Option value="2">2 năm</Option>
// //               <Option value="3">3 năm</Option>
// //             </Select>

// //             {/* Mức lương */}
// //             <Select
// //               placeholder="Mức lương"
// //               className="w-[200px]"
// //               onChange={(value) => updateQueryParams('salary', value)} // Cập nhật query param
// //             >
// //               <Option value="">Tất cả</Option>
// //               <Option value="10">Dưới 10 triệu</Option>
// //               <Option value="20">10-20 triệu</Option>
// //               <Option value="30">Trên 20 triệu</Option>
// //             </Select>

// //             {/* Loại công việc */}
// //             <Select
// //               placeholder="Loại công việc"
// //               className="w-[200px]"
// //               onChange={(value) => updateQueryParams('jobType', value)} // Cập nhật query param
// //             >
// //               <Option value="">Tất cả</Option>
// //               <Option value="fulltime">Toàn thời gian</Option>
// //               <Option value="parttime">Bán thời gian</Option>
// //             </Select>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



