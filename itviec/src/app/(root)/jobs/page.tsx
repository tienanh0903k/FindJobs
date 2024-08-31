'use client';
import { useAppContext } from '@/context/AppProvider';
import React from 'react';

const ListJobs = () => {
	const { sessionToken } = useAppContext();
    console.log(sessionToken);
	return (
		<div>
			<h1>{ sessionToken }</h1>
		</div>
	);
};

export default ListJobs;