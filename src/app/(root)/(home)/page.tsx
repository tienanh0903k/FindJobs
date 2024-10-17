import Image from "next/image";
import Logo from './favicon.ico'
import { Employers } from "@/components/client/Employers";
import SearchHome from "@/components/client/SearchHome";
import { JobSlide } from "@/components/client/Home";

export default function Home() {
  return (
    <main className="mt-[64px]">
      <SearchHome />
      <JobSlide />
      <Employers />
    </main>
  );
}
  