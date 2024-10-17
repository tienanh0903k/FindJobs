import { GrGooglePay } from "react-icons/gr";
function LoginButton() {
	const BACKEND_URL = 'http://localhost:3001';
	const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		window.location.href = `${BACKEND_URL}/api/auth/google/login`;
	};


	return (
		<button
			onClick={handleLogin}
			style={{
				padding: '10px',
				backgroundColor: '#CC0000',
				margin: '10px',
				color: '#fff',
				border: 'none',
				borderRadius: '50%',
				cursor: 'pointer',
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.76 10.77l-.09-.35h-7.44v3.16h4.45a4.45 4.45 0 0 1-4.36 3.34a5.2 5.2 0 0 1-3.5-1.39A5 5 0 0 1 7.33 12a5.14 5.14 0 0 1 1.46-3.53a5 5 0 0 1 3.48-1.37a4.55 4.55 0 0 1 3 1.16L17.47 6a7.88 7.88 0 0 0-5.27-2a8.14 8.14 0 0 0-5.77 2.35a8.15 8.15 0 0 0-.09 11.21a8.37 8.37 0 0 0 6 2.44a7.45 7.45 0 0 0 5.41-2.27a8 8 0 0 0 2.08-5.54a10 10 0 0 0-.07-1.42"></path></svg>
		</button>
	);
}

export default LoginButton;
