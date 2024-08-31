import React from 'react';
import Image from 'next/image';
import Beat from '../../../../public/img/bg.png';
import { GoDotFill } from 'react-icons/go';

export const EmployerCard = () => {
	return (
		<div className="relative flex flex-col items-center text-center mt-4 bg-transparent border border-gray-200 p-4">
			<div className="absolute inset-0 z-10">
				<Image
					src={Beat}
					alt="Background"
					width={500}
					height={200}
					objectFit="cover"
					className="rounded-lg"
				/>
			</div>
			<div className="relative z-20 mt-8 mx-auto bg-white rounded-lg shadow-lg p-4">
				<picture>
					<source
						data-srcset="https://i.pinimg.com/originals/18/b4/57/18b457a25f54edb34eaf33a38c78d920.png"
						srcSet="https://i.pinimg.com/originals/18/b4/57/18b457a25f54edb34eaf33a38c78d920.png"
					/>
					<img
						alt="Sungrove Tech Vietnam"
						className="rounded-lg object-cover"
						data-src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNkhOUHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--791c3c4dc74777940ed999d7badbdeb575c641af/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--89a7283b6fdfb4208cdc2b440a36613a6fae974c/z5058402251738_ae437626a1372e102a68510087a236c1.jpg"
						height={160}
						width={160}
						src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNkhOUHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--791c3c4dc74777940ed999d7badbdeb575c641af/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--89a7283b6fdfb4208cdc2b440a36613a6fae974c/z5058402251738_ae437626a1372e102a68510087a236c1.jpg"
					/>
				</picture>
			</div>
			<div className="mt-6 flex-grow text-black z-20">
				<h3 className="text-black text-lg font-semibold">Sungrove Tech Vietnam</h3>
				<div className="mt-4 flex flex-wrap justify-center gap-2">
					<div className="text-xs py-1 px-3 bg-gray-200 rounded-lg text-gray-700">VueJS</div>
					<div className="text-xs py-1 px-3 bg-gray-200 rounded-lg text-gray-700">TypeScript</div>
					<div className="text-xs py-1 px-3 bg-gray-200 rounded-lg text-gray-700">ReactJS</div>	
				</div>
			</div>

			<div className="w-full rounded-b-lg z-20 border-t-1 border-gray-300 flex justify-between items-center mt-4">
				<div className="text-gray-500">Ho Chi Minh</div>
				<div className="flex items-center text-it-black">
				   <GoDotFill className='text-green-500'/>
					1 Việc làm
					<svg className="w-5 h-5 ml-1 text-gray-700">
						<use href="https://itviec.com/assets/feather-icons-sprite-520cd3770a1002f7c87bd1ba253464228ad112abb4c34d81c8cda9f937487a49.svg#chevron-right" />
					</svg>
				</div>
			</div>
		</div>
	);
};
