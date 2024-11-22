'use client';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { ProfileInfo } from './ProfileInfo';

interface IProfileProps {
	data: any;
}

export default function Profile(
	// { data }: IProfileProps
) {
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
		// <>
		// 	<div>
		// 		<h1>User Profile</h1>
		// 		<p>Name: {data?.userName}</p>
		// 		<p>Email: {data?.email}</p>
		// 		{/* Hiển thị thông tin user khác nếu cần */}
		// 	</div>
		// </>
	);
}
