import React, { useState, useEffect } from 'react';
import type {
  StudentFormData,
  ReplacementFormData,
  PaymentFormData,
  ApplicationRecord,
  ApplicationDraft,
} from '../../types';
import { StorageService } from '../../services/storageService';
import { Step1StudentInfo } from './Step1StudentInfo';
import { Step2ReplacementDetails } from './Step2ReplacementDetails';
import { Step3FeeAndRequirements } from './Step3FeeAndRequirements';
import { Step4PaymentMethod } from './Step4PaymentMethod';
import { Step5ReviewAndSubmit } from './Step5ReviewAndSubmit';
import { Step6Confirmation } from './Step6Confirmation';
import {
  User,
  FileQuestion,
  HelpCircle,
  CreditCard,
  CheckCircle,
  FileCheck2,
  Bookmark,
  Check,
  X,
} from 'lucide-react';

interface WizardContainerProps {
  initialStep?: number;
  onNavigateHome: () => void;
  onNavigateTrack: (id?: string, roll?: string) => void;
  onNavigateAdmin: (id?: string) => void;
}

export const WizardContainer: React.FC<WizardContainerProps> = ({
  initialStep = 1,
  onNavigateHome: _onNavigateHome,
  onNavigateTrack,
  onNavigateAdmin,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [student, setStudent] = useState<StudentFormData>({
    fullName: '',
    rollNumber: '',
    department: '',
    academicYear: '',
    section: '',
    email: '',
    phone: '',
  });

  const [replacement, setReplacement] = useState<ReplacementFormData>({
    reason: 'ID card lost',
    reasonExplanation: '',
    photoUrl: null,
    photoFileName: null,
    docUrl: null,
    docFileName: null,
    lossDeclarationAccepted: false,
    surrenderDamagedAcknowledged: false,
  });

  const [payment, setPayment] = useState<PaymentFormData>({
    method: 'upi',
    amount: 250,
    transactionRef: `DEMO-UPI-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Demo Completed',
    isDemo: true,
  });

  // Check and restore draft on initial load
  useEffect(() => {
    const draft = StorageService.getDraft();
    if (draft && (!student.fullName || !student.rollNumber)) {
      setStudent(draft.student);
      setReplacement((prev) => ({
        ...prev,
        ...draft.replacement,
      }));
      setPayment(draft.payment);
      if (initialStep === 1 && draft.currentStep > 1) {
        setCurrentStep(draft.currentStep);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveDraft = () => {
    const draft: ApplicationDraft = {
      currentStep,
      lastUpdated: new Date().toISOString(),
      student,
      replacement,
      payment,
    };
    StorageService.saveDraft(draft);
    showToast(`Draft saved locally at Step ${currentStep}. You can resume anytime!`);
  };

  const stepsList = [
    { num: 1, label: 'Student Info', icon: User },
    { num: 2, label: 'Replacement Details', icon: FileQuestion },
    { num: 3, label: 'Fee & Policy', icon: HelpCircle },
    { num: 4, label: 'Payment Method', icon: CreditCard },
    { num: 5, label: 'Review & Submit', icon: FileCheck2 },
    { num: 6, label: 'Confirmation', icon: CheckCircle },
  ];

  const progressPercentage = Math.round(((currentStep - 1) / 5) * 100);

  const handleSubmitFinal = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const refId = StorageService.generateReferenceId();
      const newRecord: ApplicationRecord = {
        id: refId,
        submissionDate: new Date().toISOString(),
        student: { ...student },
        replacement: { ...replacement },
        payment: { ...payment },
        status: 'Submitted',
        statusHistory: [
          {
            status: 'Submitted',
            date: new Date().toISOString(),
            note: 'Application successfully submitted by student through NEWID portal.',
          },
        ],
        // CRITICAL REQUIREMENT: Not issued yet
        idCardIssuedDate: null,
        collectionLocation: 'Student Affairs Section, Admin Block Ground Floor, Counter 3',
        collectionInstructions:
          replacement.reason === 'ID card damaged'
            ? 'Surrender your damaged ID card at Counter 3 and bring your printed acknowledgement slip.'
            : 'Bring your printed acknowledgement slip and college admission fee receipt to Counter 3.',
        adminRemarks: 'Fresh submission queued for verification by Student Affairs clerk.',
      };

      StorageService.submitApplication(newRecord);
      setSubmittedRecord(newRecord);
      setIsSubmitting(false);
      setCurrentStep(6);
      showToast('Application submitted successfully!');
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-2 sm:px-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17243B] text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-slate-700/80 flex items-center gap-3 text-xs sm:text-sm animate-fade-slide">
          <Bookmark className="w-4 h-4 text-[#38BDF8]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Progress & Header Card */}
      <div className="card-glass p-5 sm:p-7 no-print">
        {/* Top bar with Step Counter & Save button */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] block">
              Digital ID Replacement Application
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
                Step {currentStep} of 6
              </h2>
              <span className="text-xs text-[#A7B4C8] font-semibold">
                ({progressPercentage}% completed)
              </span>
            </div>
          </div>

          {currentStep < 6 && (
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2.5 bg-[#0B1220]/80 hover:bg-[#17243B] text-slate-300 hover:text-white border border-slate-700/70 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
              title="Save progress to your browser and finish later"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="hidden sm:inline">Save & Continue Later</span>
              <span className="sm:hidden">Save</span>
            </button>
          )}
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-[#070B14] rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            style={{
              width: `${Math.max(6, progressPercentage)}%`,
              background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #8B5CF6 100%)',
            }}
          />
        </div>

        {/* Step indicator pills */}
        <div className="hidden md:grid md:grid-cols-6 gap-2 mt-6">
          {stepsList.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <button
                key={s.num}
                type="button"
                disabled={currentStep === 6 || s.num > currentStep}
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all ${
                  isCurrent
                    ? 'bg-blue-950/70 text-[#38BDF8] border border-blue-700/80 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : isDone
                    ? 'text-slate-300 hover:bg-slate-800/40 cursor-pointer border border-transparent'
                    : 'text-slate-600 opacity-60 cursor-not-allowed border border-transparent'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isDone
                      ? 'bg-[#2563EB] text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                      : isCurrent
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.num}
                </div>
                <span className="text-[11px] font-semibold truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Body with Smooth Page Transitions */}
      <div key={currentStep} className="animate-fade-slide">
        {currentStep === 1 && (
          <Step1StudentInfo
            data={student}
            onChange={(updates) => setStudent((prev) => ({ ...prev, ...updates }))}
            onNext={() => setCurrentStep(2)}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 2 && (
          <Step2ReplacementDetails
            data={replacement}
            onChange={(updates) => setReplacement((prev) => ({ ...prev, ...updates }))}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 3 && (
          <Step3FeeAndRequirements
            reason={replacement.reason}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 4 && (
          <Step4PaymentMethod
            data={payment}
            onChange={(updates) => setPayment((prev) => ({ ...prev, ...updates }))}
            onNext={() => setCurrentStep(5)}
            onPrev={() => setCurrentStep(3)}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 5 && (
          <Step5ReviewAndSubmit
            student={student}
            replacement={replacement}
            payment={payment}
            onEditStep={(stepNum) => setCurrentStep(stepNum)}
            onSubmit={handleSubmitFinal}
            onPrev={() => setCurrentStep(4)}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 6 && submittedRecord && (
          <Step6Confirmation
            application={submittedRecord}
            onTrackView={(id, roll) => onNavigateTrack(id, roll)}
            onOpenAdmin={(id) => onNavigateAdmin(id)}
            onStartNew={() => {
              setStudent({
                fullName: '',
                rollNumber: '',
                department: '',
                academicYear: '',
                section: '',
                email: '',
                phone: '',
              });
              setReplacement({
                reason: 'ID card lost',
                reasonExplanation: '',
                photoUrl: null,
                photoFileName: null,
                docUrl: null,
                docFileName: null,
                lossDeclarationAccepted: false,
                surrenderDamagedAcknowledged: false,
              });
              setSubmittedRecord(null);
              setCurrentStep(1);
            }}
          />
        )}
      </div>
    </div>
  );
};
