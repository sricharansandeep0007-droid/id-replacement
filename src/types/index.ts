export type RequestStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Payment Pending'
  | 'ID Card in Preparation'
  | 'Ready for Collection'
  | 'Completed'
  | 'Rejected'
  | 'Action Required';

export type PaymentStatus =
  | 'Pending Verification'
  | 'Paid / Verified'
  | 'Pay at College Counter'
  | 'Exempted'
  | 'Demo Completed';

export type PaymentMethod =
  | 'upi'
  | 'card'
  | 'netbanking'
  | 'counter'
  | 'college_portal';

export type ReplacementReason =
  | 'ID card lost'
  | 'ID card damaged'
  | 'Photograph or printed details unreadable'
  | 'Other reason';

export interface StudentFormData {
  fullName: string;
  rollNumber: string;
  department: string;
  academicYear: string;
  section: string;
  email: string;
  phone: string;
}

export interface ReplacementFormData {
  reason: ReplacementReason;
  reasonExplanation: string;
  photoUrl: string | null;
  photoFileName: string | null;
  docUrl: string | null;
  docFileName: string | null;
  lossDeclarationAccepted: boolean;
  surrenderDamagedAcknowledged: boolean;
}

export interface PaymentFormData {
  method: PaymentMethod;
  amount: number;
  transactionRef: string;
  status: PaymentStatus;
  isDemo: boolean;
}

export interface ApplicationDraft {
  currentStep: number;
  lastUpdated: string;
  student: StudentFormData;
  replacement: ReplacementFormData;
  payment: PaymentFormData;
}

export interface ApplicationRecord {
  id: string; // e.g. "NEWID-2026-89412"
  submissionDate: string; // ISO date string
  student: StudentFormData;
  replacement: ReplacementFormData;
  payment: PaymentFormData;
  status: RequestStatus;
  statusHistory: Array<{
    status: RequestStatus;
    date: string;
    note?: string;
  }>;
  // Crucial requirement: ID Card Issued Date
  idCardIssuedDate: string | null; // null if not issued yet
  collectionLocation: string;
  collectionInstructions: string;
  adminRemarks?: string;
  rejectionReason?: string;
}
