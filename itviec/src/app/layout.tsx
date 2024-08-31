import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/redux/provider/ReduxProvider';

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
                {/* //tao 1 ReduxProvider de truyen vao layout root de tranh viet client vao server compoent */}
				{/* <Provider store={store}>{children}</Provider> */}
                <ReduxProvider>
                    {children}
                </ReduxProvider>
			</body>
		</html>
	);
}
