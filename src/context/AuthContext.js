// src/context/AuthContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { onAuthChange, getUserData } from '../services/authService';
import useStore from '../store/useStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { setUser, setUserData, setAuthLoading, setShortlisted } = useStore();

  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const data = await getUserData(firebaseUser.uid);
        setUserData(data);
        setShortlisted(data?.shortlisted || []);
      } else {
        setUser(null);
        setUserData(null);
        setShortlisted([]);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
