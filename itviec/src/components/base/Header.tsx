'use client';
import Image from 'next/image';
import Logo from '../../../public/img/Logo.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
		className={`fixed top-0 left-0 right-0 z-50 transition-all border-b border-border-custom w-full ${
			isScrolled ? 'bg-custom-gradient py-2 shadow-md' : 'bg-custom-gradient py-4'
		}`}
    >
      <nav className="container flex justify-between items-center h-full w-[95%] mx-auto">
        <div className="w-24 h-10 relative mr-6">
          <Link href="/">
            <Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
          </Link>
        </div>
        {/* MENU & OPTION */}
        <div className="flex items-center w-full space-x-4">
          <ul className="flex space-x-4" style={{ flexBasis: '50%' }}>
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                Việc Làm IT
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-gray-700">
                Top Công ty IT
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-400 hover:text-gray-700">
                Blog
              </Link>
            </li>
          </ul>

          <ul className="flex space-x-4 justify-end" style={{ flexBasis: '50%' }}>
            <li>
              <div className="flex items-center gap-1 cursor-pointer">
                <Image
                  className="rounded-full"
                  src={Logo}
                  alt="Search"
                  width={25}
                  height={25}
                />
                <div className="text-white">Ntasports</div>
              </div>
            </li>
            <li>
              <select className="bg-transparent text-white border-none focus:ring-0">
                <option className="text-black" value="en">
                  EN
                </option>
                <option className="text-black" value="vi">
                  VI
                </option>
              </select>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
