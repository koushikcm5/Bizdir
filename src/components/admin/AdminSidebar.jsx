// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Building2, LayoutDashboard, Store, Tag, CheckSquare,
  LogOut, X, ChevronRight
} from 'lucide-react';
import { logoutUser } from '../../services/authService';
import useStore from '../../store/useStore';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/businesses', label: 'Businesses', icon: Store },
  { to: '/admin/categories', label: 'Categories', icon: Tag },
  { to: '/admin/pending', label: 'Pending Review', icon: CheckSquare },
];

const AdminSidebar = ({ onClose }) => {
  const { userData, sidebarOpen } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className={clsx('flex flex-col h-full bg-surface-900 text-white w-64')}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-surface-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
            <Building2 size={14} />
          </div>
          <span className="font-display font-bold text-base">BizDir Admin</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-surface-800">
            <X size={16} />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-surface-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold font-display">
            {userData?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-body font-medium">{userData?.name}</p>
            <p className="text-xs font-body text-surface-400 capitalize">{userData?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) => clsx(
              'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors group',
              isActive
                ? 'bg-primary-500 text-white'
                : 'text-surface-300 hover:bg-surface-800 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <Icon size={15} />
              {label}
            </div>
            <ChevronRight size={12} className="text-surface-500 group-hover:text-surface-400" />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-surface-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-surface-400 hover:bg-surface-800 hover:text-white transition-colors"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
