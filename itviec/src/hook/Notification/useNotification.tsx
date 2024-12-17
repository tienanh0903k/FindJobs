import { notifyApi } from '@/api/notifyApi';
import React, { useEffect, useState } from 'react';
import { socket } from '@/socket/socketClient';


interface INotification {
  id: number;
  message: string;
  isRead: boolean;
}

interface UseNotificationsReturn {
  notifications: INotification[];
  unreadCount: number;
  showNotifications: boolean;
  toggleNotifications: () => void;
  isSeen: (id: any) => void
}

export const useNotifyCustom = (userId: string): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Lấy thông báo từ API khi khởi tạo
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

  // Lắng nghe socket cho thông báo mới
  useEffect(() => {
    socket.on('statusChanged', (data: any) => {
      console.log('Nhận thông báo từ socket:', data);

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          id: data.applicationId,
          message: data.message,
          isRead: false,
        },
      ]);

      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.off('statusChanged');
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const isSeen = (id: any) => {
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
