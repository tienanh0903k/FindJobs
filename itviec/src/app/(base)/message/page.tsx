import { getMessages } from '@/api/fetching/messageApi';
import Conversation from '@/components/client/Messages/Conversation';
import Rightbar from '@/components/client/Messages/Rightbar';
import Sidebar from '@/components/client/Messages/Sidebar';
import Image from 'next/image';

export default async function MessagePage() {
	const usersChat = await getMessages();  
	console.log('usersChat', usersChat);
	return (
		<div className="flex h-screen"> 
			<Sidebar users={usersChat} />
            <div className='w-1/2 bg-white p-4 relative'>
                <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng đến với IT Message</h1>
                    <p className="text-center text-gray-600 max-w-md mb-6">
                        Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu
                        hoá cho máy tính của bạn.
                    </p>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">
                        Nhắn tin nhiều hơn, soạn thảo ít hơn
                    </h2>
                    <p className="text-center text-gray-500 max-w-lg">
                        Sử dụng <span className="font-bold">Tin Nhắn Nhanh</span> để lưu sẵn các tin nhắn thường
                        dùng và gửi nhanh trong hội thoại bất kỳ.
                    </p>
                </div>
            </div>
			<Rightbar />
		</div>
	);
}
