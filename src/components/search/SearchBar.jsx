// src/components/search/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import useStore from '../../store/useStore';
import { searchBusinesses } from '../../services/businessService';
import { useDebounce } from '../../hooks/useDebounce';
import Spinner from '../common/Spinner';

const SearchBar = ({ size = 'default', className }) => {
  const { locations, categories, searchFilters, setSearchFilters } = useStore();
  const [keyword, setKeyword] = useState(searchFilters.keyword || '');
  const [suggestions, setSuggestions] = useState([]);
  const [sugLoading, setSugLoading] = useState(false);
  const [showSug, setShowSug] = useState(false);
  const debounced = useDebounce(keyword, 350);
  const navigate = useNavigate();
  const ref = useRef();

  // Fetch suggestions
  useEffect(() => {
    if (debounced.length < 2) { setSuggestions([]); return; }
    setSugLoading(true);
    searchBusinesses(debounced, {}).then(results => {
      setSuggestions(results.slice(0, 5));
      setSugLoading(false);
    }).catch(() => setSugLoading(false));
  }, [debounced]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setShowSug(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    setSearchFilters({ keyword });
    setShowSug(false);
    navigate('/search');
  };

  const handleSuggestionClick = (biz) => {
    setShowSug(false);
    navigate(`/business/${biz.id}`);
  };

  const currentDistrict = locations.find(l => l.name === searchFilters.district);
  const areas = currentDistrict?.areas || [];

  const isLarge = size === 'large';

  return (
    <div ref={ref} className={clsx('w-full', className)}>
      <form onSubmit={handleSearch}>
        <div className={clsx(
          'flex flex-col sm:flex-row bg-white rounded-2xl shadow-card-hover overflow-hidden border border-surface-100',
          isLarge && 'shadow-2xl'
        )}>
          {/* Keyword */}
          <div className="relative flex-1 flex items-center">
            <Search size={16} className="absolute left-4 text-surface-400 pointer-events-none" />
            <input
              type="text"
              value={keyword}
              onChange={e => { setKeyword(e.target.value); setShowSug(true); }}
              onFocus={() => keyword.length > 1 && setShowSug(true)}
              placeholder="Search businesses, services..."
              className={clsx(
                'w-full pl-10 pr-4 font-body text-surface-800 placeholder:text-surface-400 focus:outline-none',
                isLarge ? 'py-4 text-base' : 'py-3 text-sm'
              )}
            />
            {keyword && (
              <button type="button" onClick={() => { setKeyword(''); setSuggestions([]); }} className="absolute right-3 text-surface-300 hover:text-surface-500">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-surface-100" />

          {/* District */}
          <div className="flex items-center gap-2 px-4 sm:border-none border-t border-surface-100">
            <MapPin size={14} className="text-primary-400 shrink-0" />
            <select
              value={searchFilters.district}
              onChange={e => setSearchFilters({ district: e.target.value, area: '' })}
              className={clsx('bg-transparent font-body text-surface-700 focus:outline-none cursor-pointer min-w-[100px]', isLarge ? 'py-4 text-sm' : 'py-3 text-xs')}
            >
              <option value="">All Districts</option>
              {locations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
            </select>
          </div>

          {/* Area */}
          {areas.length > 0 && (
            <>
              <div className="hidden sm:block w-px bg-surface-100" />
              <div className="flex items-center px-4 border-t sm:border-t-0 border-surface-100">
                <select
                  value={searchFilters.area}
                  onChange={e => setSearchFilters({ area: e.target.value })}
                  className={clsx('bg-transparent font-body text-surface-700 focus:outline-none cursor-pointer min-w-[80px]', isLarge ? 'py-4 text-sm' : 'py-3 text-xs')}
                >
                  <option value="">All Areas</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Category */}
          <div className="hidden sm:block w-px bg-surface-100" />
          <div className="flex items-center px-4 border-t sm:border-t-0 border-surface-100">
            <select
              value={searchFilters.category}
              onChange={e => setSearchFilters({ category: e.target.value })}
              className={clsx('bg-transparent font-body text-surface-700 focus:outline-none cursor-pointer min-w-[100px]', isLarge ? 'py-4 text-sm' : 'py-3 text-xs')}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={clsx(
              'bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold transition-colors flex items-center justify-center gap-2',
              isLarge ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm',
              'border-t sm:border-t-0 border-surface-100'
            )}
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSug && (keyword.length > 1) && (
        <div className="absolute z-50 mt-2 w-full max-w-2xl bg-white rounded-xl shadow-modal border border-surface-100 overflow-hidden animate-fade-in">
          {sugLoading ? (
            <div className="flex items-center justify-center py-6">
              <Spinner size="sm" />
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map(biz => (
              <button
                key={biz.id}
                type="button"
                onClick={() => handleSuggestionClick(biz)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-50 text-left transition-colors"
              >
                <span className="text-xl">{biz.categoryIcon || '🏢'}</span>
                <div>
                  <p className="text-sm font-body font-medium text-surface-800">{biz.name}</p>
                  <p className="text-xs font-body text-surface-400">{biz.category} · {biz.area}, {biz.district}</p>
                </div>
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm font-body text-surface-400">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
