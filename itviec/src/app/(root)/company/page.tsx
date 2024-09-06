import React from 'react';

const Companies = () => {
	return (
		<main className="min-h-screen mt-[72px] bg-gray-100">
			<div className="mx-auto p-4 bg-custom-gradient">
				<div className="grid grid-cols-3 gap-4 h-full">
					<div className="col-span-2">
						<div className="flex items-center space-x-4">
							<div className="logo w-36 h-36 bg-white border-2 border-gray-300 rounded-sm overflow-hidden flex items-center justify-center">
								<img
									src="https://media.licdn.com/dms/image/v2/C560BAQFRxbxHAl5oew/company-logo_200_200/company-logo_200_200/0/1630668147018/fpt_corporation_logo?e=2147483647&v=beta&t=WW03ljSGZoL6rHvwTqGDIlWDqttr8Jii1yHjHnFm8Xk"
									alt="ANDPAD VietNam Co., Ltd Vietnam Big Logo"
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="flex flex-col w-full text-white">
								<h1 className="text-lg font-semibold">ANDPAD VietNam Co., Ltd</h1>
								<div className="flex space-x-4">
									<div className="flex items-center space-x-1">
										<span>i</span>
										<div className="text-sm">Ho Chi Minh - Ha Noi</div>
									</div>
									<div className="flex items-center space-x-1">
										<span>i</span>
										<div className="text-sm">3 việc làm đang tuyển dụng </div>
									</div>
								</div>
								<div className="flex space-x-4 mt-4">
									<button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
										Đánh giá
									</button>
									<button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
										Theo dõi
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-1 flex flex-col items-center justify-center space-y-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-4">
						{/* Hiển thị số sao bình chọn */}
						<div className="flex items-center space-x-1">
							<h2 className="text-xl font-bold">4.9</h2>
							{[...Array(5)].map((_, index) => (
								<svg
									key={index}
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 .587l3.668 7.571 8.332 1.151-6 5.847 1.4 8.285L12 18.896l-7.4 4.545L6 15.156l-6-5.847 8.332-1.151z" />
								</svg>
							))}
						</div>

						{/* Hiển thị số đánh giá */}
						<div className="text-gray-600 text-sm">4.5 trên 5 sao (200 đánh giá)</div>
					</div>
				</div>
			</div>

			<div className="mt-6 p-4">
				<div className="grid grid-cols-10 gap-4">
					{/* Thông tin chung chiếm 7 phần */}
					<div className="col-span-7 p-4 space-y-4">
						{/* Thông tin chung */}
						<div className="border p-4 bg-white rounded-md shadow-sm">
							<h2 className="text-lg font-semibold">Thông tin chung</h2>
							<p>... Nội dung thông tin chung ở đây ...</p>
						</div>

						{/* Giới thiệu công ty */}
						<div className="border p-4 bg-white rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold border-b border-gray-300 pb-2">Giới thiệu công ty</h2>
                        <div className="">No.1 Construction Tech Company in Japan
                                <p>Our parent company, ANDPAD Inc., is No.1 cloud-based construction tech company in Japan and providing the construction project management service with more than 410,000 users. ANDPAD covers from communication, site schedule arrangement, quality check, order control to management improvement in the construction industry.</p><p>ANDPAD Vietnam is part of ANDPAD Inc. and was established in early January 2022 in Vietnam Software engineers and development team in ANDPAD Vietnam enjoy dynamic roles of SaaS product development within an international working environment, not consuming tasks but more on creative engineering works for clients and users in the construction industry.</p>
                            </div>
						</div>

						{/* Chuyên môn của chúng tôi */}
						<div className="border p-4 bg-white rounded-md shadow-sm">
							<h2 className="text-lg font-semibold">Chuyên môn của chúng tôi</h2>
							<p>... Nội dung chuyên môn ở đây ...</p>
						</div>
					</div>

					{/* Các việc đang tuyển dụng chiếm 3 phần với cuộn dọc */}
					<div className="col-span-3 p-4 overflow-y-auto h-screen">
						<h2 className="text-xl font-semibold">Các việc đang tuyển dụng</h2>
						<div className=" bg-orange-100 space-y-4">
							{/* Danh sách việc làm */}
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 1</h3>
								<p>Mô tả công việc 1...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							<div className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">Việc làm 2</h3>
								<p>Mô tả công việc 2...</p>
							</div>
							{/* Thêm các việc làm khác tại đây */}
						</div>
					</div>
				</div>
			</div>
			{/* //Thông tin chung (chiem 7 pham ben trai)
            //cac viec dang tuyen (chiem 3 phan ben phai co scroll ben do) */}
		</main>
	);
};

export default Companies;
