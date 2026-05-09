// src/pages/SearchPage.jsx
import React, { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, X, SearchX } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import BusinessCard from '../components/business/BusinessCard';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import useStore from '../store/useStore';
import { useBusinesses } from '../hooks/useBusinesses';

const SearchPage = () => {
  const { searchFilters, setSearchFilters } = useStore();
  const { businesses, loading, hasMore, fetchBusinesses, search } = useBusinesses();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSearchFilters({ category: cat });
  }, []);

  useEffect(() => {
    if (searchFilters.keyword) {
      search(searchFilters.keyword, searchFilters);
    } else {
      fetchBusinesses(searchFilters, true);
    }
  }, [searchFilters.district, searchFilters.area, searchFilters.category]);

  const activeFilters = [
    searchFilters.district && { key: 'district', label: searchFilters.district },
    searchFilters.area && { key: 'area', label: searchFilters.area },
    searchFilters.category && { key: 'category', label: searchFilters.category },
    searchFilters.keyword && { key: 'keyword', label: `"${searchFilters.keyword}"` },
  ].filter(Boolean);

  const clearFilter = (key) => setSearchFilters({ [key]: '' });

  return (
    <>
      <Helmet><title>Search Businesses – BizDir</title></Helmet>

      <div className="bg-surface-900 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-body font-medium text-surface-500 flex items-center gap-1">
              <SlidersHorizontal size={12} /> Filters:
            </span>
            {activeFilters.map(f => (
              <button
                key={f.key}
                onClick={() => clearFilter(f.key)}
                className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 border border-primary-200 px-2.5 py-1 rounded-full text-xs font-body font-medium hover:bg-primary-100 transition-colors"
              >
                {f.label}
                <X size={10} />
              </button>
            ))}
            {activeFilters.length > 1 && (
              <button
                onClick={() => setSearchFilters({ district: '', area: '', category: '', keyword: '' })}
                className="text-xs font-body text-surface-400 hover:text-surface-600 underline"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <p className="text-sm font-body text-surface-500 mb-5">
            {businesses.length === 0 ? 'No businesses found' : `${businesses.length} business${businesses.length !== 1 ? 'es' : ''} found`}
          </p>
        )}

        {/* Grid */}
        {loading && businesses.length === 0 ? (
          <div className="flex justify-center py-20"><Spinner size="xl" /></div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-20">
            <SearchX size={56} className="mx-auto mb-4 text-surface-300" />
            <h3 className="font-display font-semibold text-lg text-surface-700 mb-2">No results found</h3>
            <p className="text-sm font-body text-surface-400">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {businesses.map(b => <BusinessCard key={b.id} business={b} />)}
          </div>
        )}

        {/* Load more */}
        {hasMore && businesses.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              loading={loading}
              onClick={() => fetchBusinesses(searchFilters, false)}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
