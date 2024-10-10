import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/redux/provider/ReduxProvider';
import { SnackbarProvider } from 'notistack';
import SnackBarProvider from '@/redux/provider/Snackbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
	title: {
		template: '%s | ',
		default: 'NTA',
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	//get locale
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<NextIntlClientProvider messages={messages}>
				<body>
					<AntdRegistry>
						{/* //tao 1 ReduxProvider de truyen vao layout root de tranh viet client vao server compoent */}
						<SnackBarProvider>
							<ReduxProvider>{children}</ReduxProvider>
						</SnackBarProvider>
					</AntdRegistry>
				</body>
			</NextIntlClientProvider>
		</html>
	);
}
