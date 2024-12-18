/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
};

export default withNextIntl(nextConfig);
//export default nextConfig;

// import createNextIntlPlugin from 'next-intl/plugin';
 
// const withNextIntl = createNextIntlPlugin();
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {};
 
// export default withNextIntl(nextConfig);
