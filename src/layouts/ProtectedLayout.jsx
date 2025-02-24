import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components';

const ProtectedLayout = () => {
  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedLayout;