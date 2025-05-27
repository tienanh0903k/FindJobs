'use client'
import { useBalance } from '@/hook/useBalance';
import { useAppSelector } from '@/hook/useSelector';
import React from 'react';

interface CheckBalanceProps {
  min: number; // Số dư tối thiểu để enable
  children: React.ReactElement;
  fallback?: React.ReactNode;
}

const CheckBalance: React.FC<CheckBalanceProps> = ({ min, children, fallback }) => {
  const infoUser = useAppSelector((state) => state.auth.currentUser?.user);

  const liveBalance = useBalance(infoUser?._id);
  console.log('liveBalance', liveBalance);

  if (liveBalance >= min) return children;


  return (
    fallback || (
      <div>
        {React.cloneElement(children, { disabled: true })}
        <div style={{ color: 'red', fontSize: 13, marginTop: 6 }}>
          Bạn cần ít nhất {min.toLocaleString()}đ để sử dụng chức năng này.
        </div>
      </div>
    )
  );
};

export default CheckBalance;
