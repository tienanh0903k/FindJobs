// 'use client';

// import { useState, useRef } from 'react';

// export default function ChatPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: 'bot', text: 'Chào bạn 👋 Mình có thể giúp gì hôm nay?' },
//   ]);
//   const [input, setInput] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const togglePopup = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleSend = async () => {
//     if (!input.trim() && !file) return;

//     // Hiển thị message người dùng
//     setMessages((prev) => [
//       ...prev,
//       ...(input ? [{ from: 'user', text: input }] : []),
//       ...(file ? [{ from: 'user', text: `📎 Đã gửi file: ${file.name}` }] : []),
//     ]);
//     setInput('');
//     setLoading(true);

//     try {
//       let fileName = '';

//       // Upload file nếu có
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         const uploadRes = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         const uploadData = await uploadRes.json();
//         fileName = uploadData.fileName;
//       }

//       // Gửi message + fileName tới API phân tích
//       const analyzeRes = await fetch('/api/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input.trim(), fileName }),
//       });

//       const analysis = await analyzeRes.json();
//       setMessages((prev) => [
//         ...prev,
//         { from: 'bot', text: analysis.analysis || 'Không thể phân tích.' },
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { from: 'bot', text: 'Đã có lỗi xảy ra khi xử lý.' },
//       ]);
//     }

//     setLoading(false);
//     setFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   return (
//     <>
//       <button
//         onClick={togglePopup}
//         className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
//       >
//         💬 Hỗ trợ
//       </button>

//       {isOpen && (
//         <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-300 animate-fade-in flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between bg-emerald-600 text-white px-4 py-2 rounded-t-lg">
//             <span className="font-semibold">AI Tư Vấn</span>
//             <button onClick={closePopup} className="text-xl leading-none">×</button>
//           </div>

//           {/* Body */}
//           <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-2 text-sm">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`px-3 py-2 rounded-lg w-fit max-w-[90%] ${
//                   msg.from === 'bot'
//                     ? 'bg-gray-100 text-gray-800'
//                     : 'bg-emerald-100 text-emerald-900 self-end ml-auto'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && <div className="text-xs text-gray-500 italic">Đang xử lý...</div>}
//           </div>

//           {/* Footer */}
//           <div className="p-2 border-t border-gray-200 flex flex-col gap-2">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={handleFileChange}
//               className="text-sm"
//             />
//             <div className="flex">
//               <input
//                 type="text"
//                 placeholder="Nhập tin nhắn..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="flex-grow border border-gray-300 px-3 py-2 rounded-l-md text-sm focus:outline-none"
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-emerald-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-emerald-700"
//               >
//                 Gửi
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// 'use client';

// import { useState, useRef } from 'react';

// export default function ChatPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: 'bot', text: 'Chào bạn 👋 Mình có thể giúp gì hôm nay?' },
//   ]);
//   const [input, setInput] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const togglePopup = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleSend = async () => {
//     if (!input.trim() && !file) return;

//     // Hiển thị message người dùng
//     setMessages((prev) => [
//       ...prev,
//       ...(input ? [{ from: 'user', text: input }] : []),
//       ...(file ? [{ from: 'user', text: `📎 Đã gửi file: ${file.name}` }] : []),
//     ]);
//     setInput('');
//     setLoading(true);

//     try {
//       let fileContent = '';

//       // Upload file nếu có
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         // Gửi tệp tới API để phân tích
//         const uploadRes = await fetch('http://localhost:3001/api/resume/pdf', {
//           method: 'POST',
//           body: formData,
//         });

//         const uploadData = await uploadRes.json();
//         console.log('Upload response:', uploadData);
//         fileContent = uploadData.text || ''; 
//       }

//       const analyzeRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Authorization": "Bearer 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", // Thay thế bằng API key của bạn
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-prover-v2:free",
//           messages: [
//             {
//               role: "user",
//               content: fileContent || input.trim(),
//             },
//             {
//               role: "system",
//               content: "Bạn là chuyên gia tuyển dụng. Phân tích nội dung bên dưới: nêu rõ điểm mạnh, điểm yếu và gợi ý cải thiện."
//             }
//           ]
//         })
//       });

//       const analysis = await analyzeRes.json();
//       setMessages((prev) => [
//         ...prev,
//         { from: 'bot', text: analysis.choices[0]?.message?.content || 'Không thể phân tích.' },
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { from: 'bot', text: 'Đã có lỗi xảy ra khi xử lý.' },
//       ]);
//     }

//     setLoading(false);
//     setFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   return (
//     <>
//       <button
//         onClick={togglePopup}
//         className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
//       >
//         💬 Hỗ trợ
//       </button>

//       {isOpen && (
//         <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-300 animate-fade-in flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between bg-emerald-600 text-white px-4 py-2 rounded-t-lg">
//             <span className="font-semibold">AI Tư Vấn</span>
//             <button onClick={closePopup} className="text-xl leading-none">×</button>
//           </div>

//           {/* Body */}
//           <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-2 text-sm">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`px-3 py-2 rounded-lg w-fit max-w-[90%] ${
//                   msg.from === 'bot'
//                     ? 'bg-gray-100 text-gray-800'
//                     : 'bg-emerald-100 text-emerald-900 self-end ml-auto'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && <div className="text-xs text-gray-500 italic">Đang xử lý...</div>}
//           </div>

//           {/* Footer */}
//           <div className="p-2 border-t border-gray-200 flex flex-col gap-2">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={handleFileChange}
//               className="text-sm"
//             />
//             <div className="flex">
//               <input
//                 type="text"
//                 placeholder="Nhập tin nhắn..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="flex-grow border border-gray-300 px-3 py-2 rounded-l-md text-sm focus:outline-none"
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-emerald-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-emerald-700"
//               >
//                 Gửi
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


'use client';
import { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Chào bạn 👋 Mình có thể giúp gì hôm nay?' },
  ]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => setIsOpen(!isOpen);
  const closePopup = () => setIsOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSend = async () => {
    if (!input.trim() && !file) return;

    // Hiển thị message người dùng
    setMessages((prev) => [
      ...prev,
      ...(input ? [{ from: 'user', text: input }] : []),
      ...(file ? [{ from: 'user', text: `📎 Đã gửi file: ${file.name}` }] : []),
    ]);
    setInput('');
    setLoading(true);

    // try {
    //   let fileContent = '';

    //   // Upload file nếu có
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     // Gửi tệp tới API để phân tích
    //     const uploadRes = await fetch('http://localhost:3001/api/resume/pdf', {
    //       method: 'POST',
    //       body: formData,
    //     });

    //     const uploadData = await uploadRes.json();
    //     fileContent = uploadData.text || '';
    //   }

    //   const analyzeRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": "Bearer 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", // Thay thế bằng API key của bạn
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       model: "deepseek/deepseek-prover-v2:free",
    //       messages: [
    //         {
    //           role: "system",
    //           content: "Bạn là chuyên gia tuyển dụng. Phân tích nội dung bên dưới: nêu rõ điểm mạnh, điểm yếu và gợi ý cải thiện."
    //         },
    //         {
    //           role: "user",
    //           content: fileContent || input.trim(),
    //         }
    //       ]
    //     })
    //   });

    //   const analysis = await analyzeRes.json();
    //   setMessages((prev) => [
    //     ...prev,
    //     { from: 'bot', text: analysis.choices[0]?.message?.content || 'Không thể phân tích.' },
    //   ]);
    // } catch {
    //   setMessages((prev) => [
    //     ...prev,
    //     { from: 'bot', text: 'Đã có lỗi xảy ra khi xử lý.' },
    //   ]);
    // }

    try {
  let fileContent = '';

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    const uploadRes = await fetch('http://localhost:3001/api/resume/pdf', {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadRes.json();
    fileContent = uploadData.text || '';
  }

  const analyzeRes = await fetch("https://openrouter.ai/api/v1/chat/completions ", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-prover-v2:free",
      messages: [
        {
          role: "system",
          content: "Bạn là chuyên gia tuyển dụng. Phân tích nội dung bên dưới: nêu rõ điểm mạnh, điểm yếu và gợi ý cải thiện."
        },
        {
          role: "user",
          content: fileContent || input.trim(),
        }
      ]
    })
  });

  if (!analyzeRes.ok) {
    throw new Error('Phân tích thất bại');
  }

  const analysis = await analyzeRes.json();

  const botReply = analysis?.choices?.[0]?.message?.content 
    || 'Không thể phân tích phản hồi từ máy chủ.';

  setMessages((prev) => [
    ...prev,
    { from: 'bot', text: botReply },
  ]);

} catch (error) {
  console.error(error);
  setMessages((prev) => [
    ...prev,
    { from: 'bot', text: 'Đã có lỗi xảy ra khi xử lý.' },
  ]);
}

    setLoading(false);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
      >
        💬 Hỗ trợ
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-300 animate-fade-in flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-emerald-600 text-white px-4 py-2 rounded-t-lg">
            <span className="font-semibold">AI Tư Vấn</span>
            <button onClick={closePopup} className="text-xl leading-none">×</button>
          </div>

          {/* Body */}
          <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg w-fit max-w-[90%] ${
                  msg.from === 'bot'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-emerald-100 text-emerald-900 self-end ml-auto'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500 italic">Đang xử lý...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-200 flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="text-sm"
            />
            <div className="flex">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow border border-gray-300 px-3 py-2 rounded-l-md text-sm focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-emerald-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-emerald-700"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
