'use client';

import { ReactNode, useEffect } from 'react';

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('TokenExpiresAt');
      const now = new Date().getTime();

      if (expirationTime && now > parseInt(expirationTime, 10)) {
        localStorage.removeItem('TokenExpiresAt');
        localStorage.removeItem('user');
        console.log('Token đã hết hạn và đã bị xóa.');
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 900000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
};
