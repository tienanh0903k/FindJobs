import Image from "next/image";
import Logo from './favicon.ico'
import { Employers } from "@/components/client/Employers";
import SearchHome from "@/components/client/SearchHome";
import { JobSlide } from "@/components/client/Home";
import { IPost } from "@/app/types/interface";
import postsApi from "@/api/postsApi";
import companyApi from "@/api/companyApi";
import { log } from "console";

export default async function Home() {
  // const posts: IPost[] = await postsApi.getPostForHome();
  // console.log('posts', posts);

  const [posts, jobs] = await Promise.all([
    postsApi.getPostForHome(), 
    companyApi.getAllCompany({
      limit: 10,
      page: 1
    })
  ]);



  // console.log(posts, jobs)
  return (
    <main className="mt-[64px]">
      <SearchHome />  
      <JobSlide posts={posts} />
      <Employers jobs={jobs} />
    </main>
  );
}
  