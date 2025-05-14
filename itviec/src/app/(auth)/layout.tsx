// export default function LoginLayout({ children }: { children: React.ReactNode }) {
// 	return (
// 	  <div
// 		style={{
// 		  display: 'flex',
// 		  justifyContent: 'center',
// 		  alignItems: 'center',
// 		  height: '100vh',
// 		  width: '100vw',
// 		  background: 'linear-gradient(to bottom right, #c31432, #240b36)',
// 		  padding: 0,
// 		  margin: 0
// 		}}
// 	  >
// 		{children}
// 	  </div>
// 	);
//   }

// LoginLayout.tsx
import { twMerge } from 'tailwind-merge';

export default function LoginLayout({
  children,
  className = '', 
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        'flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-[#c31432] to-[#240b36] p-0 m-0',
        className
      )}
    >
      {children}
    </div>
  );
}
