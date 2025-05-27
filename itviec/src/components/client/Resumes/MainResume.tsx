import { IResumeInfo } from '@/app/types/interface';
import Image from '@/components/base/Image';
import moment from 'moment';
import React, { memo } from 'react';
import { IUser } from '@/app/types/interface';
import { formatDate, formatMonthYear } from '@/lib/helper';

interface MainResumeProps {
	userData: IUser | IResumeInfo | undefined;
	showContact?: boolean;
}

const MainResume = ({ userData, showContact = true }: MainResumeProps) => {
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
					<p>Phone: {
						showContact
							? (userData?.phone || 'Chưa có thông tin')
							: <span style={{ color: '#aaa', fontStyle: 'italic' }}>*******</span>
					}</p>
					<p> Email: {
						showContact
							? (userData?.email || 'Chưa có thông tin')
							: <span style={{ color: '#aaa', fontStyle: 'italic' }}>*******</span>
					}</p>
					<p>Address: {userData.address || 'Chưa có thông tin'}</p>
				</div>

				<div className="mb-8">
				<h2 className="text-lg font-semibold text-white border-b border-gray-400 pb-2 mb-4">Education</h2>
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
					<h2 className="text-lg font-semibold text-white border-b border-gray-400 pb-2 mb-4">Expertise</h2>
					<ul className="space-y-2 ml-4">
						{userData.skills && userData.skills.length > 0 ? (
							userData.skills.map((skill: string, index: number) => (
								<li key={index} className="list-disc text-white-700 text-base">
									{skill}
								</li>
							))
						) : (
							<li className="list-disc text-white text-base">No skills listed</li>
						)}
					</ul>
				</div>


				<div className="mb-8">
				{
					userData.languages && userData.languages.length > 0 ? (
						userData.languages.map((language: string, index: number) => (
							<>
								<h2 className="text-lg font-semibold text-white border-b border-gray-400 pb-2 mb-4">Language</h2>
								<li key={index} className="list-disc text-white-700 text-base">
									{language}
								</li>
							</>
						))
					) : (
						<li className="list-disc text-white text-base">No languages listed</li>
					)
				}
				</div>
				
			</div>
			{/* ----------------------content----------------- */}
			<div className="w-2/3 bg-white p-12">
				<div className="mb-12">
					<h1 className="text-4xl font-bold">{userData.userName || 'Unknown Name'}</h1>
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
					<h2 className="text-2xl font-semibold mb-2 border-b-2 border-black pb-2">Experience</h2>

					<div className="border-l-2 border-gray-300 pl-4 my-4">
						{userData.workExperience && userData.workExperience.length > 0 ? (
							userData.workExperience.map((exp: any, index: number) => (
								<div key={index} className="mb-8">
									<p className="font-semibold"> Name: {exp.companyName}</p>
									<p>Role: {exp.position}</p>
									<p> Date:
										{formatMonthYear(exp.startDate)}
										<strong> - </strong>
										{exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}
									</p>
									<p className="text-gray-700">{exp.description}</p>
								</div>
							))
						) : (
							<p>No experience available</p>
						)}
					</div>

					<h2 className="text-2xl font-semibold mb-2 border-b-2 border-black pb-2">Projects</h2>
					<div className="border-l-2 border-gray-300 pl-4 my-4">
						{userData.projects && userData.projects.length > 0 ? (
							userData.projects.map((project: any, index: number) => (
								<div key={index} className="mb-8">
									<p className="font-semibold">{project.title}</p>
									<h3 className="font-bold">
										{project.startDate ? moment(project.startDate).year() : ''}
									</h3>
									<p className="font-semibold">{project.companyName}</p>
									<p>Role: {project.role}</p>
									<p>
										{
											formatMonthYear(project.startDate)
										}
										<strong> - </strong>
										{
											formatMonthYear(project.endDate)
										}
									</p>
									<p className="text-gray-700">{project.description}</p>
								</div>
							))
						) : (
							<p>No project available</p>
						)}
					</div>

				</div>
			</div>
		</div>
	);
};

export default memo(MainResume);
