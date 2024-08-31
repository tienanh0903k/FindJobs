// 'use client'
// import { Document, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import React, { useState } from 'react';
// import { FiEdit } from 'react-icons/fi';
// import { FirstCV } from '../PDFRender/FirstCV';

// export const Profile = () => {
//     const [showPdf, setShowPdf] = useState(false);
//     return (
// 		<div className="w-[80%] mx-auto p-4">
// 			{/* Personal Information Section */}
// 			<section className="relative border rounded-lg bg-white p-4 mb-4 shadow-sm">
// 				<h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
// 				<div className="flex items-center">
// 					<div className="w-24 h-24">
// 						<img
// 							className="rounded-full object-cover"
// 							src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeHJYVEE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b2fd7486ad904864754c2e306b83f46c9c34b30c/ACg8ocJywPG2C-sf0Q73WUEhuSnSq3ROmBfJT30RXf-NG3OniSfT4zE=s96-c.jpg"
// 							alt="Profile"
// 						/>
// 					</div>
// 					<div className="ml-4">
// 						<h3 className="text-lg font-semibold">Nguyen Tien Anh</h3>
// 						<p className="text-gray-700">johndoe@example.com</p>
// 						<p className="text-gray-700">0123456789</p>
// 					</div>
// 				</div>
// 				<button className="text-white rounded-lg mt-4 absolute top-0 right-2 border-none">
// 					<FiEdit className="text-blue-500 font-bold" />
// 				</button>
// 			</section>

// 			{/* Skills Section */}
// 			<section className="border rounded-lg bg-white p-4 mb-4 shadow-sm">
// 				<h2 className="text-xl font-semibold mb-4">Kỹ năng</h2>
// 				<div className="flex flex-wrap gap-2">
// 					<span className="bg-emerald-200 text-emerald-800 py-1 px-3 rounded-lg">
// 						ReactJS
// 					</span>
// 					<span className="bg-emerald-200 text-emerald-800 py-1 px-3 rounded-lg">
// 						TypeScript
// 					</span>
// 					<span className="bg-emerald-200 text-emerald-800 py-1 px-3 rounded-lg">
// 						JavaScript
// 					</span>
// 					<span className="bg-emerald-200 text-emerald-800 py-1 px-3 rounded-lg">
// 						NodeJS
// 					</span>
// 				</div>
// 			</section>

// 			{/* Education Section */}
// 			<section className="border rounded-lg bg-white p-4 mb-4 shadow-sm">
// 				<h2 className="text-xl font-semibold mb-4">Học vấn</h2>
// 				<div>
// 					<h3 className="text-lg font-semibold">Đại học Công nghệ Thông tin</h3>
// 					<p className="text-gray-700">Cử nhân Khoa học Máy tính</p>
// 					<p className="text-gray-700">2016 - 2020</p>
// 				</div>
// 			</section>

// 			{/* Projects Section */}
// 			<section className="border rounded-lg bg-white p-4 mb-4 shadow-sm">
// 				<h2 className="text-xl font-semibold mb-4">Dự án</h2>
// 				<div>
// 					<h3 className="text-lg font-semibold">Project A</h3>
// 					<p className="text-gray-700">Description of project A...</p>
// 				</div>
// 				<div className="mt-4">
// 					<h3 className="text-lg font-semibold">Project B</h3>
// 					<p className="text-gray-700">Description of project B...</p>
// 				</div>
// 			</section>

// 			{/* Save and View CV Buttons */}
// 			<div className="flex justify-between mt-4">
// 				<button className="py-2 px-4 bg-blue-500 text-white rounded-lg">Lưu</button>
// 				<button
// 					onClick={() => {
// 						setShowPdf(true);
// 					}}
// 					className="py-2 px-4 bg-blue-500 text-white rounded-lg"
// 				>
// 					Xem
// 				</button>
// 			</div>

// 			<PDFDownloadLink document={<FirstCV />} fileName="myfirstpdf.pdf">
// 				{({ loading, url, error, blob }) =>
// 					loading ? <button>Loading Document ...</button> : <button>Download now!</button>
// 				}
// 			</PDFDownloadLink>

// 			{/* show cv */}
// 			{showPdf && (
// 				<div className="pdf-viewer mt-4">
// 					<PDFViewer>
// 						<FirstCV />
// 					</PDFViewer>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Profile;

'use client';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { ProfileInfo } from './ProfileInfo';

export default function Profile() {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
		<Box sx={{ width: '100%', typography: 'body1', background: '#f7f7f7' }}>
			<TabContext value={value}>
				<Box
					sx={{
						background: '#fff',
						borderBottom: 1,
						borderColor: 'divider',
						'& .Mui-selected': {
							color: 'red !important',
						},
						'& .MuiTab-root': {
							color: 'gray',
						},
						'& .MuiTabs-indicator': {
							backgroundColor: 'red',
						},
					}}
				>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Hồ sơ" value="1" />
						<Tab label="Quản lý CV" value="2" />
						<Tab label="Tiêu chí tìm việc" value="3" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<ProfileInfo />
				</TabPanel>
				<TabPanel value="2">Item Two</TabPanel>
				<TabPanel value="3">Item Three</TabPanel>
			</TabContext>
		</Box>
  );
}
