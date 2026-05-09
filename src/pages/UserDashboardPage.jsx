// src/pages/UserDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Heart, Store, User, Building2, HeartOff, CalendarDays } from 'lucide-react';
import { getAllBusinesses } from '../services/businessService';
import { getFavoriteBusinesses } from '../services/businessService';
import BusinessCard from '../components/business/BusinessCard';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import BusinessForm from '../components/business/BusinessForm';
import Spinner from '../components/common/Spinner';
import Badge from '../components/common/Badge';
import useStore from '../store/useStore';
import { formatDate, statusColor } from '../utils/helpers';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'favorites', label: 'Saved', icon: Heart },
  { id: 'listings', label: 'My Listings', icon: Store },
  { id: 'profile', label: 'Profile', icon: User },
];

const UserDashboardPage = () => {
  const { user, userData, shortlisted } = useStore();
  const [tab, setTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    if (tab === 'favorites') {
      setLoading(true);
      getFavoriteBusinesses(shortlisted).then(setFavorites).finally(() => setLoading(false));
    }
    if (tab === 'listings') {
      setLoading(true);
      getAllBusinesses().then(data => {
        setMyListings(data.filter(b => b.createdBy === user.uid));
      }).finally(() => setLoading(false));
    }
  }, [tab, shortlisted]);

  return (
    <>
      <Helmet><title>Dashboard – BizDir</title></Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl text-surface-900">My Dashboard</h1>
            <p className="text-sm font-body text-surface-400 mt-0.5">Welcome, {userData?.name}!</p>
          </div>
          <Button icon={Plus} onClick={() => setAddModal(true)}>List a Business</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Saved Businesses', value: shortlisted.length, Icon: Heart },
            { label: 'My Listings', value: myListings.length, Icon: Building2 },
            { label: 'Member Since', value: formatDate(userData?.createdAt) || 'Today', Icon: CalendarDays },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-card border border-surface-100 text-center">
              <div className="flex justify-center mb-1"><s.Icon size={22} className="text-primary-500" /></div>
              <div className="font-display font-bold text-xl text-surface-900">{s.value}</div>
              <div className="text-xs font-body text-surface-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-100 rounded-xl p-1 mb-6 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                tab === t.id ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <>
            {tab === 'favorites' && (
              favorites.length === 0 ? (
                <div className="text-center py-16">
                  <HeartOff size={48} className="mx-auto mb-4 text-surface-300" />
                  <p className="font-body text-surface-500">No saved businesses yet.</p>
                  <p className="text-sm font-body text-surface-400 mt-1">Browse businesses and click the heart icon to save them!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {favorites.map(b => <BusinessCard key={b.id} business={b} />)}
                </div>
              )
            )}

            {tab === 'listings' && (
              myListings.length === 0 ? (
                <div className="text-center py-16">
                  <Building2 size={48} className="mx-auto mb-4 text-surface-300" />
                  <p className="font-body text-surface-500">You haven't listed any businesses yet.</p>
                  <Button className="mt-4" onClick={() => setAddModal(true)} icon={Plus}>Add Your First Business</Button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-card border border-surface-100 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-surface-50 border-b border-surface-100">
                      <tr>
                        {['Business', 'Category', 'Location', 'Status', 'Date'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-body font-medium text-surface-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-50">
                      {myListings.map(b => (
                        <tr key={b.id} className="hover:bg-surface-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-body font-medium text-surface-800">{b.name}</td>
                          <td className="px-4 py-3 text-sm font-body text-surface-500">{b.category}</td>
                          <td className="px-4 py-3 text-sm font-body text-surface-500">{b.area}, {b.district}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-body capitalize ${statusColor(b.status)}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-body text-surface-400">{formatDate(b.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {tab === 'profile' && (
              <div className="max-w-lg">
                <div className="bg-white rounded-2xl p-6 shadow-card border border-surface-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-white font-display">
                      {userData?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-lg text-surface-900">{userData?.name}</p>
                      <p className="text-sm font-body text-surface-400">{userData?.email}</p>
                      <Badge variant={userData?.role === 'super_admin' ? 'purple' : userData?.role === 'admin' ? 'info' : 'default'} className="mt-1">
                        {userData?.role?.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm font-body text-surface-600">
                    <div className="flex justify-between py-2 border-b border-surface-50">
                      <span className="text-surface-400">Member since</span>
                      <span>{formatDate(userData?.createdAt)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-surface-50">
                      <span className="text-surface-400">Saved businesses</span>
                      <span>{shortlisted.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="List a Business" size="lg">
        <BusinessForm onSuccess={() => { setAddModal(false); toast.success('Submitted for review!'); }} onCancel={() => setAddModal(false)} />
      </Modal>
    </>
  );
};

export default UserDashboardPage;
