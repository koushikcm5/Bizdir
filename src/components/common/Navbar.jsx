// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, Search, Heart, User, LogOut, Menu, X,
  LayoutDashboard, Shield, ChevronDown
} from 'lucide-react';
import { logoutUser } from '../../services/authService';
import useStore from '../../store/useStore';
import Button from './Button';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, userData, shortlisted } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logoutUser();
    toast.success('Logged out');
    navigate('/');
    setDropOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-surface-900">
              Biz<span className="text-primary-500">Dir</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/search"
              className={`flex items-center gap-1.5 text-sm font-body font-medium transition-colors ${isActive('/search') ? 'text-primary-600' : 'text-surface-600 hover:text-surface-900'}`}
            >
              <Search size={14} />
              Explore
            </Link>

            {user && (
              <Link
                to="/favorites"
                className={`flex items-center gap-1.5 text-sm font-body font-medium transition-colors relative ${isActive('/favorites') ? 'text-primary-600' : 'text-surface-600 hover:text-surface-900'}`}
              >
                <Heart size={14} />
                Saved
                {shortlisted.length > 0 && (
                  <span className="absolute -top-2 -right-3 w-4 h-4 bg-primary-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {shortlisted.length}
                  </span>
                )}
              </Link>
            )}

            {userData?.role === 'admin' && (
              <Link to="/admin" className="flex items-center gap-1.5 text-sm font-body font-medium text-surface-600 hover:text-surface-900 transition-colors">
                <LayoutDashboard size={14} />
                Admin
              </Link>
            )}

            {userData?.role === 'super_admin' && (
              <Link to="/superadmin" className="flex items-center gap-1.5 text-sm font-body font-medium text-purple-600 hover:text-purple-800 transition-colors">
                <Shield size={14} />
                Super Admin
              </Link>
            )}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-50 transition-colors"
                >
                  <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold font-display">
                    {(userData?.name || user.email)?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-body font-medium text-surface-700 max-w-[120px] truncate">
                    {userData?.name || 'User'}
                  </span>
                  <ChevronDown size={14} className={`text-surface-400 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-modal border border-surface-100 py-1 animate-fade-in">
                    <Link to="/dashboard" onClick={() => setDropOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-surface-700 hover:bg-surface-50">
                      <User size={14} /> Dashboard
                    </Link>
                    <hr className="my-1 border-surface-100" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-body text-red-600 hover:bg-red-50">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-600"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-surface-100 bg-white px-4 py-3 space-y-1 animate-fade-in">
          <MobileLink to="/search" icon={Search} label="Explore" onClick={() => setMenuOpen(false)} />
          {user && <MobileLink to="/favorites" icon={Heart} label={`Saved (${shortlisted.length})`} onClick={() => setMenuOpen(false)} />}
          {user && <MobileLink to="/dashboard" icon={User} label="Dashboard" onClick={() => setMenuOpen(false)} />}
          {userData?.role === 'admin' && <MobileLink to="/admin" icon={LayoutDashboard} label="Admin" onClick={() => setMenuOpen(false)} />}
          {userData?.role === 'super_admin' && <MobileLink to="/superadmin" icon={Shield} label="Super Admin" onClick={() => setMenuOpen(false)} />}
          <div className="pt-3 border-t border-surface-100 flex gap-2">
            {user ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex-1 text-sm text-red-600 font-body font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <Button size="sm" className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const MobileLink = ({ to, icon: Icon, label, onClick }) => (
  <Link to={to} onClick={onClick} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-50 text-sm font-body font-medium text-surface-700">
    <Icon size={16} className="text-surface-400" />
    {label}
  </Link>
);

export default Navbar;
