'use client';

import { SnackbarProvider } from 'notistack';

const SnackBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      {children}
    </SnackbarProvider>
  );
};

export default SnackBarProvider;
