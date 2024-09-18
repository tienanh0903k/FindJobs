import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/redux/provider/ReduxProvider';
import { SnackbarProvider } from 'notistack';
import SnackBarProvider from '@/redux/provider/Snackbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
export const metadata: Metadata = {
	title: {
		template: '%s | ',
		default: 'NTA',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
			<AntdRegistry>
				{/* //tao 1 ReduxProvider de truyen vao layout root de tranh viet client vao server compoent */}
				<SnackBarProvider>
					<ReduxProvider>{children}</ReduxProvider>
				</SnackBarProvider>
			</AntdRegistry>
			</body>
		</html>
	);
}
