import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const firestoreService = {
  // Create or update a document in a collection
  async setDocument(collectionName: string, documentId: string, data: DocumentData) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await setDoc(docRef, data);
      return { id: documentId, ...data };
    } catch (error) {
      console.error('Error setting document:', error);
      throw error;
    }
  },

  // Get a document by ID
  async getDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  },

  // Get all documents in a collection
  async getCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting collection:', error);
      throw error;
    }
  },

  // Get documents by user ID
  async getDocumentsByUserId(collectionName: string, userId: string) {
    try {
      const q = query(collection(db, collectionName), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents by user ID:', error);
      throw error;
    }
  },

  // Update a document
  async updateDocument(collectionName: string, documentId: string, data: Partial<DocumentData>) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
      return { id: documentId, ...data };
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  // Delete a document
  async deleteDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}; 