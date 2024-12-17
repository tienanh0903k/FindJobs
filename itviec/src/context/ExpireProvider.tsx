// 'use client';

// import { ReactNode, useEffect } from 'react';

// export const TokenProvider = ({ children }: { children: ReactNode }) => {
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const expirationTime = localStorage.getItem('TokenExpiresAt');
//       const now = new Date().getTime();

//       if (expirationTime && now > parseInt(expirationTime, 10)) {
//         localStorage.removeItem('TokenExpiresAt');
//         localStorage.removeItem('user');
//         console.log('Token đã hết hạn và đã bị xóa.');
//       }
//     };

//     const intervalId = setInterval(checkTokenExpiration, 900000);

//     // Xóa interval khi component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   return <>{children}</>;
// };



'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpirationTime = 3600 * 1000;
      const tokenTimestamp = localStorage.getItem('TokenExpiresAt');
      const now = new Date().getTime();

      if (tokenTimestamp && now > parseInt(tokenTimestamp, 10)) {
        localStorage.removeItem('TokenExpiresAt');
        localStorage.removeItem('user');
        router.push('/login');
        // console.log('Token đã hết hạn và đã bị xóa khỏi localStorage.');
      } else if (!tokenTimestamp) {
        localStorage.setItem('TokenExpiresAt', (now + tokenExpirationTime).toString());
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 36000000); 

    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
};
