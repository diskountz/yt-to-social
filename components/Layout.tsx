import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">YouTube Video Processor</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-200 border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          &copy; 2024 YouTube Video Processor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;