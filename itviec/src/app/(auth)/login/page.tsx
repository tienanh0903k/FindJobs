'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchLogin } from '@/redux/reducers/auth-slice';
import { useAppDispatch } from '@/hook/useDispatch';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { LoginFormValues } from '@/app/types/interface';

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		setIsLoading(true);
		try {
			const resultAction = await dispatch(fetchLogin(data));
			const isSuccess = unwrapResult(resultAction);
			if (isSuccess) {
				enqueueSnackbar('Đăng nhập thành công', {
					autoHideDuration: 1000,
					variant: 'success',
					anchorOrigin: { vertical: 'top', horizontal: 'right' },
				});
				router.push('/');
			}
			console.log('Kết quả trả về ->', isSuccess);
		} catch (error) {
			console.error('Login error:', error);
			enqueueSnackbar('Đăng nhập thất bại', {
				autoHideDuration: 3000,
				variant: 'error',
				anchorOrigin: { vertical: 'top', horizontal: 'right' },
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}
		>
			<Typography variant="h4" component="h1" gutterBottom>
				Đăng nhập
			</Typography>

			<TextField
				label="Email"
				variant="outlined"
				fullWidth
				margin="normal"
				{...register('username')}
				error={!!errors.username}
			/>

			<TextField
				label="Mật khẩu"
				variant="outlined"
				type="password"
				fullWidth
				margin="normal"
				{...register('password', {
					required: 'Mật khẩu là bắt buộc',
					minLength: {
						value: 6,
						message: 'Mật khẩu phải có ít nhất 6 ký tự',
					},
				})}
				error={!!errors.password}
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
				sx={{ mt: 2 }}
				disabled={isLoading}
				startIcon={isLoading && <CircularProgress size={20} />}
			>
				{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
			</Button>

			<div className="flex items-center my-4">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="flex-shrink mx-4 text-gray-500 text-sm uppercase">OR</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>

			<Typography variant="body2" color="text.secondary" gutterBottom>
                Bạn chưa có tài khoản?{' '}
                <a href="#" className="text-it-blue">
                    Đăng ký ngay
                </a>
            </Typography>
		</Box>
	);
};

export default LoginForm;
