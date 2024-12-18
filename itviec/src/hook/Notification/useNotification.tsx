// import { notifyApi } from '@/api/notifyApi';
// import React, { useEffect, useRef, useState } from 'react';
// import { socket } from '@/socket/socketClient';



// interface INotification {
//   id: number;
//   message: string;
//   isRead: boolean;
// }

// interface UseNotificationsReturn {
//   notifications: INotification[];
//   unreadCount: number;
//   showNotifications: boolean;
//   toggleNotifications: () => void;
//   isSeen: (id: any) => void
// }

// export const useNotifyCustom = (userId: string): UseNotificationsReturn => {
//   const [notifications, setNotifications] = useState<INotification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const isEventRegistered = useRef(false);

//   // Lấy thông báo từ API khi khởi tạo
//   useEffect(() => {
//     const loadNotifications = async () => {
//       try {
//         const data = await notifyApi.getByIdUser(userId);
//         if (Array.isArray(data)) {
//           setNotifications(data);
//           const unread = data.filter((notify) => !notify.isRead).length;
//           setUnreadCount(unread);
//         }
//       } catch (error) {
//         console.error('Failed to fetch notifications:', error);
//       }
//     };

//     loadNotifications();
//   }, [userId]);

//   // Lắng nghe socket cho thông báo mới
//   useEffect(() => {
//     socket.off('statusChanged'); 

//     socket.on('statusChanged', (data: any) => {
//       console.log('Nhận thông báo từ socket:', data);
//       //i receive double data from socket

//       setNotifications((prevNotifications) => [
//         ...prevNotifications,
//         {
//           id: data.applicationId,
//           message: data.message,
//           isRead: false,
//         },
//       ]);

//       setUnreadCount((prevCount) => prevCount + 1);
//     });

//     return () => {
//       socket.off('statusChanged');
//     };
//   }, []);

//   const toggleNotifications = () => {
//     setShowNotifications((prev) => !prev);
//   };

//   const isSeen = (id: any) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notify) =>
//         notify.id === id ? { ...notify, isRead: true } : notify
//       )
//     );

//     setUnreadCount((prevCount) => prevCount - 1);
//   };

//   return {
//     notifications,
//     unreadCount,
//     showNotifications,
//     toggleNotifications,
//     isSeen,
//   };
// };

// 'use client';
// import { useEffect, useMemo, useState } from 'react';
// import { connectSocket } from '@/socket/socketClient';
// import { notifyApi } from '@/api/notifyApi';

// interface INotification {
//   id: number;
//   message: string;
//   isRead: boolean;
// }

// interface UseNotificationsReturn {
//   notifications: INotification[];
//   unreadCount: number;
//   showNotifications: boolean;
//   toggleNotifications: () => void;
//   isSeen: (id: any) => void;
// }

// export const useNotifyCustom = (userId: string): UseNotificationsReturn => {
//   const [notifications, setNotifications] = useState<INotification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // const socket = useMemo(() => {
//   //   const socket = connectSocket();
//   //   return socket.connect();
//   // }, []);

//   const socket = useMemo(() => connectSocket(), []);


//   useEffect(() => {
//     const loadNotifications = async () => {
//       try {
//         const data = await notifyApi.getByIdUser(userId);
//         if (Array.isArray(data)) {
//           setNotifications(data);
//           const unread = data.filter((notify) => !notify.isRead).length;
//           setUnreadCount(unread);
//         }
//       } catch (error) {
//         console.error('Failed to fetch notifications:', error);
//       }
//     };

//     loadNotifications();
//   }, [userId]);

//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//     }

//     // Register event listener
//     socket.on('statusChanged', (data: any) => {
//       console.log('Received notification from socket:', data);

//       setNotifications((prevNotifications) => [
//         ...prevNotifications,
//         {
//           id: data.applicationId,
//           message: data.message,
//           isRead: false,
//         },
//       ]);

//       setUnreadCount((prevCount) => prevCount + 1);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('statusChanged');
//       socket.disconnect(); // Optional: disconnect socket if not reused
//     };
//   }, [socket]);

//   const toggleNotifications = () => {
//     setShowNotifications((prev) => !prev);
//   };

//   const isSeen = (id: any) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notify) =>
//         notify.id === id ? { ...notify, isRead: true } : notify
//       )
//     );

//     setUnreadCount((prevCount) => prevCount - 1);
//   };

//   return {
//     notifications,
//     unreadCount,
//     showNotifications,
//     toggleNotifications,
//     isSeen,
//   };
// };









'use client';

import { useEffect, useMemo, useState } from 'react';
import SocketClient from '@/socket/socketClient';
import { notifyApi } from '@/api/notifyApi';

interface INotification {
  id: string; 
  notify: string;
  isRead: boolean;
}

interface UseNotificationsReturn {
  notifications: INotification[];
  unreadCount: number;
  showNotifications: boolean;
  toggleNotifications: () => void;
  isSeen: (id: string) => void;
}

export const useNotifyCustom = (userId: string): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Khởi tạo singleton socket
  const socket = useMemo(() => SocketClient.getInstance(), []);

  // Tải thông báo từ API khi khởi tạo
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notifyApi.getByIdUser(userId);
        if (Array.isArray(data)) {
          setNotifications(data);
          const unread = data.filter((notify) => !notify.isRead).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    loadNotifications();
  }, [userId]);

  // Lắng nghe sự kiện socket
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const listener = (data: any) => {
      console.log('Received notification from socket:', data);

      // Kiểm tra và chỉ thêm nếu không trùng lặp
      setNotifications((prev) => {
        const isDuplicate = prev.some((n) => n.notify === data.notify);        
        if (isDuplicate) {
          console.warn('Duplicate notification ignored:', data);
          return prev;
        }

        return [
          ...prev,
          {
            id: data.applicationId,
            notify: data.notify,
            isRead: false,
          },
        ];
      });

      // Chỉ tăng số lượng chưa đọc nếu không trùng
      setUnreadCount((prevCount) => prevCount + 0.5);
    };

    // Xóa tất cả listener cũ trước khi đăng ký mới
    console.log('Cleaning up existing listeners...');
    socket.off('statusChanged', listener);

    // Đăng ký sự kiện mới
    socket.on('statusChanged', listener);

    console.log('Current listeners:', socket.listeners('statusChanged').length);

    // Cleanup khi component unmount
    return () => {
      console.log('Cleaning up on unmount...');
      socket.off('statusChanged', listener); // Xóa listener cụ thể
    };
  }, [socket]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const isSeen = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notify) =>
        notify.id === id ? { ...notify, isRead: true } : notify
      )
    );

    setUnreadCount((prevCount) => prevCount - 1);
  };

  return {
    notifications,
    unreadCount,
    showNotifications,
    toggleNotifications,
    isSeen,
  };
};
