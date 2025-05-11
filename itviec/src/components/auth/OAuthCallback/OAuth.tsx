'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import authApi from '@/api/authApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/reducers/auth-slice';

export default function OAuthCallbackPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchOAuthData = async () => {
      try {
        const res = await authApi.googleLoginCallback(); 
        const { data } = res;

        localStorage.setItem('user', JSON.stringify(data));
        dispatch(loginSuccess(data));

        // 👉 Nếu muốn chuyển trang sau khi xử lý xong (ví dụ về dashboard)
        // router.push('/dashboard');
      } catch (err) {
        console.error('OAuth callback failed', err);
      }
    };

    fetchOAuthData();
  }, []);

  return <p>Đang xử lý đăng nhập...</p>;
}
