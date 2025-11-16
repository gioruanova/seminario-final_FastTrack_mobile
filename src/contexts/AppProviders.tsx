import React from 'react';
import { CompanyProvider } from './CompanyContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <CompanyProvider>
      {children}
    </CompanyProvider>
  );
}

