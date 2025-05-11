import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/reducers/auth-slice';
import { FaGoogle } from "react-icons/fa"; 

function LoginButton() {
  const BACKEND_URL = 'http://localhost:3001';
  const dispatch = useDispatch();

  const handleLogin = () => {
    const popup = window.open(
      `${BACKEND_URL}/api/auth/google/login`,
      'googleLogin',
      'width=500,height=600'
    );

    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== BACKEND_URL) return;

      const { access_token, user } = event.data;

      if (access_token && user) {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(loginSuccess({ access_token, user }));
        window.location.href = '/';
      }
    };

    window.addEventListener('message', messageHandler);

    
    const interval = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(interval);
        window.removeEventListener('message', messageHandler);
      }
    }, 500);
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: '10px',
        backgroundColor: 'red',
        margin: '10px',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
    >
      <FaGoogle size={24} />
    </button>
  );
}

export default LoginButton;
