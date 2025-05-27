import { useEffect, useState } from 'react';
import userApi from '@/api/userApi';

export function useBalance(userId?: string) {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;
    userApi.getBalance(userId).then(setBalance).catch(() => setBalance(0));
  }, [userId]);

  return balance;
}
