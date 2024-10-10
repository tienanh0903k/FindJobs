import React, { useEffect, useState } from 'react';
interface INotification {
  id: number;
  message: string;
  isRead: boolean;
}

// Định nghĩa kiểu trả về cho custom hook
interface UseNotificationsReturn {
  notifications: INotification[];
  unreadCount: number;
  showNotifications: boolean;
  toggleNotifications: () => void;
}

export const useNotifyCustom = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<INotification[]>([]); 
  const [unreadCount, setUnreadCount] = useState(0); 
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const mockNotifications: INotification[] = [
      { id: 1, message: 'Thông báo 1', isRead: false },
      { id: 2, message: 'Thông báo 2', isRead: false },
      { id: 3, message: 'Thông báo 3', isRead: true },
    ];

    setNotifications(mockNotifications);

    const unread = mockNotifications.filter((notify) => !notify.isRead).length;
    setUnreadCount(unread);
  }, []);

  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return {
    notifications, 
    unreadCount,   
    showNotifications, 
    toggleNotifications 
  };
};
