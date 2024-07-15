import React from 'react';
import Header from '../organisms/header.organism';
import Sidebar from '../organisms/sidebar.organism';

type MainTemplateProps = {
	children: React.ReactNode;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-100 w-full">
    <Header />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  </div>
);

export default MainTemplate;
