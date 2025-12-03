import { collection, doc, getDoc, setDoc, updateDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config';

const teachersCollection = collection(db, 'teachers');

export const getTeacher = async (uid) => (await getDoc(doc(teachersCollection, uid))).data();

export const subscribeToTeacher = (uid, callback) => onSnapshot(doc(teachersCollection, uid), (snap) => callback(snap.data()));

export const updateTeacherJournal = async (uid, journals) => await updateDoc(doc(teachersCollection, uid), { journals });

export const getAllTeachers = async () => {
  const snapshot = await getDocs(teachersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTeacher = async (user, additionalData) => await setDoc(doc(teachersCollection, user.uid), { email: user.email, ...additionalData });