// src/hooks/useBusinesses.js
import { useState, useCallback } from 'react';
import { getBusinesses, searchBusinesses } from '../services/businessService';
import toast from 'react-hot-toast';

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchBusinesses = useCallback(async (filters = {}, reset = true) => {
    setLoading(true);
    try {
      const cursor = reset ? null : lastDoc;
      const { businesses: data, lastDoc: newLast } = await getBusinesses(filters, cursor);
      setBusinesses(prev => reset ? data : [...prev, ...data]);
      setLastDoc(newLast);
      setHasMore(data.length === 12);
    } catch (err) {
      toast.error('Failed to load businesses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lastDoc]);

  const search = useCallback(async (keyword, filters) => {
    if (!keyword.trim()) return fetchBusinesses(filters);
    setLoading(true);
    try {
      const data = await searchBusinesses(keyword, filters);
      setBusinesses(data);
      setHasMore(false);
    } catch (err) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { businesses, loading, hasMore, fetchBusinesses, search };
};
