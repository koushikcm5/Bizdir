// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../../store/useStore';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, userData, authLoading } = useStore();
  const location = useLocation();

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (roles.length && !roles.includes(userData?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
