'use client';
import { useAppSelector } from '@/hook/useSelector';
import ChatInput from './ChatInput';
import { RootState } from '@/redux/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getConversation } from '@/api/fetching/messageApi';
import messApi from '@/api/messApi';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');
interface IConversation {
	id?: string;
	title?: string;
	companyName?: string;
}

interface IMessage {
	_id: string;
	sender_id: string;
	receive_id: string;
	message: string;
	timestamp: string;
	userName: string;
}

const Converation: React.FC<IConversation> = ({ id, title, companyName }) => {
	const currentUser: any = useAppSelector((state: RootState) => state.auth?.currentUser);

	const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState<IMessage[]>([]);

	const messageEndRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null); 

	const senderId = currentUser?.user?._id;
	// useEffect(() => {
	// 	const fetchConversation = async () => {
	// 		if (!senderId || !id) return;
	// 		const res = await messApi.getConversationClient(senderId, id);
	// 		//console.log(res);
	// 		if (res.status == 200) {
	// 			setMessages(res.data);
	// 		}
	// 	};
	// 	fetchConversation();
	// }, [id]);
	const fetchConversation = useCallback(async () => {
		if (!senderId || !id) return;
		try {
			const res = await messApi.getConversationClient(senderId, id);
			if (res.status === 200) {
				setMessages(res.data);
			}
		} catch (error) {
			console.error('Error fetching conversation:', error);
		}
	}, [senderId, id]);

	useEffect(() => {
		fetchConversation();
	}, [fetchConversation]);

	useEffect(() => {
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: 'auto' });
		}
	}, [messages]);

	useEffect(() => {
		if (currentUser?.user?._id) {
			socket.emit("addUser", { userId: currentUser.user._id });
		}
	}, [currentUser]);


	 useEffect(() => {
        socket.on('receive_message', (msg) => {
            console.log("Received message from server:", msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);
	

	// const sendMessage = () => {
    //     if (newMessage.trim() && senderId && id) {
    //         const messageData = {
    //             sender_id: senderId,
    //             receive_id: id,
    //             message: newMessage,
    //             timestamp: new Date().toISOString(),
    //         };
    //         socket.emit('send_message', messageData);
    //         setMessages((prevMessages) => [...prevMessages, messageData]);
            
    //         // Reset input sau khi gửi
    //         setNewMessage('');

	// 		if (buttonRef.current) {
    //             buttonRef.current.focus();
    //         }
    //     }
    // };
	const sendMessage = useCallback(() => {
		if (newMessage.trim() && senderId && id) {
			const messageData = {
				sender_id: senderId,
				receive_id: id,
				message: newMessage,
				timestamp: new Date().toISOString(),
			};
			socket.emit('send_message', messageData);
			setMessages((prevMessages) => [...prevMessages, messageData]);
			setNewMessage('');
			if (buttonRef.current) {
				buttonRef.current.focus();
			}
		}
	}, [newMessage, senderId, id]);

	//console.log('data:', messages);
	return (
		<>
			<div className="w-1/2 bg-white h-[100%] p-4 relative">
				<div className="flex items-center mb-4 border-b-2 border-gray-200 shadow-xs">
					<img
						src="https://via.placeholder.com/50"
						alt="Logo Công ty"
						className="w-12 h-12 rounded-full"
					/>
					<div className="ml-4">
						<p className="text-xl font-bold">Nga</p>
						<p className="text-gray-500">Công ty TNHH BlueOC Tech</p>
					</div>
				</div>

				{/* <div className="text-center text-gray-500">
					<p>Hãy bắt đầu cuộc trò chuyện bằng một lời chào</p>
				</div> */}
				{/* <div className="overflow-y-auto h-96 mb-4">
						<div className="mb-4">
							<div className="flex items-start mb-4">
								<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
									<img src="https://via.placeholder.com/40" alt="Sender" className="rounded-full" />
								</div>
								<div className="ml-2">
									<div className="bg-gray-100 p-3 rounded-lg">
										<p className="text-sm">Xin chào, tôi là đại diện từ Công ty TNHH BlueOC Tech.</p>
									</div>
									<p className="text-xs text-gray-400 mt-1">10:15 AM</p>
								</div>
							</div>

							<div className="flex justify-end mb-4">
								<div className="text-right">
									<div className="bg-blue-500 text-white p-3 rounded-lg">
										<p className="text-sm">
											Vâng, tôi rất quan tâm. Bạn có thể cho tôi biết thêm chi tiết được không?
										</p>
									</div>
									<p className="text-xs text-gray-400 mt-1">10:18 AM</p>
								</div>
							</div>
						</div>
					</div> */}
				<div className="overflow-y-auto max-h-[78%] mb-4">
					{messages.map((message) => (
						<div key={message._id} className="mb-4">
							{message.sender_id === senderId ? (
								<div className="flex justify-end mb-4">
									<div className="text-right">
										<div className="bg-blue-500 text-white p-3 rounded-lg">
											<p className="text-sm">{message.message}</p>
										</div>
										<p className="text-xs text-gray-400 mt-1">
											{new Date(message.timestamp).toLocaleTimeString()}
										</p>
									</div>
								</div>
							) : (
								<div className="flex items-start mb-4">
									<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
										<img
											src="https://via.placeholder.com/40"
											alt="Sender"
											className="rounded-full"
										/>
									</div>
									<div className="ml-2">
										<div className="bg-gray-100 p-3 rounded-lg">
											<p className="text-sm">{message.message}</p>
										</div>
										<p className="text-xs text-gray-400 mt-1">
											{new Date(message.timestamp).toLocaleTimeString()}
										</p>
									</div>
								</div>
							)}
						</div>
					))}
					<div ref={messageEndRef} />
				</div>

				{/* chat input */}
				<div className="absolute bottom-4 w-full flex items-center">
					<input
						value={newMessage}
						type="text"
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Nhập tin nhắn"
						className="w-[80%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
					/>
					<button
						ref={buttonRef}
						onClick={sendMessage}
						className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full focus:outline-none"
					>
						Send
					</button>
				</div>
			</div>
		</>
	);
};

export default Converation;
