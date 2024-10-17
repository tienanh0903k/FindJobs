import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const localeCookie = cookies().get('language')?.value || 'en'; 

  return {
    locale: localeCookie,
    messages: (await import(`../messages/${localeCookie}.json`)).default,
  };
});
