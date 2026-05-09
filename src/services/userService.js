// src/services/userService.js
import {
  collection, doc, getDocs, updateDoc, deleteDoc,
  query, where, orderBy, getDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export const getAllUsers = async () => {
  const snap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getUsersByRole = async (role) => {
  const q = query(collection(db, 'users'), where('role', '==', role), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateUserRole = async (userId, role) => {
  await updateDoc(doc(db, 'users', userId), { role, updatedAt: serverTimestamp() });
};

export const deleteUser = async (userId) => {
  await deleteDoc(doc(db, 'users', userId));
};

export const getAnalytics = async () => {
  const [users, businesses, reviews] = await Promise.all([
    getDocs(collection(db, 'users')),
    getDocs(collection(db, 'businesses')),
    getDocs(collection(db, 'reviews')),
  ]);

  const businessDocs = businesses.docs.map(d => d.data());
  return {
    totalUsers: users.size,
    totalBusinesses: businesses.size,
    totalReviews: reviews.size,
    approvedBusinesses: businessDocs.filter(b => b.status === 'approved').length,
    pendingBusinesses: businessDocs.filter(b => b.status === 'pending').length,
    rejectedBusinesses: businessDocs.filter(b => b.status === 'rejected').length,
  };
};
