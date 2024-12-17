import React from 'react';
import { FaClock } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface SearchSuggestProps {
	query: string;
	recentSearches: any[];
	onDeleteKeyword: (keyword: string) => void;
	onClearAll: () => void;
	className?: string;
}

const SearchSuggest: React.FC<SearchSuggestProps> = ({
	query,
	recentSearches,
	onDeleteKeyword,
	onClearAll,
	className ="",
}) => {
	// Lọc từ khóa gợi ý dựa trên query
	const filteredSearches = query
		? recentSearches.filter((search) => search.keyword.toLowerCase().includes(query.toLowerCase()))
		: [];

	const containerClass = twMerge(
		'suggestions absolute grid grid-cols-1 md:grid-cols-2 gap-6 bg-white mt-2 p-4 z-10 w-[80%] border rounded-lg shadow-lg border-gray-300',
		className,
	);

    console.log(className)//underfined

	return (
		<div className={containerClass}>
			<div className="space-y-4 overflow-y-auto max-h-[500px]">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold flex items-center gap-2 text-black">
						<FaClock className="h-4 w-4 text-gray-400" />
						Từ khóa tìm kiếm gần đây
					</h2>
					<button className="text-green-600 text-sm hover:underline" onClick={onClearAll}>
						Xóa tất cả
					</button>
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
							<button
								className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
								onClick={() => onDeleteKeyword(search.keyword)}
							>
								{/* Icon X để xóa */}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchSuggest;
