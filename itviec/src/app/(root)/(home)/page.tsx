import Image from "next/image";
import Logo from './favicon.ico'
import { Employers } from "@/components/client/Employers";
import SearchHome from "@/components/client/SearchHome";
import { JobSlide } from "@/components/client/Home";
import { IPost } from "@/app/types/interface";
import postsApi from "@/api/postsApi";

export default async function Home() {
  const posts: IPost[] = await postsApi.getPostForHome();
  console.log('posts', posts);

  return (
    <main className="mt-[64px]">
      <SearchHome />  
      <JobSlide posts={posts} />
      <Employers />
    </main>
  );
}
  