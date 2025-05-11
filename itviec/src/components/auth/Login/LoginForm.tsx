'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchLogin } from '@/redux/reducers/auth-slice';
import { useAppDispatch } from '@/hook/useDispatch';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { LoginFormValues } from '@/app/types/interface';
import LoginButton from './Google';

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


  const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

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
    } catch (error) {
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
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 10,
        p: 4,
        borderRadius: 2,
        background: 'linear-gradient(to bottom right, #fff, #f0f0f0)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}
      >
        Đăng nhập
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username ? 'Email là bắt buộc' : ''}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />

      <TextField
        label="Mật khẩu"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        {...register('password', {
          required: 'Mật khẩu là bắt buộc',
          minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: '#1976d2',
          padding: '12px 0',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          '&:disabled': {
            backgroundColor: '#9e9e9e',
          },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Đăng nhập'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Hoặc đăng nhập bằng
        </Typography>
        <LoginButton /> 
      </Box>
    </Box>
  );
};

export default LoginForm;
