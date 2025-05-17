import '@/app/globals.css';
import { Inter } from 'next/font/google';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
	return (
	  <div
		style={{
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center',
		  width: '100vw',
		  background: 'linear-gradient(to bottom right, #c31432, #240b36)',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
		}}
	  >
		{children}
	  </div>
	);
  }

// LoginLayout.tsx
// // import { twMerge } from 'tailwind-merge';
// import { ReactNode } from 'react';
// import { AuthContent } from './auth-content';
// import { twMerge } from 'tailwind-merge';
// import { ReactNode } from 'react';

// interface AuthContentProps {
//   children: ReactNode;
//   className?: string;
// }

// export function AuthContent({ children, className = '' }: AuthContentProps) {
//   return (
//     <div
//       className={twMerge(
//         'flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-[#c31432] to-[#240b36] p-0 m-0',
//         className
//       )}
//     >
//       {children}
//     </div>
//   );

// interface AuthContentProps {
//   children: ReactNode;
//   className?: string;
// }

// export function AuthContent({ children, className = '' }: AuthContentProps) {
//   return (
//     <div
//       className={twMerge(
//         'flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-[#c31432] to-[#240b36] p-0 m-0',
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// export default function LoginLayout({ children }: { children: ReactNode }) {
// 	return <AuthContent>{children}</AuthContent>;
// }
