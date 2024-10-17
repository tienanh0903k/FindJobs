import { useTranslations } from 'next-intl';
import React from 'react';

const SearchHome = () => {
	const t = useTranslations()
	return (
		<div className="text-white bg-custom-gradient p-8 rounded-lg shadow-xl">
			<div className="mx-auto max-w-[70%]">
				<h1 className="text-3xl font-bold mb-4">
					{t('home.search')}
				</h1>
				<form className="flex items-center max-w-[95%] gap-2">
					<select className="bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
						<option value="">Select location</option>
						<option value="1">Location 1</option>
						<option value="2">Location 2</option>
						<option value="3">Location 3</option>
					</select>

					<input
						type="text"
						placeholder="Tìm kiếm việc làm..."
						className="bg-white text-black placeholder-black px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
					/>
					<button
						type="submit"
						className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Search
					</button>
				</form>
				{/* suggest for me  */}

				<div className="flex mt-4">
					<div className="rounded-lg p-2">Gợi ý cho bạn:</div>
					<ul className="flex flex-wrap ml-4 space-x-2">
						<li className=''>
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
