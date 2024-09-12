const CustomResume = () => {
	const templates = [
		{
			id: 1,
			name: 'Elegant',
			imageUrl:
				'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
		},
		{
			id: 2,
			name: 'Minimal',
			imageUrl:
				'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
		},
		{
			id: 3,
			name: 'Minimal',
			imageUrl:
				'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
		},
		// Add more templates as needed
	];

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-red-600 text-white p-4 flex justify-between">
				<div className="text-lg font-bold">itviec Mẫu CV</div>
				<nav className="space-x-4">
					<a href="#" className="hover:underline">
						EN
					</a>
					<a href="#" className="hover:underline">
						VI
					</a>
				</nav>
			</header>

			{/* Main Content */}
			<div className="flex">
				{/* Template Selector */}
				<aside className="w-1/3 bg-white max-h-screen p-4 overflow-y-auto">
					<h2 className="text-xl font-semibold mb-4">Chọn Mẫu CV</h2>
                    <div className="flex">
                        <div className="grid grid-cols-1 gap-4">
                            {templates.map((template) => (
                                <div key={template.id} className="border p-2 rounded hover:shadow-md">
                                    <img
                                        src={template.imageUrl}
                                        alt={template.name}
                                        className="w-full"
                                    />
                                    <button className="mt-2 w-full text-center bg-blue-600 text-white py-1 rounded">
                                        Nhà tuyển dụng gợi ý
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
				</aside>

				{/* Profile Form */}
				<main className="flex-1 bg-white p-6 max-w-3xl mx-auto my-8 rounded-lg shadow-md">
					<div className="profile">
						<div className="flex items-center border-b pb-4 mb-4">
							<img
								src="https://via.placeholder.com/100"
								alt="Profile"
								className="w-24 h-24 rounded-full mr-6"
							/>
							<div className="flex-1">
								<h1 className="text-2xl font-bold">Tien Anh Nguyen</h1>
								<p className="text-gray-500">Cập nhật chức danh của bạn</p>
								<div className="text-sm text-gray-600">
									<p>
										<span className="font-medium">Email:</span>{' '}
										tienanh09032003k@gmail.com
									</p>
									<p>
										<span className="font-medium">Điện thoại:</span> Thêm số
										điện thoại liên lạc
									</p>
									<p>
										<span className="font-medium">Ngày sinh:</span> Thêm ngày
										sinh
									</p>
									<p>
										<span className="font-medium">Nơi ở:</span> Thêm nơi ở hiện
										tại
									</p>
								</div>
							</div>
						</div>
						<div className="space-y-6">
							<Section title="Giới thiệu" content="hi" />
							<Section
								title="Học vấn"
								content="utehy"
								subContent="10/2018 - Hiện tại | IT"
							/>
							<Section title="Kỹ năng" content="Mới bắt đầu" subContent=".NET" />
							<Section
								title="Kinh nghiệm làm việc"
								content="Cập nhật kinh nghiệm làm việc của bạn"
							/>
							<Section
								title="Dự án cá nhân"
								content="11/2016 - Hiện tại"
								subContent="EVN QLTN"
							/>
							<Section title="Chứng chỉ" content="TOEIC" subContent="08/2018 | ISS" />
						</div>
					</div>
				</main>
			</div>

			{/* Footer */}
			<footer className="bg-white p-4 flex justify-between items-center">
				<button className="text-sm text-gray-600 hover:underline">
					Nâng cấp hồ sơ lên mức Rất tốt
				</button>
				<button className="bg-blue-600 text-white py-2 px-4 rounded">Tải CV</button>
			</footer>
		</div>
	);
};

const Section = ({ title, content, subContent }: any) => (
    <div>
        <h2 className="text-lg font-semibold border-b-2 border-blue-500 inline-block mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
        {subContent && <p className="text-gray-500">{subContent}</p>}
    </div>
);

export default CustomResume;


