import React, { useState } from 'react';
import type {
  StudentFormData,
  ReplacementFormData,
  PaymentFormData,
} from '../../types';
import {
  User,
  FileText,
  CreditCard,
  Edit2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';

interface Step5Props {
  student: StudentFormData;
  replacement: ReplacementFormData;
  payment: PaymentFormData;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export const Step5ReviewAndSubmit: React.FC<Step5Props> = ({
  student,
  replacement,
  payment,
  onEditStep,
  onSubmit,
  onPrev,
  isSubmitting,
}) => {
  const [accurateConfirmed, setAccurateConfirmed] = useState(false);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accurateConfirmed || !policyAgreed) {
      setShowValidationError(true);
      return;
    }
    setShowValidationError(false);
    onSubmit();
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-8 animate-fade-slide">
      {/* Guidance */}
      <div className="bg-[#101B32]/85 border border-[#38BDF8]/30 rounded-2xl p-5 flex items-start gap-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.12)]">
        <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#F8FAFC] space-y-1">
          <p className="font-bold text-[#38BDF8]">
            Review Your Application Before Final Submission
          </p>
          <p className="text-[#A7B4C8]">
            Please carefully review all the recorded student details, replacement justification, and payment choice. If any detail needs correcting, click the corresponding “Edit” button.
          </p>
        </div>
      </div>

      {/* Section 1: Student Information */}
      <div className="card-glass p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#38BDF8]" />
            <h3 className="font-bold text-base text-[#F8FAFC]">1. Student Details</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-[#38BDF8] hover:text-[#22D3EE] flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Full Name</span>
            <span className="font-bold text-[#F8FAFC] text-sm">{student.fullName || '—'}</span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Roll Number</span>
            <span className="font-bold text-[#38BDF8] font-mono text-sm">{student.rollNumber || '—'}</span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Department</span>
            <span className="font-medium text-slate-300">{student.department || '—'}</span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Academic Year</span>
            <span className="font-medium text-slate-300">{student.academicYear || '—'}</span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Section</span>
            <span className="font-medium text-slate-300">{student.section || '—'}</span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Contact Email</span>
            <span className="font-medium text-slate-300">{student.email || '—'}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Mobile Number</span>
            <span className="font-medium text-slate-300">+91 {student.phone || '—'}</span>
          </div>
        </div>
      </div>

      {/* Section 2: Replacement Justification & Uploaded Documents */}
      <div className="card-glass p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="font-bold text-base text-[#F8FAFC]">2. Replacement Reason & Documents</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-[#8B5CF6] hover:text-violet-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Reason Selected</span>
            <span className="font-bold text-[#F8FAFC] text-sm inline-block bg-blue-950/70 border border-blue-800/60 text-[#38BDF8] px-3.5 py-1 rounded-md mt-1 shadow-xs">
              {replacement.reason}
            </span>
          </div>

          {replacement.reasonExplanation && (
            <div>
              <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Student Statement</span>
              <p className="text-slate-300 bg-[#0B1220]/80 p-3.5 rounded-xl border border-slate-800 mt-1 leading-relaxed">
                {replacement.reasonExplanation}
              </p>
            </div>
          )}

          {/* Uploaded documents summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-[#0B1220]/80 border border-slate-800 rounded-xl flex items-center gap-3">
              {replacement.photoUrl ? (
                <img
                  src={replacement.photoUrl}
                  alt="Student Upload"
                  className="w-12 h-14 object-cover rounded border border-slate-700"
                />
              ) : (
                <div className="w-12 h-14 bg-slate-800 rounded flex items-center justify-center text-slate-500">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              <div>
                <span className="font-bold text-[#F8FAFC] block text-xs">Formal Photograph</span>
                <span className="text-[11px] text-[#A7B4C8]">
                  {replacement.photoFileName || 'Standard library archives photo on file'}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#0B1220]/80 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-12 h-14 bg-violet-950/80 border border-violet-800/60 text-[#8B5CF6] rounded flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-[#F8FAFC] block text-xs">Supporting Document</span>
                <span className="text-[11px] text-[#A7B4C8] truncate block">
                  {replacement.docFileName || 'No external document uploaded'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Fee & Payment Details */}
      <div className="card-glass p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-[#22D3EE]" />
            <h3 className="font-bold text-base text-[#F8FAFC]">3. Fee & Payment Summary</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-xs font-semibold text-[#22D3EE] hover:text-cyan-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Total Fee Payable</span>
            <span className="font-extrabold text-[#38BDF8] text-xl">₹{payment.amount}</span>
            <span className="text-[10px] text-slate-500 block">Official college rate</span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Payment Mode</span>
            <span className="font-bold text-[#F8FAFC] uppercase tracking-wide block mt-1">
              {payment.method === 'upi'
                ? 'UPI / QR Code'
                : payment.method === 'card'
                ? 'Debit/Credit Card'
                : payment.method === 'counter'
                ? 'Cash at Counter 3'
                : 'Net Banking'}
            </span>
          </div>
          <div>
            <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">Payment Reference</span>
            <span className="font-mono font-semibold text-sky-300 bg-[#0B1220] border border-slate-700/60 px-3 py-1 rounded inline-block mt-1">
              {payment.transactionRef || 'PENDING'}
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Checkboxes */}
      <div className="p-6 bg-[#0B1220]/90 border border-slate-800 rounded-2xl space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-[#38BDF8]">
          Student Confirmation & Undertaking
        </h4>

        {/* Checkbox 1: Accuracy */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accurateConfirmed}
            onChange={(e) => setAccurateConfirmed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-700 bg-[#111C30] text-[#38BDF8] focus:ring-[#38BDF8]"
          />
          <div className="text-xs text-[#A7B4C8]">
            <span className="font-bold text-[#F8FAFC]">
              "I confirm that the information provided is accurate." *
            </span>
            <p className="text-slate-400 mt-0.5">
              All personal and academic details correspond to my official college registration.
            </p>
          </div>
        </label>

        {/* Checkbox 2: Policy */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={policyAgreed}
            onChange={(e) => setPolicyAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-700 bg-[#111C30] text-[#38BDF8] focus:ring-[#38BDF8]"
          />
          <div className="text-xs text-[#A7B4C8]">
            <span className="font-semibold text-[#F8FAFC]">
              I agree to the college student ID card policy and collection procedures. *
            </span>
            <p className="text-slate-400 mt-0.5">
              I will present my acknowledgement slip at Counter 3 upon collection and surrender any damaged card.
            </p>
          </div>
        </label>

        {showValidationError && (!accurateConfirmed || !policyAgreed) && (
          <p className="text-xs text-[#FB7185] font-bold flex items-center gap-1.5 pt-1">
            <AlertTriangle className="w-4 h-4 text-[#FB7185] shrink-0" />
            <span>Please accept both confirmation checkboxes before submitting your request.</span>
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="text-xs text-[#A7B4C8] flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-[#38BDF8]">Next Step:</span>
          <span>After submission, you will receive a request reference number and can track your application.</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="btn-glass-secondary text-xs sm:text-sm px-5 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-glow-primary text-xs sm:text-sm px-8 py-3.5 flex-1 sm:flex-none text-white font-bold"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting Request...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Confirm and Submit Request</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
