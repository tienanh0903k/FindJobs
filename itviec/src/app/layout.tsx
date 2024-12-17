import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/redux/provider/ReduxProvider';
import SnackBarProvider from '@/redux/provider/Snackbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { TokenProvider } from '@/context/ExpireProvider';
import { TanStackProviders } from '@/context/TanstackProvider';

export const metadata: Metadata = {
	title: {
		template: '%s | ',
		default: 'Tim viec Online',
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	//get locale
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<NextIntlClientProvider messages={messages}>
				<body suppressHydrationWarning={true}>
					<AntdRegistry> 
						{/* //tao 1 ReduxProvider de truyen vao layout root de tranh viet client vao server compoent */}
						<SnackBarProvider>
							<ReduxProvider>
								<TanStackProviders>
								<TokenProvider>
									{children} 
								</TokenProvider>
								</TanStackProviders>
							</ReduxProvider>
						</SnackBarProvider>
					</AntdRegistry>
				</body>
			</NextIntlClientProvider>
		</html>
	);
}
