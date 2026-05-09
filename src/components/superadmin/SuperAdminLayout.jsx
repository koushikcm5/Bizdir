// src/components/superadmin/SuperAdminLayout.jsx
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import SuperAdminSidebar from './SuperAdminSidebar';

const SuperAdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      <div className="hidden lg:flex shrink-0">
        <SuperAdminSidebar />
      </div>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <SuperAdminSidebar onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-surface-100 px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-surface-100 text-surface-600" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>
          <h1 className="font-display font-bold text-xl text-surface-900">{title}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
