// src/App.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Spinner from './components/common/Spinner';
import { getLocations, getCategories } from './services/locationService';
import useStore from './store/useStore';
import { MOCK_CATEGORIES, MOCK_LOCATIONS } from './utils/helpers';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BusinessDetailPage = lazy(() => import('./pages/BusinessDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminBusinessesPage = lazy(() => import('./pages/admin/AdminBusinessesPage'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage'));
const AdminPendingPage = lazy(() => import('./pages/admin/AdminPendingPage'));

// Super Admin pages
const SuperAdminDashboardPage = lazy(() => import('./pages/superadmin/SuperAdminDashboardPage'));
const SuperAdminUsersPage = lazy(() => import('./pages/superadmin/SuperAdminUsersPage'));
const SuperAdminBusinessesPage = lazy(() => import('./pages/superadmin/SuperAdminBusinessesPage'));
const SuperAdminLocationsPage = lazy(() => import('./pages/superadmin/SuperAdminLocationsPage'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <Spinner size="xl" />
  </div>
);

// Layout wrapper for public pages (with Navbar + Footer)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </>
);

// Fetches global data (locations, categories) once on app load
const DataLoader = () => {
  const { setLocations, setCategories } = useStore();

  useEffect(() => {
    getLocations()
      .then(data => setLocations(data.length ? data : MOCK_LOCATIONS))
      .catch(() => setLocations(MOCK_LOCATIONS));

    getCategories()
      .then(data => setCategories(data.length ? data : MOCK_CATEGORIES))
      .catch(() => setCategories(MOCK_CATEGORIES));
  }, []);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <DataLoader />
        <Router>
          <div className="flex flex-col min-h-screen bg-white">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />
                <Route path="/business/:id" element={<PublicLayout><BusinessDetailPage /></PublicLayout>} />
                <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
                <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />

                {/* Protected user routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <PublicLayout><UserDashboardPage /></PublicLayout>
                  </ProtectedRoute>
                } />
                <Route path="/favorites" element={
                  <ProtectedRoute>
                    <PublicLayout><FavoritesPage /></PublicLayout>
                  </ProtectedRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin" element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/businesses" element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminBusinessesPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/categories" element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminCategoriesPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/pending" element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminPendingPage />
                  </ProtectedRoute>
                } />

                {/* Super Admin routes */}
                <Route path="/superadmin" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <SuperAdminDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/superadmin/users" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <SuperAdminUsersPage />
                  </ProtectedRoute>
                } />
                <Route path="/superadmin/businesses" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <SuperAdminBusinessesPage />
                  </ProtectedRoute>
                } />
                <Route path="/superadmin/locations" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <SuperAdminLocationsPage />
                  </ProtectedRoute>
                } />

                {/* 404 */}
                <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
              </Routes>
            </Suspense>
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-body text-sm',
              style: { borderRadius: '10px', padding: '12px 16px' },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
