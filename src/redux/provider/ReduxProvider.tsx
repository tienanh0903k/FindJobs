'use client';

import { Provider } from 'react-redux';
import store from '../store';
import GetLocalStorage from './GetLocalStorage';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<GetLocalStorage>
                {children}
            </GetLocalStorage>
		</Provider>
	);
};

export default ReduxProvider;
