import { firestoreService } from './firestore';
import { UserPreferences } from '../types/questionnaire';
import { ProductScan } from '../types/types';

const COLLECTIONS = {
  USER_PREFERENCES: 'userPreferences',
  SCAN_HISTORY: 'scanHistory'
};

export const userService = {
  // Save or update user preferences
  async saveUserPreferences(userId: string, preferences: UserPreferences) {
    return firestoreService.setDocument(COLLECTIONS.USER_PREFERENCES, userId, {
      ...preferences,
      userId,
      updatedAt: new Date().toISOString()
    });
  },

  // Get user preferences
  async getUserPreferences(userId: string) {
    return firestoreService.getDocument(COLLECTIONS.USER_PREFERENCES, userId) as Promise<UserPreferences | null>;
  },

  // Save scan to history
  async addToScanHistory(userId: string, scan: ProductScan) {
    return firestoreService.setDocument(COLLECTIONS.SCAN_HISTORY, scan.id, {
      ...scan,
      userId,
      createdAt: new Date().toISOString()
    });
  },

  // Get user's scan history
  async getScanHistory(userId: string) {
    return firestoreService.getDocumentsByUserId(COLLECTIONS.SCAN_HISTORY, userId) as Promise<ProductScan[]>;
  },

  // Get a single scan by ID
  async getScanById(scanId: string) {
    return firestoreService.getDocument(COLLECTIONS.SCAN_HISTORY, scanId) as Promise<ProductScan | null>;
  },

  // Update scan result
  async updateScanResult(scanId: string, scan: ProductScan) {
    return firestoreService.updateDocument(COLLECTIONS.SCAN_HISTORY, scanId, {
      ...scan,
      updatedAt: new Date().toISOString()
    });
  },

  // Delete scan from history
  async deleteScan(scanId: string) {
    return firestoreService.deleteDocument(COLLECTIONS.SCAN_HISTORY, scanId);
  },

  // Clear user's scan history
  async clearScanHistory(userId: string) {
    const scans = await this.getScanHistory(userId);
    const deletePromises = scans.map(scan => this.deleteScan(scan.id));
    await Promise.all(deletePromises);
    return true;
  }
}; 