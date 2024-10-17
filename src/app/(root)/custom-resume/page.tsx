'use client'
import { MainResume, SubResume } from "@/components/client/Resumes";
import { useState } from "react";

const CustomResume = () => {
	const [selectCV, setSelectCV] = useState(0);
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
				'https://cdn1.vieclam24h.vn/images/assets/img/cv8-202122.png',
		}
	];

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="flex">
				<aside className="w-1/3 bg-white max-h-screen p-4 overflow-y-auto">
					<h2 className="text-xl font-semibold mb-4">Chọn Mẫu CV</h2>
                    <div className="flex">
                        <div className="grid grid-cols-1 gap-4">
                            {templates.map((template, index) => (
                                <div key={template.id} className="border p-2 rounded hover:shadow-md">
                                    <img
                                        src={template.imageUrl}
                                        alt={template.name}
                                        className="w-full"
                                    />
                                    <button onClick={()=>{
										setSelectCV(index)
									}} className="mt-2 w-full text-center bg-blue-600 text-white py-1 rounded">
                                        Nhà tuyển dụng gợi ý
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
				</aside>

				{/* Profile Form */}
				<main className="flex-1 bg-white p-6 max-w-3xl mx-auto my-8 rounded-lg shadow-md">
					{
						selectCV===0 ? <MainResume /> : <SubResume />

					}
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


