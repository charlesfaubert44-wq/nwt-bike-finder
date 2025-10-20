import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { StolenBike, FoundBike, Match, Report, User } from '@/types';

// Stolen Bikes
export const createStolenBike = async (bikeData: Omit<StolenBike, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'stolenBikes'), {
    ...bikeData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getStolenBikes = async (userId?: string, lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
  let q = query(
    collection(db, 'stolenBikes'),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  if (userId) {
    q = query(
      collection(db, 'stolenBikes'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString()
  } as StolenBike));
};

export const getStolenBike = async (id: string) => {
  const docRef = doc(db, 'stolenBikes', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toDate().toISOString()
    } as StolenBike;
  }
  return null;
};

export const updateStolenBike = async (id: string, updates: Partial<StolenBike>) => {
  const docRef = doc(db, 'stolenBikes', id);
  await updateDoc(docRef, updates);
};

export const deleteStolenBike = async (id: string) => {
  const docRef = doc(db, 'stolenBikes', id);
  await deleteDoc(docRef);
};

// Found Bikes
export const createFoundBike = async (bikeData: Omit<FoundBike, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'foundBikes'), {
    ...bikeData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getFoundBikes = async (lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
  let q = query(
    collection(db, 'foundBikes'),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString()
  } as FoundBike));
};

export const getFoundBike = async (id: string) => {
  const docRef = doc(db, 'foundBikes', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toDate().toISOString()
    } as FoundBike;
  }
  return null;
};

export const updateFoundBike = async (id: string, updates: Partial<FoundBike>) => {
  const docRef = doc(db, 'foundBikes', id);
  await updateDoc(docRef, updates);
};

export const deleteFoundBike = async (id: string) => {
  const docRef = doc(db, 'foundBikes', id);
  await deleteDoc(docRef);
};

// Matches
export const createMatch = async (matchData: Omit<Match, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'matches'), {
    ...matchData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getMatches = async (userId: string) => {
  // Get matches where user's stolen bikes are involved
  const stolenBikesQuery = query(
    collection(db, 'stolenBikes'),
    where('userId', '==', userId)
  );
  const stolenBikesSnapshot = await getDocs(stolenBikesQuery);
  const stolenBikeIds = stolenBikesSnapshot.docs.map(doc => doc.id);

  if (stolenBikeIds.length === 0) return [];

  const matchesQuery = query(
    collection(db, 'matches'),
    where('stolenBikeId', 'in', stolenBikeIds),
    orderBy('createdAt', 'desc')
  );
  const matchesSnapshot = await getDocs(matchesQuery);
  
  return matchesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString()
  } as Match));
};

export const updateMatch = async (id: string, updates: Partial<Match>) => {
  const docRef = doc(db, 'matches', id);
  await updateDoc(docRef, updates);
};

// Reports
export const createReport = async (reportData: Omit<Report, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'reports'), {
    ...reportData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getReports = async () => {
  const q = query(
    collection(db, 'reports'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString()
  } as Report));
};

export const updateReport = async (id: string, updates: Partial<Report>) => {
  const docRef = doc(db, 'reports', id);
  await updateDoc(docRef, updates);
};

// Users
export const getUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      uid: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt
    } as User;
  }
  return null;
};

export const updateUser = async (uid: string, updates: Partial<User>) => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, updates);
};

export const isUserAdmin = async (uid: string): Promise<boolean> => {
  const user = await getUser(uid);
  return user?.role === 'admin' || user?.role === 'moderator';
};
