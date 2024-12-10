import { IResumeInfo } from '@/app/types/interface';
import Image from '@/components/base/Image';
import moment from 'moment';
import React, { memo } from 'react';

interface MainResumeProps {
	userData: IResumeInfo | undefined;
}

const MainResume = ({ userData }: MainResumeProps) => {
	if (!userData) {
		return <div>Loading...</div>;
	}

		console.log(userData);

	return (
		<div className="min-h-screen bg-gray-100 flex">
			<div className="w-1/3 bg-gray-800 text-white p-8">
				<div className="mb-8">
					<Image
						src={userData.avatar || '/profile.jpg'}
						alt="Profile"
						width={100}
						height={100}
						className="rounded-full mx-auto"
					/>
				</div>

				<div className="mb-8">
					<h2 className="text-lg font-semibold">Contact</h2>
					<p>Phone: {'0969-117-045'}</p>
					<p>Email: {userData.email || 'Chưa có thông tin'}</p>
					<p>Address: {userData.address || 'Chưa có thông tin'}</p>
				</div>

				<div className="mb-8">
					<h2 className="text-lg font-semibold">Education</h2>
					{userData.certifications && userData.certifications.length > 0 ? (
						userData.certifications.map((cert: any, index: number) => (
							<div key={index}>
								<p>{cert.name || 'No certification name'}</p>
								<p>
									{cert.issuedDate
										? new Date(cert.issuedDate.$date).toLocaleDateString()
										: 'No issue date'}
								</p>
							</div>
						))
					) : (
						<p>No certifications available</p>
					)}
				</div>

				<div className="mb-8">
					<h2 className="text-lg font-semibold">Skill</h2>
					<ul>
						{userData.skills ? (
							userData.skills.map((skill: string, index: number) => {
								console.log(skill); 
								return <li key={index}>{skill}</li>;
							})
						) : (
							<li>No skills listed</li>
						)}
					</ul>
				</div>

				<div className="mb-8">
					<h2 className="text-lg font-semibold">Language</h2>
					<p>No languages listed</p>
				</div>
			</div>
			{/* ----------------------content----------------- */}
			<div className="w-2/3 bg-white p-12">
				<div className="mb-12">
					<h1 className="text-4xl font-bold">{userData.fullName || 'Unknown Name'}</h1>
					<p className="text-xl text-gray-500 mt-1">{userData.currentPosition}</p>
					<div className="mt-4 text-gray-700">
						<div
							className="first:indent-[30px]"
							dangerouslySetInnerHTML={{
								__html: userData?.introduction || 'No introduction available.',
							}}
						/>
					</div>
				</div>

				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Experience</h2>
					<div className="border-l-2 border-gray-300 pl-4">
						{userData.workExperience && userData.workExperience.length > 0 ? (
							userData.workExperience.map((exp: any, index: number) => (
								<div key={index} className="mb-8">
									<h3 className="font-bold">{exp.year}</h3>
									<p className="font-semibold">{exp.company}</p>
									<p>{exp.position}</p>
									<p>
										<strong>From </strong>
										{exp.start_date ? moment(exp.start_date).format('MMMM YYYY') : 'N/A'}
										<strong> to </strong>
										{exp.end_date ? moment(exp.end_date).format('MMMM YYYY') : 'Present'}
									</p>
									<p className="text-gray-700">{exp.description}</p>
								</div>
							))
						) : (
							<p>No experience available</p>
						)}
					</div>
				</div>

				{/* Reference */}
				{/* <div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Reference</h2>
					<div className="flex justify-between">
						{userData.references && userData.references.length > 0 ? (
							userData.references.map((ref: any, index: number) => (
								<div key={index}>
									<p className="font-bold">{ref.name}</p>
									<p>
										{ref.jobTitle}, {ref.company}
									</p>
									<p>Phone: {ref.phone}</p>
									<p>Email: {ref.email}</p>
								</div>
							))
						) : (
							<p>No references available</p>
						)}
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default memo(MainResume);
