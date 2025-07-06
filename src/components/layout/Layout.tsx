import React from 'react';
import { Header } from './Header';
import { ToastContainer } from '../common/ToastContainer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};