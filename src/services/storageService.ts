import type { ApplicationRecord, ApplicationDraft, RequestStatus, PaymentStatus } from '../types';
import { INITIAL_MOCK_APPLICATIONS } from '../data/mockApplications';

const STORAGE_KEY_APPLICATIONS = 'newid_college_applications_v1';
const STORAGE_KEY_DRAFT = 'newid_application_draft_v1';

export class StorageService {
  // Get all applications
  static getApplications(): ApplicationRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse applications from storage', e);
    }
    // Seed with initial mock data
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(INITIAL_MOCK_APPLICATIONS));
    return INITIAL_MOCK_APPLICATIONS;
  }

  // Get single application by ID
  static getApplicationById(id: string): ApplicationRecord | null {
    const list = this.getApplications();
    const found = list.find((a) => a.id.trim().toUpperCase() === id.trim().toUpperCase());
    return found || null;
  }

  // Find by Roll Number & ID (for student verification)
  static verifyAndGetApplication(id: string, rollNumber: string): ApplicationRecord | null {
    const list = this.getApplications();
    const cleanId = id.trim().toUpperCase();
    const cleanRoll = rollNumber.trim().toUpperCase();
    return list.find(
      (a) => a.id.toUpperCase() === cleanId && a.student.rollNumber.toUpperCase() === cleanRoll
    ) || null;
  }

  // Save new application
  static submitApplication(record: ApplicationRecord): ApplicationRecord {
    const list = this.getApplications();
    // Prepend new record
    const updated = [record, ...list];
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
    // Clear any saved draft upon successful submission
    this.deleteDraft();
    window.dispatchEvent(new CustomEvent('newid_applications_updated'));
    return record;
  }

  // Update existing application (Admin action)
  static updateApplication(
    id: string,
    updates: {
      status?: RequestStatus;
      idCardIssuedDate?: string | null;
      paymentStatus?: PaymentStatus;
      collectionLocation?: string;
      collectionInstructions?: string;
      adminRemarks?: string;
      rejectionReason?: string;
      historyNote?: string;
    }
  ): ApplicationRecord | null {
    const list = this.getApplications();
    const index = list.findIndex((a) => a.id.toUpperCase() === id.trim().toUpperCase());
    if (index === -1) return null;

    const current = list[index];
    const newStatus = updates.status || current.status;
    const history = [...current.statusHistory];

    if (updates.status && updates.status !== current.status) {
      history.push({
        status: updates.status,
        date: new Date().toISOString(),
        note: updates.historyNote || `Status updated to ${updates.status} by College Administrator`,
      });
    }

    const updatedRecord: ApplicationRecord = {
      ...current,
      status: newStatus,
      idCardIssuedDate: updates.idCardIssuedDate !== undefined ? updates.idCardIssuedDate : current.idCardIssuedDate,
      payment: {
        ...current.payment,
        status: updates.paymentStatus || current.payment.status,
      },
      collectionLocation: updates.collectionLocation ?? current.collectionLocation,
      collectionInstructions: updates.collectionInstructions ?? current.collectionInstructions,
      adminRemarks: updates.adminRemarks !== undefined ? updates.adminRemarks : current.adminRemarks,
      rejectionReason: updates.rejectionReason !== undefined ? updates.rejectionReason : current.rejectionReason,
      statusHistory: history,
    };

    list[index] = updatedRecord;
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('newid_applications_updated'));
    return updatedRecord;
  }

  // Reset to initial mock data (Convenient for demo)
  static resetToDefaultData(): void {
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(INITIAL_MOCK_APPLICATIONS));
    window.dispatchEvent(new CustomEvent('newid_applications_updated'));
  }

  // --- DRAFT MANAGEMENT (Save & Continue Later) ---
  static saveDraft(draft: ApplicationDraft): void {
    try {
      // Avoid storing heavy base64 strings or sensitive info in draft
      const sanitizedDraft: ApplicationDraft = {
        ...draft,
        lastUpdated: new Date().toISOString(),
        replacement: {
          ...draft.replacement,
          // We keep filenames but avoid heavy base64 strings in localStorage draft
          photoUrl: draft.replacement.photoUrl ? 'preview_saved' : null,
          docUrl: null,
        },
      };
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(sanitizedDraft));
      window.dispatchEvent(new CustomEvent('newid_draft_updated'));
    } catch (e) {
      console.warn('Failed to save draft to localStorage', e);
    }
  }

  static getDraft(): ApplicationDraft | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse draft', e);
    }
    return null;
  }

  static deleteDraft(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_DRAFT);
      window.dispatchEvent(new CustomEvent('newid_draft_updated'));
    } catch (e) {
      console.error('Failed to delete draft', e);
    }
  }

  // Generate unique Reference ID
  static generateReferenceId(): string {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `NEWID-2026-${randomNum}`;
  }
}
