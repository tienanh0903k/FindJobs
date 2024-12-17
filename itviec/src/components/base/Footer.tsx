// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='relative bottom-0 w-full h-16 bg-red-600'>
//         FOOTER
//     </div>
//   )
// }

// export default Footer




import React from 'react';
import Image from './Image';

const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-red-950 to-black text-white py-8 mt-8 sm:mt-[50%] md:mt-[50%] lg:mt-20">

			<div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
				<div className="flex flex-col">
					<Image src="#" alt="ITViec Logo" className="mb-4 w-32" />
					<p className="text-gray-400">Ít nhưng mà chất</p>
					<div className="flex space-x-4 mt-4">
						<a href="#" className="text-gray-400 hover:text-white">
							<i className="fab fa-linkedin"></i>
						</a>
						<a href="#" className="text-gray-400 hover:text-white">
							<i className="fab fa-facebook"></i>
						</a>
						<a href="#" className="text-gray-400 hover:text-white">
							<i className="fab fa-youtube"></i>
						</a>
					</div>
				</div>

				<div>
					<h3 className="text-lg font-bold mb-4">Về ITviec</h3>
					<ul className="space-y-2 text-gray-400">
						<li>
							<a href="#" className="hover:text-white">
								Trang Chủ
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Về ITviec.com
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Dịch vụ gợi ý ứng viên
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Liên Hệ
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Việc Làm IT
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Câu hỏi thường gặp
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-lg font-bold mb-4">Chương trình</h3>
					<ul className="space-y-2 text-gray-400">
						<li>
							<a href="#" className="hover:text-white">
								Chuyện IT
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Cuộc thi viết
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Việc làm IT nổi bật
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Khảo sát thường niên
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-lg font-bold mb-4">Liên hệ để đăng tin tuyển dụng tại:</h3>
					<ul className="space-y-2 text-gray-400">
						<li>Hồ Chí Minh: (+84) 977 460 519</li>
						<li>Hà Nội: (+84) 983 131 351</li>
						<li>
							Email:{' '}
							<a href="mailto:love@itviec.com" className="hover:text-white">
								love@itviec.com
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white">
								Gửi thông tin liên hệ
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
				Copyright © IT VIEC JSC | MST: 0312192258
			</div>
		</footer>
	);
};

export default Footer;

