// src/components/superadmin/SuperAdminSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Building2, LayoutDashboard, Users, MapPin, Store,
  LogOut, X, ChevronRight, Shield
} from 'lucide-react';
import { logoutUser } from '../../services/authService';
import useStore from '../../store/useStore';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const links = [
  { to: '/superadmin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/superadmin/users', label: 'Users & Admins', icon: Users },
  { to: '/superadmin/businesses', label: 'All Businesses', icon: Store },
  { to: '/superadmin/locations', label: 'Locations', icon: MapPin },
];

const SuperAdminSidebar = ({ onClose }) => {
  const { userData } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-900 to-purple-950 text-white w-64">
      <div className="flex items-center justify-between px-5 py-4 border-b border-purple-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center">
            <Shield size={14} />
          </div>
          <span className="font-display font-bold text-base">Super Admin</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-purple-800"><X size={16} /></button>
        )}
      </div>

      <div className="px-5 py-4 border-b border-purple-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold font-display">
            {userData?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-body font-medium">{userData?.name}</p>
            <p className="text-xs font-body text-purple-300">Super Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) => clsx(
              'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors group',
              isActive ? 'bg-purple-500 text-white' : 'text-purple-200 hover:bg-purple-800 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <Icon size={15} />
              {label}
            </div>
            <ChevronRight size={12} className="text-purple-500 group-hover:text-purple-400" />
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-purple-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-purple-300 hover:bg-purple-800 hover:text-white transition-colors"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
