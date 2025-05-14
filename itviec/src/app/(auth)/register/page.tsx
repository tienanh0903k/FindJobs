// Register.tsx
import RegisterForm from '@/components/auth/Register/RegisterForm';
import React from 'react';
import LoginLayout from '../layout';

const Register = () => {
  return (
    <LoginLayout
      className="bg-white rounded-lg shadow-lg p-8" 
    >
      <RegisterForm />
    </LoginLayout>
  );
}

export default Register;
