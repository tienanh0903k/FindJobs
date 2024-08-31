import Image from "next/image";
import Logo from './favicon.ico'
import { Employers } from "@/components/client/Employers";
import SearchHome from "@/components/client/SearchHome";

export default function Home() {
  return (
    <main className="mt-[64px]">
      <SearchHome />
      <Employers />
    </main>
  );
}
  