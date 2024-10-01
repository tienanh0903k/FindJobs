'use server'
import { cookies } from 'next/headers';

import { Profile } from '@/components/client/Profiles';
import React from 'react';



async function getInfoMe() {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken')?.value || '';

  const res = await fetch('http://localhost:3001/api/user/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }
  // console.log("----info",res.json());
  return res.json();
}
 

const Page = async () => {
  const dataUser = await getInfoMe();
  console.log("----info", dataUser);

  return (
    <main className="min-h-screen mt-[72px] bg-slate-200">
      <Profile 
        data={dataUser}
      />
    </main>
  );
};

export default Page;
