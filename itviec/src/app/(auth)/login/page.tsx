'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchLogin } from '@/redux/reducers/auth-slice';
import { useAppDispatch } from '@/hook/useDispatch';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack'


interface LoginFormValues {
	username: string;
	password: string;
}

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		try {
			const response = await dispatch(fetchLogin(data));
			const isSuccess = unwrapResult(response);
			if (isSuccess) {
				enqueueSnackbar('Đăng nhập thành công', {
					autoHideDuration: 1000,
					variant: 'success',
					anchorOrigin: { vertical: 'top', horizontal: 'right' }
				  })
				router.push('/');
			}
			console.log("Ket qua tra ve ->",response);
		} catch (error) {
			console.error('Login error:', error);
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

			<Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
				Đăng nhập
			</Button>
		</Box>
	);
};

export default LoginForm;
