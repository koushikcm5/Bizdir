// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusinessCard from '../components/business/BusinessCard';
import Spinner from '../components/common/Spinner';
import { getFavoriteBusinesses } from '../services/businessService';
import useStore from '../store/useStore';

const FavoritesPage = () => {
  const { shortlisted } = useStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavoriteBusinesses(shortlisted)
      .then(setFavorites)
      .finally(() => setLoading(false));
  }, [shortlisted.length]);

  return (
    <>
      <Helmet><title>Saved Businesses – BizDir</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-surface-900 flex items-center gap-2">
            <Heart size={22} className="text-red-500 fill-red-500" /> Saved Businesses
          </h1>
          <p className="text-sm font-body text-surface-400 mt-1">{favorites.length} saved</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="xl" /></div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <HeartOff size={56} className="mx-auto mb-4 text-surface-300" />
            <h3 className="font-display font-semibold text-lg text-surface-700 mb-2">Nothing saved yet</h3>
            <p className="text-sm font-body text-surface-400 mb-6">Browse businesses and tap the heart to save them here</p>
            <Link to="/search" className="inline-flex items-center gap-2 bg-primary-500 text-white font-body font-medium px-6 py-2.5 rounded-xl hover:bg-primary-600 transition-colors">
              Explore Businesses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites.map(b => <BusinessCard key={b.id} business={b} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
