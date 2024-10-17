import Image from 'next/image';
import React from 'react';

const MainResume = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex">
			{/* Sidebar */}
			<div className="w-1/3 bg-gray-800 text-white p-8">
				{/* Profile Photo */}
				<div className="mb-8">
					<Image
						src="/profile.jpg"
						alt="Profile"
						width={100}
						height={100}
						className="rounded-full mx-auto"
					/>
				</div>

				{/* Contact Information */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold">Contact</h2>
					<p>Phone: 123-456-7890</p>
					<p>Email: hello@example.com</p>
					<p>Address: 123 Anywhere St, Any City</p>
				</div>

				{/* Education */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold">Education</h2>
					<p>2008 - Enter Your Degree</p>
					<p>University/College</p>
				</div>

				{/* Expertise */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold">Expertise</h2>
					<ul>
						<li>UI/UX</li>
						<li>Visual Design</li>
						<li>Wireframes</li>
					</ul>
				</div>

				{/* Language */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold">Language</h2>
					<p>English</p>
					<p>Spanish</p>
				</div>
			</div>

			{/* Main content */}
			<div className="w-2/3 bg-white p-12">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold">Mariana Anderson</h1>
					<p className="text-xl text-gray-500">Marketing Manager</p>
					<p className="mt-4 text-gray-700">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra in lorem at
						lorem.
					</p>
				</div>

				{/* Experience */}
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Experience</h2>
					<div className="border-l-2 border-gray-300 pl-4">
						{/* Experience Item */}
						<div className="mb-8">
							<h3 className="font-bold">2019 - 2022</h3>
							<p className="font-semibold">Company Name | Job Title</p>
							<p className="text-gray-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</div>

						{/* Repeat for other experiences */}
					</div>
				</div>

				{/* Reference */}
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Reference</h2>
					<div className="flex justify-between">
						<div>
							<p className="font-bold">Name Surname</p>
							<p>Job Title, Company Name</p>
							<p>Phone: 123-456-7890</p>
							<p>Email: hello@example.com</p>
						</div>
						<div>
							<p className="font-bold">Name Surname</p>
							<p>Job Title, Company Name</p>
							<p>Phone: 123-456-7890</p>
							<p>Email: hello@example.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainResume;
