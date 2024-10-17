'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ISidebar {
  className?: string;
  users: User[];
  onClick?: (userId: string) => void;
}

interface User {
  receive_id: string;
  userName: string;
}

const Sidebar: React.FC<ISidebar> = ({ className, users = [], onClick, ...props }) => {
  const pathname = usePathname();
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const handleUserClick = (userId: string) => {
    setActiveUser(activeUser === userId ? null : userId);
  };

  return (
    <>
      <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold">IT Message</h1>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên công ty, tên nhà tuyển dụng..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {users.length > 0 &&
          users.map((user) => (
            <Link key={user.receive_id} href={`/message/${user.receive_id}`} passHref>
              <div
                onClick={() => handleUserClick(user.receive_id)}
                className={`flex items-center mb-4 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                  pathname === `/message/${user.receive_id}`
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-black'
                }`}
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt={`Logo của ${user.userName}`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <p className="font-bold">{user.userName}</p>
                  <p className="text-sm text-gray-500">Công ty TNHH BlueOC Tech</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Sidebar;