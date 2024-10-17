import React, { useState } from 'react';

interface ChatInputProps {
    sendMessage: (newMessage: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <div className="absolute bottom-4 w-full flex items-center">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn"
                className="w-[80%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full focus:outline-none"
            >
                Gửi
            </button>
        </div>
    );
};

export default ChatInput;
