// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, MapPin, Shield, Star, Building2, Map, Users, LayoutGrid } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SearchBar from '../components/search/SearchBar';
import BusinessCard from '../components/business/BusinessCard';
import Spinner from '../components/common/Spinner';
import { getFeaturedBusinesses } from '../services/businessService';
import useStore from '../store/useStore';
import { MOCK_CATEGORIES } from '../utils/helpers';

const STATS = [
  { label: 'Businesses Listed', value: '50,000+', Icon: Building2 },
  { label: 'Cities Covered', value: '200+', Icon: Map },
  { label: 'Happy Users', value: '1M+', Icon: Users },
  { label: 'Categories', value: '100+', Icon: LayoutGrid },
];

const HomePage = () => {
  const { categories } = useStore();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayCats = categories.length > 0 ? categories : MOCK_CATEGORIES;

  useEffect(() => {
    getFeaturedBusinesses(6)
      .then(data => setFeatured(data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>BizDir – Find Local Businesses Near You</title>
        <meta name="description" content="Discover trusted local businesses, from restaurants to hospitals. India's smartest business directory." />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        {/* Accent blobs */}
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-700/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-4 py-1.5 mb-6">
              <TrendingUp size={14} className="text-primary-400" />
              <span className="text-xs font-body font-medium text-primary-300">India's #1 Business Directory</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
              Find the <span className="text-primary-400">Right Business</span><br />
              Near You
            </h1>

            <p className="text-surface-300 font-body text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Discover trusted local businesses — restaurants, hospitals, salons, and more. Search by location and category.
            </p>

            <div className="relative">
              <SearchBar size="large" />
            </div>

            <p className="mt-4 text-xs font-body text-surface-500">
              Popular: <span className="text-surface-400">Restaurants · Hospitals · Schools · Salons</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center text-white">
                <div className="flex justify-center mb-1"><s.Icon size={24} /></div>
                <div className="font-display font-bold text-2xl">{s.value}</div>
                <div className="text-xs font-body text-primary-100">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-surface-900">Browse by Category</h2>
              <p className="text-sm font-body text-surface-400 mt-1">Find exactly what you're looking for</p>
            </div>
            <Link to="/search" className="flex items-center gap-1 text-sm font-body font-medium text-primary-600 hover:text-primary-700">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {displayCats.map(cat => {
              const CatIcon = cat.Icon || Building2;
              return (
                <Link
                  key={cat.id}
                  to={`/search?category=${cat.name}`}
                  className="bg-white rounded-xl p-4 text-center shadow-card hover:shadow-card-hover border border-surface-100 hover:border-primary-200 transition-all duration-200 group"
                >
                  <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <CatIcon size={28} className="text-primary-500" />
                  </div>
                  <p className="text-xs font-body font-medium text-surface-700 group-hover:text-primary-600 transition-colors leading-tight">{cat.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-surface-900">Featured Businesses</h2>
              <p className="text-sm font-body text-surface-400 mt-1">Top-rated and verified listings</p>
            </div>
            <Link to="/search" className="flex items-center gap-1 text-sm font-body font-medium text-primary-600 hover:text-primary-700">
              See all <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Spinner size="lg" /></div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map(b => <BusinessCard key={b.id} business={b} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-surface-400">
              <Building2 size={48} className="mx-auto mb-4 text-surface-300" />
              <p className="font-body">No featured listings yet. <Link to="/dashboard" className="text-primary-500 hover:underline">Add your business</Link></p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-surface-900 text-center mb-12">Why Choose BizDir?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: 'Location-Based Search', desc: 'Find businesses in your exact district and area with our smart location filtering system.' },
              { icon: Shield, title: 'Verified Listings', desc: 'Every business is reviewed and approved by our admin team before going live.' },
              { icon: Star, title: 'Ratings & Reviews', desc: 'Genuine reviews from real users help you make the right choice every time.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-card border border-surface-100 text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon size={22} className="text-primary-500" />
                </div>
                <h3 className="font-display font-semibold text-surface-900 mb-2">{f.title}</h3>
                <p className="text-sm font-body text-surface-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Own a Business?</h2>
          <p className="text-primary-100 font-body mb-8 max-w-xl mx-auto">List your business on BizDir and reach thousands of local customers. It's free to get started!</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-body font-semibold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
          >
            List Your Business <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
