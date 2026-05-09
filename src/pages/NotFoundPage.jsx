// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Compass } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="text-center">
      <Compass size={80} className="mx-auto mb-6 text-surface-300" />
      <h1 className="font-display font-bold text-5xl text-surface-900 mb-2">404</h1>
      <p className="font-display font-semibold text-xl text-surface-600 mb-3">Page not found</p>
      <p className="text-sm font-body text-surface-400 mb-8 max-w-xs mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/" className="inline-flex items-center gap-2 bg-primary-500 text-white font-body font-medium px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors">
          <Home size={15} /> Go Home
        </Link>
        <Link to="/search" className="inline-flex items-center gap-2 border border-surface-200 text-surface-700 font-body font-medium px-5 py-2.5 rounded-xl hover:bg-surface-50 transition-colors">
          <Search size={15} /> Search
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
