import { Employers } from '@/components/client/Employers';
import SearchHome from '@/components/client/SearchHome';
import { JobSlide } from '@/components/client/Home';
import { IPost } from '@/app/types/interface';
import postsApi from '@/api/postsApi';
import companyApi from '@/api/companyApi';
import { log } from 'console';
import JobHeader from '@/components/client/JobSection/JobHeader';
import JobCards from '@/components/client/JobSection/JobCard';

export default async function Home() {
	// const posts: IPost[] = await postsApi.getPostForHome();
	// console.log('posts', posts);

	// const [posts, jobs] = await Promise.all([
	// 	postsApi.getPostForHome(),
	// 	// companyApi.getAllCompany({
	// 	// 	limit: 10,
	// 	// 	page: 1,
	// 	// }),
	// 	companyApi.getHomeCompanies(10),
	// ]);

	//  console.log('posts', posts);
	//  console.log('jobs', jobs);
	  const posts = await postsApi.getPostForHome();
  const jobs = await companyApi.getHomeCompanies(10);

 // console.log('posts', posts);
  //console.log('>>>>>>jobs', jobs);

	return (
		<main className="mt-[64px]">
			<SearchHome />
			{/*--- job header ---*/}
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-6 mt-4">
				<JobHeader jobs={posts} />
				{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{posts.map((post: any, index: number) => (
						<JobCards key={index} job={post} />
					))}
				</div>  */}
			{/* <JobSlide posts={posts} /> */}
			</div>
				<Employers jobs={jobs} />
		</main>
	);
}
