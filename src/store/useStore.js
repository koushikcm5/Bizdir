// src/store/useStore.js
import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Auth
  user: null,
  userData: null,
  authLoading: true,

  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),
  setAuthLoading: (authLoading) => set({ authLoading }),

  // Search
  searchFilters: { district: '', area: '', category: '', keyword: '' },
  setSearchFilters: (filters) => set(state => ({
    searchFilters: { ...state.searchFilters, ...filters }
  })),
  resetFilters: () => set({ searchFilters: { district: '', area: '', category: '', keyword: '' } }),

  // Locations & Categories (cached)
  locations: [],
  categories: [],
  setLocations: (locations) => set({ locations }),
  setCategories: (categories) => set({ categories }),

  // Shortlist
  shortlisted: [],
  setShortlisted: (ids) => set({ shortlisted: ids }),
  toggleShortlist: (id) => set(state => ({
    shortlisted: state.shortlisted.includes(id)
      ? state.shortlisted.filter(i => i !== id)
      : [...state.shortlisted, id]
  })),

  // UI
  sidebarOpen: false,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useStore;
