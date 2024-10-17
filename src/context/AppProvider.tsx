'use client';
import { createContext, useContext, useState } from 'react';

interface IAppContextValue {
  sessionToken: string;
  setSessionToken: (token: string) => void;
}

const AppContext = createContext<IAppContextValue>({
	sessionToken: '',
	setSessionToken: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children, initialToken = '' }: { children: React.ReactNode,  initialToken?: string;}) => {
	const [sessionToken, setSessionToken] = useState(initialToken);

	return (
		<AppContext.Provider value={{ sessionToken, setSessionToken }}>
			{children}
		</AppContext.Provider>
	);
};