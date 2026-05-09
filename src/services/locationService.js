// src/services/locationService.js
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, query, orderBy, setDoc
} from 'firebase/firestore';
import { db } from './firebase';

export const getLocations = async () => {
  const snap = await getDocs(query(collection(db, 'locations'), orderBy('name')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addDistrict = async (name) => {
  const ref = await addDoc(collection(db, 'locations'), { name, areas: [] });
  return ref.id;
};

export const addArea = async (districtId, areaName) => {
  const districtRef = doc(db, 'locations', districtId);
  const snap = await getDocs(collection(db, 'locations'));
  const district = snap.docs.find(d => d.id === districtId);
  if (district) {
    const areas = district.data().areas || [];
    await updateDoc(districtRef, { areas: [...areas, areaName] });
  }
};

export const deleteDistrict = async (id) => deleteDoc(doc(db, 'locations', id));

export const updateDistrict = async (id, data) => updateDoc(doc(db, 'locations', id), data);

// Categories
export const getCategories = async () => {
  const snap = await getDocs(query(collection(db, 'categories'), orderBy('name')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addCategory = async ({ name, icon, color }) => {
  const ref = await addDoc(collection(db, 'categories'), { name, icon, color });
  return ref.id;
};

export const updateCategory = async (id, data) => updateDoc(doc(db, 'categories', id), data);

export const deleteCategory = async (id) => deleteDoc(doc(db, 'categories', id));
