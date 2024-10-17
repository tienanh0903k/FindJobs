// app/layout.tsx
import React from 'react';
import { ReactNode } from 'react';
import '@/app/globals.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col max-h-screen">
            <main className="flex-1 p-2">
                {children}
            </main>
        </div>
    );
};

export default Layout;
