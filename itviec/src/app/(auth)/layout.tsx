export default function LoginLayout({ children }: { children: React.ReactNode }) {
	return (
	  <div
		style={{
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center',
		  height: '100vh',
		  width: '100vw',
		  background: 'linear-gradient(to bottom right, #c31432, #240b36)',
		  padding: 0,
		  margin: 0
		}}
	  >
		{children}
	  </div>
	);
  }