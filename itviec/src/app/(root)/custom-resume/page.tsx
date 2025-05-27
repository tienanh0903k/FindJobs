'use client'
import userApi from "@/api/userApi";
import { IResumeInfo, IUserType } from "@/app/types/interface";
import Image from "@/components/base/Image";
import SectionEdit from "@/components/base/SectionEdit";
import { MainResume, SubResume } from "@/components/client/Resumes";
import { templates } from "@/constants";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CustomResume = () => {

	const [selectCV, setSelectCV] = useState(0);
	const [userData, setUserData] = useState<IResumeInfo>(); 
	const resumeRef = useRef(null);


	useEffect(() => {
		const fetchMe = async () => { 
			try {
				const response = await userApi.getMe();
				// console.log(response.data);
				setUserData(response.data || [])
			} catch (error) {
				console.error('Error fetching me:', error);
			}
		}
		fetchMe();
	}, []);

	const handleDownloadCV = async () => {
		if (resumeRef.current) {
			const canvas = await html2canvas(resumeRef.current, {
				useCORS: true, 
				scale: 2
			});
			const imgData = canvas.toDataURL("image/png");

			console.log('imgData', imgData);
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "px",
				format: 'a4',	
			});
			const width = pdf.internal.pageSize.getWidth();
			const height = (canvas.height * width) / canvas.width;

			pdf.addImage(imgData, "PNG", 0, 0, width, height);			
			pdf.save("resume.pdf");
		}
		console.log('click')
	};

	return (
		<div className="min-h-screen bg-gray-100 mt-[60px]">
			<div className="flex">
				<aside className="w-1/3 bg-white max-h-screen p-4 overflow-y-auto">
					<h2 className="text-xl font-semibold mb-4">Chọn Mẫu CV</h2>
					<div className="flex">
						<div className="grid grid-cols-1 gap-4">
							{templates.map((template, index) => (
								<div key={template.id} className="border p-2 rounded hover:shadow-md">
									<Image src={template.imageUrl} alt={template.name} className="w-full" />
									<button
										onClick={() => {
											setSelectCV(index);
										}}
										className="mt-2 w-full text-center bg-blue-600 text-white py-1 rounded"
									>
										Nhà tuyển dụng gợi ý
									</button>
								</div>
							))}
						</div>
					</div>
				</aside>

				{/* Profile Form */}
				<main className="flex-1 bg-white p-6 max-w-3xl mx-auto my-8 rounded-lg shadow-md">
					<div ref={resumeRef}>
						{selectCV === 0 ? (
							<MainResume userData={userData} />
						) : (
							<SubResume userData={userData} />
						)}
					</div>
				</main>
			</div>

			<footer className="bg-white p-4 flex justify-between items-center fixed bottom-0 right-0 left-0 border-t shadow-md">
				<button className="text-sm text-gray-600 hover:underline">
					Nâng cấp hồ sơ lên mức Rất tốt
				</button>
				<button onClick={handleDownloadCV} className="bg-blue-600 text-white py-2 px-4 rounded">
					Tải CV
				</button>
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


// import { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const CustomResume = () => {
// 	const [selectCV, setSelectCV] = useState(0);
// 	const [userData, setUserData] = useState<IUserType>(); 
// 	const resumeRef = useRef(null);  // Tạo ref để tham chiếu tới phần resume

// 	useEffect(() => {
// 		const fetchMe = async () => { 
// 			try {
// 				const response = await userApi.getMe();
// 				setUserData(response.data || []);
// 			} catch (error) {
// 				console.error('Error fetching me:', error);
// 			}
// 		};
// 		fetchMe();
// 	}, []);

// 	const handleDownloadCV = async () => {
// 		if (resumeRef.current) {
// 			// Sử dụng html2canvas để chụp lại màn hình của phần resume
// 			const canvas = await html2canvas(resumeRef.current);
// 			const imgData = canvas.toDataURL("image/png");
// 			const doc = new jsPDF();
// 			doc.addImage(imgData, "PNG", 0, 0, 210, 297); // Tạo PDF với hình ảnh vừa chụp
// 			doc.save("resume.pdf"); // Lưu file PDF
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen bg-gray-100">
// 			<div className="flex">
// 				<aside className="w-1/3 bg-white max-h-screen p-4 overflow-y-auto">
// 					<h2 className="text-xl font-semibold mb-4">Chọn Mẫu CV</h2>
// 					<div className="flex">
// 						<div className="grid grid-cols-1 gap-4">
// 							{templates.map((template, index) => (
// 								<div key={template.id} className="border p-2 rounded hover:shadow-md">
// 									<Image src={template.imageUrl} alt={template.name} className="w-full" />
// 									<button
// 										onClick={() => setSelectCV(index)}
// 										className="mt-2 w-full text-center bg-blue-600 text-white py-1 rounded"
// 									>
// 										Nhà tuyển dụng gợi ý
// 									</button>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</aside>

// 				{/* Profile Form */}
// 				<main className="flex-1 bg-white p-6 max-w-3xl mx-auto my-8 rounded-lg shadow-md" ref={resumeRef}>
// 					{selectCV === 0 ? <MainResume userData={userData} /> : <SubResume userData={userData} />}
// 				</main>
// 			</div>

// 			<footer className="bg-white p-4 flex justify-between items-center fixed bottom-0 right-0 left-0 border-t shadow-md">
// 				<button className="text-sm text-gray-600 hover:underline">
// 					Nâng cấp hồ sơ lên mức Rất tốt
// 				</button>
// 				<button
// 					onClick={handleDownloadCV}  // Thêm sự kiện tải CV
// 					className="bg-blue-600 text-white py-2 px-4 rounded"
// 				>
// 					Tải CV
// 				</button>
// 			</footer>
// 		</div>
// 	);
// };
